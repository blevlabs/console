import "reflect-metadata";

import { LoggerService } from "@akashnetwork/logging";
import { HttpLoggerIntercepter } from "@akashnetwork/logging/hono";
import { serve } from "@hono/node-server";
import { otel } from "@hono/otel";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { container } from "tsyringe";

import { AuthInterceptor } from "@src/auth/services/auth.interceptor";
import { HonoErrorHandlerService } from "@src/core/services/hono-error-handler/hono-error-handler.service";
import { RequestContextInterceptor } from "@src/core/services/request-context-interceptor/request-context.interceptor";
import type { HonoInterceptor } from "@src/core/types/hono-interceptor.type";
import { notificationsApiProxy } from "@src/notifications/routes/proxy/proxy.route";
import packageJson from "../package.json";
import { apiKeysRouter } from "./auth/routes/api-keys/api-keys.router";
import { bidsRouter } from "./bid/routes/bids/bids.router";
import { certificateRouter } from "./certificate/routes/certificate.router";
import { FeatureFlagsService } from "./core/services/feature-flags/feature-flags.service";
import { shutdownServer } from "./core/services/shutdown-server/shutdown-server";
import { chainDb, syncUserSchema, userDb } from "./db/dbConnection";
import { deploymentSettingRouter } from "./deployment/routes/deployment-setting/deployment-setting.router";
import { deploymentsRouter } from "./deployment/routes/deployments/deployments.router";
import { leasesRouter } from "./deployment/routes/leases/leases.router";
import { featuresRouter } from "./features/routes/features/features.router";
import { healthzRouter } from "./healthz/routes/healthz.router";
import { clientInfoMiddleware } from "./middlewares/clientInfoMiddleware";
import { apiRouter } from "./routers/apiRouter";
import { dashboardRouter } from "./routers/dashboardRouter";
import { deploymentRouter } from "./routers/deploymentApiRouter";
import { internalRouter } from "./routers/internalRouter";
import { legacyRouter } from "./routers/legacyRouter";
import { userRouter } from "./routers/userRouter";
import { web3IndexRouter } from "./routers/web3indexRouter";
import { env } from "./utils/env";
import { bytesToHumanReadableSize } from "./utils/files";
import { addressRouter } from "./address";
import { sendVerificationEmailRouter } from "./auth";
import {
  checkoutRouter,
  getBalancesRouter,
  getWalletListRouter,
  signAndBroadcastTxRouter,
  startTrialRouter,
  stripeCouponsRouter,
  stripePaymentMethodsRouter,
  stripePricesRouter,
  stripeTransactionsRouter,
  stripeWebhook,
  usageRouter
} from "./billing";
import { blockPredictionRouter, blocksRouter } from "./block";
import { dashboardDataRouter, graphDataRouter, leasesDurationRouter, marketDataRouter, networkCapacityRouter } from "./dashboard";
import { gpuRouter } from "./gpu";
import { networkRouter } from "./network";
import { pricingRouter } from "./pricing";
import {
  auditorsRouter,
  providerAttributesSchemaRouter,
  providerDashboardRouter,
  providerDeploymentsRouter,
  providerGraphDataRouter,
  providerRegionsRouter,
  providersRouter,
  providerVersionsRouter
} from "./provider";
import { Scheduler } from "./scheduler";
import { transactionsRouter } from "./transaction";
import { createAnonymousUserRouter, getAnonymousUserRouter } from "./user";
import { validatorsRouter } from "./validator";

const appHono = new Hono();
appHono.use(
  "/*",
  cors({
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH", "OPTIONS"],
    origin: env.CORS_WEBSITE_URLS?.split(",") || ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
    exposeHeaders: ["cf-mitigated"]
  })
);
appHono.use("*", otel());

const { PORT = 3080 } = process.env;

const scheduler = new Scheduler({
  healthchecksEnabled: env.HEALTHCHECKS_ENABLED === "true",
  errorHandler: (task, error) => {
    console.error(`Task "${task.name}" failed: ${error}`);
  }
});

appHono.use(container.resolve(HttpLoggerIntercepter).intercept());
appHono.use(container.resolve(RequestContextInterceptor).intercept());
appHono.use(container.resolve<HonoInterceptor>(AuthInterceptor).intercept());
appHono.use(clientInfoMiddleware);

appHono.route("/", legacyRouter);
appHono.route("/", apiRouter);
appHono.route("/user", userRouter);
appHono.route("/web3-index", web3IndexRouter);
appHono.route("/dashboard", dashboardRouter);
appHono.route("/internal", internalRouter);
appHono.route("/deployments", deploymentRouter);

appHono.route("/", startTrialRouter);
appHono.route("/", getWalletListRouter);
appHono.route("/", signAndBroadcastTxRouter);
appHono.route("/", checkoutRouter);
appHono.route("/", stripeWebhook);
appHono.route("/", stripePricesRouter);
appHono.route("/", stripeCouponsRouter);
appHono.route("/", stripePaymentMethodsRouter);
appHono.route("/", stripeTransactionsRouter);
appHono.route("/", usageRouter);

appHono.route("/", createAnonymousUserRouter);
appHono.route("/", getAnonymousUserRouter);
appHono.route("/", sendVerificationEmailRouter);
appHono.route("/", deploymentSettingRouter);
appHono.route("/", deploymentsRouter);
appHono.route("/", leasesRouter);
appHono.route("/", apiKeysRouter);
appHono.route("/", bidsRouter);
appHono.route("/", certificateRouter);
appHono.route("/", featuresRouter);
appHono.route("/", getBalancesRouter);
appHono.route("/", providersRouter);
appHono.route("/", auditorsRouter);
appHono.route("/", providerAttributesSchemaRouter);
appHono.route("/", providerRegionsRouter);
appHono.route("/", providerDashboardRouter);
appHono.route("/", providerVersionsRouter);
appHono.route("/", providerGraphDataRouter);
appHono.route("/", providerDeploymentsRouter);
appHono.route("/", graphDataRouter);
appHono.route("/", dashboardDataRouter);
appHono.route("/", networkCapacityRouter);
appHono.route("/", blocksRouter);
appHono.route("/", blockPredictionRouter);
appHono.route("/", transactionsRouter);
appHono.route("/", marketDataRouter);
appHono.route("/", validatorsRouter);
appHono.route("/", pricingRouter);
appHono.route("/", gpuRouter);
appHono.route("/", leasesDurationRouter);
appHono.route("/", addressRouter);
appHono.route("/", networkRouter);

appHono.route("/", notificationsApiProxy);

appHono.route("/", healthzRouter);

appHono.get("/status", c => {
  const version = packageJson.version;
  const tasksStatus = scheduler.getTasksStatus();
  const memoryInBytes = process.memoryUsage();
  const memory = {
    rss: bytesToHumanReadableSize(memoryInBytes.rss),
    heapTotal: bytesToHumanReadableSize(memoryInBytes.heapTotal),
    heapUsed: bytesToHumanReadableSize(memoryInBytes.heapUsed),
    external: bytesToHumanReadableSize(memoryInBytes.external)
  };

  return c.json({ version, memory, tasks: tasksStatus });
});

appHono.onError(container.resolve(HonoErrorHandlerService).handle);

function startScheduler() {
  scheduler.start();
}

const appLogger = LoggerService.forContext("APP");

/**
 * Initialize database
 * Start scheduler
 * Start server
 */
export async function initApp() {
  try {
    await initDb();
    startScheduler();

    await container.resolve(FeatureFlagsService).initialize();

    appLogger.info({ event: "SERVER_STARTING", url: `http://localhost:${PORT}`, NODE_OPTIONS: process.env.NODE_OPTIONS });
    const server = serve({
      fetch: appHono.fetch,
      port: typeof PORT === "string" ? parseInt(PORT, 10) : PORT
    });
    const shutdown = () => shutdownServer(server, appLogger, container.dispose.bind(container));

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  } catch (error) {
    appLogger.error({ event: "APP_INIT_ERROR", error });
  }
}

/**
 * Initialize database schema
 * Populate db
 * Create backups per version
 * Load from backup if exists for current version
 */
export async function initDb() {
  appLogger.debug(`Connecting to chain database (${chainDb.config.host}/${chainDb.config.database})...`);
  await chainDb.authenticate();
  appLogger.debug("Connection has been established successfully.");

  appLogger.debug(`Connecting to user database (${userDb.config.host}/${userDb.config.database})...`);
  await userDb.authenticate();
  appLogger.debug("Connection has been established successfully.");

  appLogger.debug("Sync user schema...");
  await syncUserSchema();
  appLogger.debug("User schema synced.");
}

export { appHono as app };
