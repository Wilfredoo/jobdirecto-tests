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

  await page.waitFor(1000);

  await page.evaluate((text) => {
    email.value = text;
  }, "casas.farach@yahoo.com");
  await page.waitFor(1000);

  await page.evaluate((text) => {
    pass.value = text;
  }, "789654123");
  await page.waitFor(1000);

  await loginButton.click();

  const [continueASButton] = await page.$x(
    "//button[contains(@name, '__CONFIRM__')]"
  );

  if (continueASButton) {
    continueASButton.click();
  }
  // back in jobdirecto
  await page.waitForSelector("form");
  await page.$eval(
    "input[name=cardHolderName]",
    (el) => (el.value = "Juan Contreras Canales del Monte")
  );

  await page.$eval(
    "input[name=cardHolderEmail]",
    (el) => (el.value = "juanitex@hotmail.com")
  );

  await page.$eval("input[name=cardnumber]", (el) => (el.value = "42424242"));
})();
