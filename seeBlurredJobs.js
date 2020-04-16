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
  const email = await page.waitForSelector("#email");
  const pass = await page.waitForSelector("#pass");

  // await page.focus("#email");
  await page.evaluate((text) => {
    email.value = text;
  }, "casas.farach@yahoo.com");

  await page.evaluate((text) => {
    pass.value = text;
  }, "789654123");
  await loginButton.click();
  console.log("-1");

  // const continueASButton = await page.waitForXPath(
  //   "//button[contains(@name, '__CONFIRM__')]"
  // );

  // back in jobdirecto
  await page.waitFor(2000);
  await page.waitForSelector("form");
  console.log("2");
  const nameInput = await page.waitForXPath(
    "//input[contains(@name, 'cardHolderName')]"
  );

  await nameInput.focus();

  await page.keyboard.type("casas.farach@yahoo.com");

  const emailInput = await page.waitForXPath(
    "//input[contains(@name, 'cardHolderEmail')]"
  );
  const cardInput = await page.waitForXPath(
    "//input[contains(@name, 'cardnumber')]"
  );
})();
