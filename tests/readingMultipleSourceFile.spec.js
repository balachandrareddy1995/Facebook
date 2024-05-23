
const { test } = require('@playwright/test');
const { chromium } = require('playwright');
const { AlldataPage } = require('../pageobjects/AlldataPage');
//const { chromium } = require("playwright-chromium");

test('FaceBook Login Page', async () => {
    // const browser = await chromium.launch({
    //     headless: false,
    //     executablePath: 'C:/Users/balachandra.g/AppData/Local/ms-playwright/chromium-1112/chrome-win/chrome.exe',
    // });
    // const context = await browser.newContext();
    // const page = await context.newPage();
    // await page.goto("https://www.facebook.com/");
    const alldataPage = new AlldataPage();
     await alldataPage.URL();
    await alldataPage.readDataFromJsonToEnterDataEmailAndPasswordFields('loanOriginatorLogin');
    await alldataPage.readDataFromExcelToEnterDataEmailAndPassword();
    await alldataPage.readDataFromXMLToEnterDataEmailAndPasswordFields();



});

