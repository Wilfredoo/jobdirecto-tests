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
  await page.waitForXPath("//div[contains(@class, 'MuiGrid-root sc-htoDjs iErSsN')][6]");
  //shouldnt take more than 4 seconds to retrieve data from db
  await page.waitFor(2000)
  const valuesArray = await page.$x("//div[contains(@class, 'MuiGrid-grid-sm-9')]"); 
  const div5 = valuesArray[5]
  const div7 = valuesArray[7]

  let div5Value;
  let div7Value;
  if (div7 !== undefined) {div5Value = await page.evaluate(div5 => div5.textContent, div5);}
  if (div7 !== undefined) {div7Value = await page.evaluate(div7 => div7.textContent, div7);}
    if (div5Value !== "" || div7Value !== "") { //this means that some data was retrieved from db when opening the modal
    let closeButton = await page.waitForXPath(
      "//span[contains(@class, 'MuiIcon-root')]"
    );
    await closeButton.click();
    let closeButton2 = await page.$x(
      "//span[contains(@class, 'MuiIcon-root')]"
    );
    if (closeButton2.length === 0) {
      console.log("Opening and closing job modal is working correctly");
    }
  } else {
    console.error("Someone fucked up over here");
  }
}
console.log("see 5 jobs test passed")
      browser.close();

})();
