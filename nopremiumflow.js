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

  await page.evaluate((text) => {
    email.value = text;
  }, "nopremiumjd@gmail.com");
  await page.waitFor(500);
  await page.evaluate((text) => {
    pass.value = text;
  }, "jobdirectoiscool");
  await page.waitFor(500);
  await loginButton.click();

  const cookiesAlert = await page
    .waitForXPath(
      "//div[@class='login_form_container']//div[@id='error_box']",
      {
        timeout: 6000,
      }
    )
    .catch((e) => void e);

  if (cookiesAlert) {
    const pass = await page.waitForSelector("#pass");
    const loginButton = await page.waitForXPath(
      "//button[contains(@name, 'login')]"
    );
    console.log("cookiesAlert appeared, continue now");
    await page.evaluate((text) => {
      pass.value = text;
    }, "jobdirectoiscool");
    await page.waitFor(1500);
    await loginButton.click();
  }

  console.log("Time for payment");

  const continueASButton = await page
    .waitForXPath("//button[contains(@name, '__CONFIRM__')]", {
      timeout: 3000,
    })
    .catch((e) => void e);

  if (continueASButton) {
    console.log("continueAs button appeared");
    continueASButton.click();
  }

  const anotherCard = await page
    .waitForXPath("//span[contains(text(),'otra tarjeta')]", {
      timeout: 3000,
    })
    .catch((e) => void e);

  if (anotherCard) {
    anotherCard.click();
  }

  // back in jobdirecto

  await page.waitForSelector("form");
  await page.$eval(
    "input[name=cardHolderName]",
    (el) => (el.value = "Juan Contreras Canales del Monte")
  );

  await page.click("input[name=cardHolderEmail]");
  await page.keyboard.type("nopremiumjd@gmail.com");
  await page.keyboard.press("Tab");
  let e;
  for (e = 0; e < 15; e++) {
    await page.waitFor(100);
    await page.keyboard.type("4");
    await page.waitFor(100);
    await page.keyboard.type("2");
  }

  const payButton = await page.waitForXPath(
    '//button[@class="sc-gqjmRU cxxCTv"]'
  );

  await payButton.click();
})();
