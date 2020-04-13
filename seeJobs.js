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
  console.log(positionInMain);
  // click job post
  await thirdJobPost.click();
  await page.waitForXPath("//div[contains(@class, 'bUwXfy')]");
  const modalTexts = await page.$x("//div[contains(@class, 'bUwXfy')]");
  console.log(modalTexts.length);
  let secondTextModal = modalTexts[1];
  const positionInModal = await page.evaluate(
    (secondTextModal) => secondTextModal.textContent,
    secondTextModal
  );
  console.log(positionInMain === positionInModal);
  if (positionInMain === positionInModal) {
  } else {
    console.error("Someone fucked up over here");
  }

  browser.close();
})();
