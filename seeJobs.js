"use strict";
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto("https://thawing-depths-06900.herokuapp.com/");
  await page.waitForSelector("h6");
  let i;
  for (i = 0; i < 5; i++) {
  let jobPosts = await page.$$("h5");
  const jobPost = jobPosts[i];
  // click job post
  await jobPost.click();
  // console.log("clicked on jobpost", jobPost)
  console.log("did not found that thing yet")
  await page.waitForXPath("//div[contains(@class, 'MuiGrid-root sc-htoDjs iErSsN')][6]");
  console.log("found that thing")
  //shouldnt take more than 4 seconds to retrieve data from db
  await page.waitFor(2000)
  let closeButton = await page.waitForXPath(
    "//span[contains(@class, 'MuiIcon-root')]"
  );
  await closeButton.click();  
  
}
console.log("see 5 jobs test passed")
      browser.close();

})();
