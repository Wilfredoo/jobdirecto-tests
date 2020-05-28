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
  await page.waitForXPath("//div[contains(@class, 'MuiGrid-root sc-htoDjs iErSsN')][6]");

  //shouldnt take more than 4 seconds to retrieve data from db
  await page.waitFor(4000)

  const fieldContentArray = await page.$x("//div[contains(@class, 'MuiGrid-root sc-htoDjs iErSsN MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-9 MuiGrid-grid-md-9')]"); 
  const addressDiv = fieldContentArray[5]
  const phoneDiv = fieldContentArray[7]
  const addressText = await page.evaluate(addressDiv => addressDiv.textContent, addressDiv);
  const phoneText = await page.evaluate(phoneDiv => phoneDiv.textContent, phoneDiv);
  console.log("true and false", addressText === "" , phoneText === "")

  console.log("should be true", addressText !== "" || phoneText !== "")




    if (false) {
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
