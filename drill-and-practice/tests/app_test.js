import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import { configure } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import { app } from "../app.js";
const { test, expect } = require("@playwright/test");

configure({
    views: `../views/`,
  });
  Deno.test({/// if this test goes trough you can login with user that is not in database taken into account that pekka@aalto.fi is not in databse with password salasana
    name: "Test login with false information",
    async fn() {
        const testClient = await superoak(app);
        const loginData = new URLSearchParams();
        loginData.append('email', 'pekka@aalto.fi');
        loginData.append('password', 'salasana');
        const response = await testClient
        .post('/auth/login')
        .send(loginData.toString()).expect(302)
      },
      sanitizeResources: false,
      sanitizeOps: false,
    });
    test("Lists has a correct text on h2", async ({ page }) => {
        await page.goto("/lists");
        await expect(page.locator("h2")).toHaveText("Active lists");
      });