"use strict";
const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const context = browser.defaultBrowserContext();
    context.overridePermissions("https://www.facebook.com", ["notifications"]);
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto("https://thawing-depths-06900.herokuapp.com/");
    await page.waitForSelector("h6");
    let jobPosts = await page.$$("h5");
    let tenthPost = jobPosts[9];

    // click job post
    await tenthPost.click();
  
    const subscribeButton = await page.waitForXPath(
        "//a[contains(@class, 'sc-elJkPf')]"
    );
    await subscribeButton.click();
    const fbButton = await page.waitForXPath(
        "//a[contains(@class, 'sc-fAjcbJ')]"
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

    const continueASButton = await page
        .waitForXPath("//button[contains(@name, '__CONFIRM__')]", {
            timeout: 3000,
        })
        .catch((e) => void e);

    if (continueASButton) {
        console.log("continueAs button appeared");
        continueASButton.click();
    }

    await page.waitForNavigation
    await page.waitForSelector("h6");
    let jobPostsAgain = await page.$$("h5");
    let tenthPostAgain = jobPostsAgain[10];
    tenthPostAgain.click();

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
        '//button[@class="sc-iRbamj bGTzCg"]'
    );

    await payButton.click();

    // await page.waitForXPath("//p[contains(@class, 'cGkjfA')]");
    console.log("will find close button")
    const closeButton = await page.waitForXPath(
        "//button[contains(@class, 'iaJQrc')]"
    );
    console.log("found close button")
    await closeButton.click();

    let jobPostsAgain2 = await page.$$("h5");
    let tenthPostAgain2 = jobPostsAgain2[10];
    tenthPostAgain2.click();

    await page.waitForXPath("//div[contains(@class, 'cPSvK')]//h2");
    console.log("no-premium flow test passed");
    browser.close();
})();
