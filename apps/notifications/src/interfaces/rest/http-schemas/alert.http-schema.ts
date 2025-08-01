import { createZodDto } from "nestjs-zod";
import { z } from "zod";

import { toPaginatedResponse } from "@src/lib/http-schema/http-schema";
import {
  chainMessageConditionsSchema,
  chainMessageParamsSchema,
  chainMessageTypeSchema,
  deploymentBalanceConditionsSchema,
  deploymentBalanceParamsSchema,
  deploymentBalanceTypeSchema
} from "@src/modules/alert/repositories/alert/alert-json-fields.schema";

export const alertCreateCommonInputSchema = z.object({
  notificationChannelId: z.string().uuid(),
  name: z.string().min(3),
  enabled: z.boolean().optional().default(true),
  summary: z.string().min(3),
  description: z.string().min(3)
});

export const chainMessageCreateInputSchema = alertCreateCommonInputSchema
  .extend({
    type: chainMessageTypeSchema,
    params: chainMessageParamsSchema.optional(),
    conditions: chainMessageConditionsSchema
  })
  .strict();

export const deploymentBalanceCreateInputSchema = alertCreateCommonInputSchema
  .extend({
    type: deploymentBalanceTypeSchema,
    conditions: deploymentBalanceConditionsSchema,
    params: deploymentBalanceParamsSchema
  })
  .strict();

export const alertCreateInputSchema = z.discriminatedUnion("type", [chainMessageCreateInputSchema, deploymentBalanceCreateInputSchema]);

export class AlertCreateInput extends createZodDto(z.object({ data: alertCreateInputSchema })) {}

export const alertPatchInputSchema = alertCreateCommonInputSchema
  .extend({
    conditions: z.union([chainMessageConditionsSchema, deploymentBalanceConditionsSchema])
  })
  .partial();

export class AlertPatchInput extends createZodDto(z.object({ data: alertPatchInputSchema })) {}

export const alertCommonOutputSchema = alertCreateCommonInputSchema.extend({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  enabled: z.boolean(),
  notificationChannelName: z.string().optional(),
  status: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const chainMessageOutputSchema = alertCommonOutputSchema.extend({
  type: chainMessageTypeSchema,
  params: chainMessageParamsSchema.optional(),
  conditions: chainMessageConditionsSchema
});

export const deploymentBalanceOutputSchema = alertCommonOutputSchema.extend({
  type: deploymentBalanceTypeSchema,
  conditions: deploymentBalanceConditionsSchema,
  params: deploymentBalanceParamsSchema
});

export const alertOutputSchema = z.discriminatedUnion("type", [chainMessageOutputSchema, deploymentBalanceOutputSchema]);

export const alertOutputResponseSchema = z.object({ data: alertOutputSchema });
export class AlertOutputResponse extends createZodDto(alertOutputResponseSchema) {}

export class AlertListOutputResponse extends createZodDto(toPaginatedResponse(alertOutputSchema)) {}
