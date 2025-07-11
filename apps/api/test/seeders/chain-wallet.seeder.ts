import { faker } from "@faker-js/faker";

import { createAkashAddress } from "./akash-address.seeder";
export function createChainWallet(input: Partial<ChainWallet> = {}): ChainWallet {
  return {
    address: input.address ?? createAkashAddress(),
    limits: {
      deployment: input.limits?.deployment ?? faker.number.int({ min: 0, max: 1000000 }),
      fees: input.limits?.fees ?? faker.number.int({ min: 0, max: 100 })
    }
  };
}

export interface ChainWallet {
  address: string;
  limits: {
    deployment: number;
    fees: number;
  };
}
