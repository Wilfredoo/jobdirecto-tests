"use strict";
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto("https://thawing-depths-06900.herokuapp.com/");
  await page.waitForSelector("h6");
  let jobPosts = await page.$$("h5");
  const thirdJobPost = jobPosts[2];
  const positionInMain = await page.evaluate(
    (thirdJobPost) => thirdJobPost.textContent,
    thirdJobPost
  );
  // click job post
  await thirdJobPost.click();
  await page.waitForXPath("//div[contains(@class, 'bUwXfy')]");
  const modalTexts = await page.$x("//div[contains(@class, 'bUwXfy')]");
  let secondTextModal = modalTexts[1];
  const positionInModal = await page.evaluate(
    (secondTextModal) => secondTextModal.textContent,
    secondTextModal
  );
  if (positionInMain === positionInModal) {
    let closeButton = await page.waitForXPath(
      "//span[contains(@class, 'MuiIcon-root')]"
    );

    await closeButton.click();

    let closeButton2 = await page.$x(
      "//span[contains(@class, 'MuiIcon-root')]"
    );
    if (closeButton2.length === 0) {
      console.log("Opening and closing job modal is working correctly");
      browser.close();
    }
  } else {
    console.error("Someone fucked up over here");
  }
})();
