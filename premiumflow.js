"use strict";
const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: "/usr/bin/google-chrome",
    });
    const context = browser.defaultBrowserContext();
    context.overridePermissions("https://www.facebook.com", ["notifications"]);
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto("https://thawing-depths-06900.herokuapp.com/");
    await page.waitForSelector("h6");
    let jobPosts = await page.$$("h5");
    let sixthJobPost = jobPosts[5];
    // click job post
    await sixthJobPost.click();
    const subscribeButton = await page.waitForXPath(
        "//a[contains(@class, 'bqdxry')]"
    );
    await subscribeButton.click();
    const fbButton = await page.waitForXPath(
        "//a[contains(@class, 'sc-eNQAEJ')]"
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
    }, "premiumjd@gmail.com");
    await page.waitFor(500);
    await page.evaluate((text) => {
        pass.value = text;
    }, "jobdirectoiscool");
    await page.waitFor(500);
    await loginButton.click();
})();
