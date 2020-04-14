"use strict";
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
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
  const loginButton = await page.waitForXPath(
    "//button[contains(@name, 'login')]"
  );
  await loginButton.click();

  await page.type("#m_login_email", "casas.farach@yahoo.com");
  await page.type("#password", "789654123");
})();
