"use strict";
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto("https://thawing-depths-06900.herokuapp.com/");

  await page.waitForSelector("h6");

  let jobPosts = await page.$$("h5");
  console.log(jobPosts.length);
})();
