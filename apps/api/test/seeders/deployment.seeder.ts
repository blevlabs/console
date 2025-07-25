import { Deployment } from "@akashnetwork/database/dbSchemas/akash";
import { faker } from "@faker-js/faker";
import type { CreationAttributes } from "sequelize";

export const createDeployment = async (overrides: Partial<CreationAttributes<Deployment>> = {}): Promise<Deployment> => {
  return await Deployment.create({
    id: overrides.id || faker.string.uuid(),
    owner: overrides.owner || faker.string.alphanumeric(44),
    dseq: overrides.dseq || faker.string.numeric(20),
    createdHeight: overrides.createdHeight || faker.number.int({ min: 1, max: 1000000 }),
    balance: overrides.balance || faker.number.float({ min: 0, max: 1000, multipleOf: 0.000001 }),
    deposit: overrides.deposit || faker.number.int({ min: 1, max: 1000000 }),
    denom: overrides.denom || "uakt",
    lastWithdrawHeight: overrides.lastWithdrawHeight || faker.number.int({ min: 1, max: 1000000 }),
    withdrawnAmount: overrides.withdrawnAmount || faker.number.float({ min: 0, max: 1000, multipleOf: 0.000001 }),
    closedHeight: overrides.closedHeight
  });
};
