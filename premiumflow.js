"use strict";
const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 200,
    });
    const context = browser.defaultBrowserContext();
    context.overridePermissions("https://www.facebook.com", ["notifications"]);
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto("https://thawing-depths-06900.herokuapp.com/");
    await page.waitForSelector("h6");
    let jobPosts = await page.$$("h5");
    let tenthPost = jobPosts[9];
    // click job post
    await tenthPost.click();
    const subscribeButton = await page.waitForXPath(
        "//a[contains(@class, 'sc-elJkPf')]"
    );
    await subscribeButton.click();
    const fbButton = await page.waitForXPath(
        "//a[contains(@class, 'sc-fAjcbJ')]"
    );
    await fbButton.click();

    // redirected to facebook page
    const loginButton = await page.waitForXPath(
        "//button[contains(@name, 'login')]"
    );
    const email = await page.waitForSelector("#email");
    const pass = await page.waitForSelector("#pass");

    await page.evaluate((text) => {
        email.value = text;
    }, "yespremiumjd@gmail.com");
    await page.waitFor(500);
    await page.evaluate((text) => {
        pass.value = text;
    }, "jobdirectoiscool");
    await page.waitFor(500);
    await loginButton.click();

    const continueASButton = await page
        .waitForXPath("//button[contains(@name, '__CONFIRM__')]", {
            timeout: 3000,
        })
        .catch((e) => void e);

    if (continueASButton) {
        console.log("continueAs button appeared");
        continueASButton.click();
    }
await page.waitForNavigation
await page.waitForSelector("h6");
   let jobPostsAgain = await page.$$("h5");
  let tenthPostAgain = jobPostsAgain[10];
tenthPostAgain.click();
console.log("and here?")
    await page.waitForXPath("//div[contains(@class, 'MuiDialogTitle-root')]");
    console.log("premium flow test passed");
    browser.close();
})();
