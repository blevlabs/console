import type { BrowserContext as Context, Page } from "@playwright/test";
import { expect } from "@playwright/test";

import { PROVIDERS_WHITELIST, testEnvConfig } from "../fixture/test-env.config";

export type FeeType = "low" | "medium" | "high";
export class DeployBasePage {
  protected readonly feeType: FeeType = "low";

  constructor(
    readonly context: Context = context,
    readonly page: Page,
    readonly path: string,
    readonly cardTestId?: string
  ) {}

  async goto() {
    await this.page.goto(`${testEnvConfig.BASE_URL}/${this.path}`);
  }

  async gotoInteractive(skipInit?: boolean) {
    if (this.cardTestId) {
      if (!skipInit) {
        await this.page.goto(testEnvConfig.BASE_URL);
      }
      await this.page.getByTestId("sidebar-deploy-button").first().click();
      await this.page.getByTestId(this.cardTestId).click();
    }
  }

  async generateSSHKeys() {
    const downloadPromise = this.page.waitForEvent("download");
    await this.page.getByTestId("generate-ssh-keys-btn").click();

    return {
      download: await downloadPromise,
      input: this.page.getByTestId("ssh-public-key-input")
    };
  }

  async createDeployment() {
    await this.page.getByTestId("create-deployment-btn").click();
    await this.page.getByTestId("deposit-modal-continue-button").click();
  }

  async createLease(providerName?: string) {
    if (providerName) {
      await this.page.getByLabel(providerName).click();
    } else {
      const providers = PROVIDERS_WHITELIST[testEnvConfig.NETWORK_ID];
      if (!providers.length) {
        await this.page.getByRole("radio", { checked: false }).click();
      } else {
        await Promise.race(
          providers.map(provider =>
            this.page
              .getByLabel(provider)
              .click()
              .catch(() => null)
          )
        );
      }
    }

    await this.page.getByTestId("create-lease-button").click();
  }

  async validateLease() {
    await this.page.waitForURL(new RegExp(`${testEnvConfig.BASE_URL}/deployments/\\d+`));
    await expect(this.page.getByText("SuccessfulCreate", { exact: true })).toBeVisible({ timeout: 10000 });
    await this.page.getByRole("tab", { name: /Leases/i }).click();
    await this.page.getByLabel(/URIs/i).getByRole("link").first().isVisible();
    await expect(this.page.getByTestId("lease-row-0-state")).toHaveText("active");
  }

  async closeDeploymentDetail() {
    await this.page.getByTestId("deployment-detail-dropdown").click();
    await this.page.getByTestId("deployment-detail-close-button").click();
  }

  async signTransaction(feeType: FeeType = this.feeType) {
    const popupPage = await this.context.waitForEvent("page");
    await popupPage.waitForLoadState("domcontentloaded");
    await popupPage.locator(`input[name="fee"][type="radio"][value="${feeType}"]`).click();
    await popupPage.getByRole("button", { name: "Approve" }).click();
    await this.page.getByText(/Transaction success/).waitFor({ state: "visible", timeout: 10_000 });
  }
}
