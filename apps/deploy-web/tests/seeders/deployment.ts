import { faker } from "@faker-js/faker";
import type { DeepPartial } from "cosmjs-types/helpers";
import { merge } from "lodash";

import type { USDC_IBC_DENOMS } from "@src/config/denom.config";
import { UAKT_DENOM } from "@src/config/denom.config";
import type { RpcDeployment } from "@src/types/deployment";
import { genWalletAddress } from "./wallet";

export function buildRpcDeployment({
  denom = UAKT_DENOM,
  ...overrides
}: DeepPartial<RpcDeployment> & { denom?: typeof UAKT_DENOM | (typeof USDC_IBC_DENOMS)["mainnet"] | (typeof USDC_IBC_DENOMS)["sandbox"] } = {}): RpcDeployment {
  const walletAddress = overrides?.deployment?.deployment_id?.owner || genWalletAddress();
  const dseq = overrides?.deployment?.deployment_id?.dseq || faker.string.numeric({ length: 6 }).toString();
  return merge(
    {
      deployment: {
        deployment_id: {
          owner: walletAddress,
          dseq: dseq
        },
        state: "closed",
        version: "bLTCo5xFV2obtovLJ/rUZDHLkzAbB8vlXpF2iJGKpaY=",
        created_at: "666924"
      },
      groups: [
        {
          group_id: {
            owner: walletAddress,
            dseq: dseq,
            gseq: 1
          },
          state: "closed",
          group_spec: {
            name: "dcloud",
            requirements: {
              signed_by: {
                all_of: [],
                any_of: []
              },
              attributes: []
            },
            resources: [
              {
                resource: {
                  cpu: {
                    units: {
                      val: "500"
                    },
                    attributes: []
                  },
                  memory: {
                    quantity: {
                      val: "536870912"
                    },
                    attributes: []
                  },
                  storage: [
                    {
                      name: "default",
                      quantity: {
                        val: "536870912"
                      },
                      attributes: []
                    }
                  ],
                  gpu: {
                    units: {
                      val: "0"
                    },
                    attributes: []
                  },
                  endpoints: [
                    {
                      kind: "SHARED_HTTP",
                      sequence_number: 0
                    }
                  ]
                },
                count: 1,
                price: {
                  denom,
                  amount: "10000.000000000000000000"
                }
              }
            ]
          },
          created_at: "666924"
        }
      ],
      escrow_account: {
        id: {
          scope: "deployment",
          xid: `${walletAddress}/${dseq}`
        },
        owner: walletAddress,
        state: "closed",
        balance: {
          denom,
          amount: "0.438400000000000000"
        },
        transferred: {
          denom,
          amount: "159.561600000000000000"
        },
        settled_at: "667969",
        depositor: walletAddress,
        funds: {
          denom,
          amount: "0.000000000000000000"
        }
      }
    },
    overrides
  );
}
