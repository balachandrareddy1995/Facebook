

@skip
Feature: User to create a new Account and login the Facebook application,to validate the alert message when we provide invalid email and password to login the facebook account.

    Scenario Outline:user to login the facebook appication positive and neagaive scenario
        Given user navigating to the url
        Then user to validate the facebook title
        Given  user to enter valid "<email>" and "<password>"
        When  user to click on login button
        Examples:
            | email   | password   |
            | america | america123 |
@skip

    Scenario: Read the data from Json to sending json data into email and password field in facebook login.
        Given user navigating to the url
        Then user to validate the facebook title
        When Reading Data From Json file to Login facebook application
        When  user to click on login button
@skip

    Scenario:Read the data from Excel to sending data into email and password field in facebook login
        Given user navigating to the url
        Then user to validate the facebook title
        When Reading Data From Excel file to Login facebook application
        When  user to click on login button
    
@only

    Scenario Outline:User to Create a New Account For Facebook
        Given user navigating to the url
        Then user to validate the facebook title
        When user click on create new account for facebook login page
        Then user validate the signup page
        Given user to enter valid "<firstName>" and "<surName>" and "<mobileNumber>" and "<newPassword>"
        When user to enter a data of birth
        When user to choose a Gender
        When user to click on signUp Button
        Examples:
            | firstName        | surName     | mobileNumber | newPassword  |
            | Chandra@1996.com | sunnampalli | 8919655100   | Password@123 |
@skip

    Scenario Outline:User not able to login because providing wrong credentional
        Given user navigating to the url
        Given user to enter valid "<email>" and "<password>"
        When  user to click on login button
        Then  user to enter wrong email and password to get a alert message
        Examples:
            | email         | password    |
            | Chan@1996.com | Password@12 |













