import { LoggerService } from "@akashnetwork/logging";
import { HttpLoggerIntercepter } from "@akashnetwork/logging/hono";
import type { SupportedChainNetworks } from "@akashnetwork/net";
import { netConfig } from "@akashnetwork/net";

import { CertificateValidator, createCertificateValidatorInstrumentation } from "./services/CertificateValidator";
import { ProviderProxy } from "./services/ProviderProxy";
import { ProviderService } from "./services/ProviderService";
import { WebsocketStats } from "./services/WebsocketStats";

export function createContainer() {
  const isLoggingDisabled = process.env.NODE_ENV === "test";

  const wsStats = new WebsocketStats();
  const providerService = new ProviderService((network: SupportedChainNetworks) => {
    // TEST_CHAIN_NETWORK_URL is hack for functional tests
    // there is no good way to mock external server in nodejs
    // both nock and msw do not work well when I need to use low level API like X509 certificate validation
    // for some reason when those libraries are used I receive MockSocket instead of TLSSocket
    // @see https://github.com/mswjs/msw/discussions/2416
    return process.env.TEST_CHAIN_NETWORK_URL || netConfig.getBaseAPIUrl(network);
  }, fetch);
  const certificateValidator = new CertificateValidator(
    Date.now,
    providerService,
    isLoggingDisabled ? undefined : createCertificateValidatorInstrumentation(new LoggerService({ name: "cert-validator" }))
  );
  const providerProxy = new ProviderProxy(certificateValidator);
  const createWsLogger = isLoggingDisabled ? undefined : (id: string) => new LoggerService({ name: "ws", context: id });
  const httpLogger = isLoggingDisabled ? undefined : new LoggerService({ name: "http" });
  const httpLoggerInterceptor = new HttpLoggerIntercepter(httpLogger);
  const appLogger = isLoggingDisabled ? undefined : new LoggerService({ name: "app" });

  return {
    wsStats,
    providerProxy,
    certificateValidator,
    httpLogger,
    httpLoggerInterceptor,
    createWsLogger,
    netConfig,
    appLogger
  };
}

export type Container = ReturnType<typeof createContainer>;
