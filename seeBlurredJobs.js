"use strict";
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const context = browser.defaultBrowserContext();
  context.overridePermissions("https://www.facebook.com", ["notifications"]);
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto("https://thawing-depths-06900.herokuapp.com/");
  await page.waitForSelector("h6");
  let jobPosts = await page.$$("h5");
  const sixthJobPost = jobPosts[5];
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
  await page.waitForSelector("#email");
  await page.focus("#email");
  await page.keyboard.type("casas.farach@yahoo.com");
  await page.focus("#pass");
  await page.keyboard.type("789654123");
  await loginButton.click();

  const continueASButton = await page.waitForXPath(
    "//button[contains(@name, '__CONFIRM__')]"
  );

  await continueASButton.click();

  // await page.type("#m_login_email", "asda");
  // await page.type("#password", "789654123");
})();
