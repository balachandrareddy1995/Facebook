//imports
const { test} = require('@playwright/test');
const { chromium } = require('playwright');
const { config } = require('@playwright/test');
const { json } = require('stream/consumers');
const ExcelJS = require('exceljs');
const { expect } = require('@playwright/test');
const fs = require('fs');
const { Workbook } = require('exceljs');
const { Locator } = require('playwright');


class LoginPage {
    
    constructor(browser, page) {
        this.browser = browser;
        this.page = page;
        this.email = "#email";
        this.passWord = "#pass";
        this.loginButton = '//button[@name="login"]';
        this.createNewAccount_Button = '//a[text()="Create new account"]';
        this.signUp = '//div[text()="Sign Up"]';
        this.firstName = '//input[@aria-label="First name"]';
        this.surName = '//input[@aria-label="Surname"]';
        this.mobil_Number = '//input[@aria-label="Mobile number or email address"]';
        this.newPassWord = '//input[@aria-label="New password"]';
        this.day = '//select[@id="day"]';
        this.month='//select[@id="month"]';
        this.year='//select[@id="year"]';
        this.gender='//label[text()="Male"]';
        this.signUp_Button='//button[@name="websubmit"]';
        this.errorMessage="//div[contains(text(),'email')]";
    }
    async goto() {
        this.browser = await chromium.launch({ headless: false });
        this.page = await this.browser.newPage();
        await this.page.goto("https://www.facebook.com/");
        //await this.page.waitForTimeout(50000);
       

    }
    async faceBookValidation() {
        const pageTitle = await this.page.title();
        console.log("FaceBook-Title: " + pageTitle);
        await expect(this.page).toHaveTitle("Facebook – log in or sign up");
    }
    async validLogin(email, password) {
        await this.page.locator(this.email).type(email);
        await this.page.locator(this.passWord).type(password);
    }
    async clickOnLogin() {
        await this.page.locator(this.loginButton).click();
    }
    async readDataFromJson() {
        //json >> string >> js object(JSON) format
        const dataset = JSON.parse(JSON.stringify(require('../Utils/data.json')));
        await this.page.locator(this.email).type(dataset.email);
        await this.page.locator(this.passWord).type(dataset.passWord);
    }
    async enterUserCredentialFromExcel() {
        const filePath = 'Utils\\TestData.xlsx';
        const workbook = new Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet(1);
        const email = worksheet.getCell('A2').value.toString();
        const passWord = worksheet.getCell('A3').value.toString();
        console.log("Reading Input Data From Excel :" + email);
        console.log("Reading Input Data From Excel :" + passWord);
        await this.page.locator(this.email).type(email);
        await this.page.locator(this.passWord).type(passWord);
    }
    async clickOnCreateNewAccount() {
        await this.page.locator(this.createNewAccount_Button).click();
    }
    async validateSignUpPage() {
        const pageText = await this.page.locator(this.signUp).textContent();
        this.retrivedText = pageText;
        console.log("Extracting the text From Signup popup :" + pageText);
        expect(this.retrivedText).toBe('Sign Up');
    }
    async enterDetails(firstName, surName, mobileNumber, newPassword) {
        await this.page.locator(this.firstName).fill(firstName);
        await this.page.locator(this.surName).fill(surName);
        await this.page.locator(this.mobil_Number).fill(mobileNumber);
        await this.page.locator(this.newPassWord).fill(newPassword);
    }
    async enterDateOfBirth() {
        await this.page.locator(this.day).selectOption("18");
        await this.page.locator(this.month).selectOption("Jun");
        await this.page.locator(this.year).selectOption("1996");
    }
    async enterGender(){
        await this.page.locator(this.gender).click();
    }
    async clickOnSignUpButton(){
        await this.page.locator(this.signUp_Button).click();
        await this.page.waitForLoadState('domcontentloaded');
    }
    async validateErrorMessage(){
        const errorMessage=await this.page.locator(this.errorMessage).textContent();
       this.errormessage=errorMessage;
        console.log("Alert Message : "+this.errormessage);
        await expect(this.errormessage).toBe("The email address you entered isn't connected to an account. Find your account and log in.")
    }
}
module.exports = { LoginPage };

