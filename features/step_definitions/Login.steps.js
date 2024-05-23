const { Given, Then, When } = require('@cucumber/cucumber');
const { POmanager } = require("../../pageobjects/POmanager");
// const { chromium } = require('playwright');
const DEFAULT_TIMEOUT = require('@cucumber/cucumber');
DEFAULT_TIMEOUT.setDefaultTimeout(60000);



const POM = new POmanager();


Given('user navigating to the url', async function () {
    await POM.getLoginPage().goto();
});
Then('user to validate the facebook title', async function () {
    await POM.getLoginPage().faceBookValidation();
});
Given('user to enter valid {string} and {string}', { timeout: 100 * 1000 }, async function (email, password) {
    // this.email = email;
    // this.password = password;
    await POM.getLoginPage().validLogin(email,password);
});
When('user to click on login button', async function () {
    await POM.getLoginPage().clickOnLogin();
});
When('Reading Data From Json file to Login facebook application', async function () {

    await POM.getLoginPage().readDataFromJson();
});
When('Reading Data From Excel file to Login facebook application', async function () {
    await POM.getLoginPage().enterUserCredentialFromExcel();
});
When('user click on create new account for facebook login page', async function () {
    await POM.getLoginPage().clickOnCreateNewAccount();
});
Then('user validate the signup page', async function () {
    await POM.getLoginPage().validateSignUpPage();
});
Given('user to enter valid {string} and {string} and {string} and {string}', async function (firstName, surName, mobileNumber, newPassword) {
    this.firstName = firstName;
    this.surName = surName;
    this.mobileNumber = mobileNumber;
    this.newPassword = newPassword;
    await POM.getLoginPage().enterDetails(this.firstName, this.surName, this.mobileNumber, this.newPassword);
});
When ('user to enter a data of birth',async function(){
    await POM.getLoginPage().enterDateOfBirth();
});
When('user to choose a Gender', async function () {
    await POM.getLoginPage().enterGender();
  });
When('user to click on signUp Button',{timeout:100*1000},async function(){

    await POM.getLoginPage().clickOnSignUpButton();
});
Then('user to enter wrong email and password to get a alert message',async function(){
    await POM.getLoginPage().validateErrorMessage();

});














