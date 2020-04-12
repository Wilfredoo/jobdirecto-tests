const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 300 });
  const page = await browser.newPage();
  await page.goto("https://www.jobdirecto.com/");
  const mainButton =
    "#app > div > div > div.sc-cHGsZl.brchLR > button.MuiButtonBase-root.MuiButton-root.MuiButton-text.sc-htoDjs.hsDosS.sc-kgAjT.cnEATJ.buttonBasic";
  await page.waitForSelector(mainButton);
  //*[@id="app"]/div/div/div[4]/button[1]
  await page.click(mainButton);
  await page.$x("input[@class='MuiInputBase-input']");
  console.log("hungry?");
  await browser.close();
})();
