"use strict";
const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto("https://thawing-depths-06900.herokuapp.com/");
    const mainButton = "//*[@id='app']/div/div/div[4]/button[1]";
    await page.waitForXPath(mainButton);
    await page.$eval(".buttonBasic", (el) => el.click());
    await page.$eval("li[tabindex='0']", (el) => el.click());

    

    await page.$x("input[@class='MuiInputBase-input']");
    const jobId = await Math.floor(Math.random() * 10000).toString();
    // restname
    await page.waitForSelector('input[name="restName"]');
    await page.focus('input[name="restName"]');
    await page.keyboard.type(jobId);
    //   await page.$eval('input[name="restName"]', (el) => (el.value = randomNum));
    // jobtype
    await page.focus('input[name="jobType"]');
    await page.keyboard.type("cocinero de todas las comidas");
    // hourPay
    await page.focus('input[name="hourPay"]');
    await page.keyboard.type("13 la hora");
    // typePay
    await page.click('input[name="typePay"]');
    // schedule
    await page.focus('input[name="schedule"]');
    await page.keyboard.type("todos los dias");
    // address
    await page.focus('input[name="address"]');
    await page.keyboard.type("el dorado str 123, brooklyn 12413");
    // area
    await page.click("#areaInput");
    await page.waitForSelector("ul");
    let lis = await page.$$("li");
    await lis[2].click();
    //phone
    await page.focus('input[name="phone"]');
    await page.keyboard.type("123");
    // contact
    await page.focus('input[name="contact"]');
    await page.keyboard.type("pedro");
    // extraInfo
    await page.focus('textarea[name="extraInfo"]');
    await page.keyboard.type("que no fume durante el trabajo");
    // click listo button
    const [listo] = await page.$x("//button");
    if (listo) listo.click();
    // click publish button
    await page.waitForSelector("h2");
    const [publish] = await page.$x("(//button)[3]");
    if (publish) publish.click();
    // verify that the post was created
    await page.waitForSelector("h6");
    await page.waitForXPath(`//span[contains(text(), ${jobId})]`);
    await console.log("create job test passed");
    browser.close();
})();
