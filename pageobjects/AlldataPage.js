
const { chromium } = require('playwright');
const { Workbook } = require('exceljs');
const { readFile } = require('fs/promises');
const xmlJs = require('xml-js');
const { DOMParser } = require('xmldom');
//const fs = require('fs').promises;';
const ExcelJS = require('exceljs');
//const csv = require('csv-parser');    
const fs = require('fs');







class AlldataPage {
    constructor(page) {
        this.browser =null;
        this.context=null;
        this.context=null;
        this.page = page;
        this.email = "#email";
        this.passWord = "#pass";
        this.loginButton = '//button[@name="login"]';
    }

    
    async URL() {
        // const chromeExecutablePath = chromium.executablePath();
        // console.log("chrome-path:"+chromeExecutablePath);
        const isCI = process.env.CI === 'true';  // Check if running in CI environment
        const chromeExecutablePath = isCI ? undefined : chromium.executablePath();
    
        console.log("chrome-path: " + (chromeExecutablePath || "default"));
            this.browser=await chromium.launch({
            headless:false,
            executablePath:chromeExecutablePath,
           });
            this.context = await this.browser.newContext();
            this.page = await this.context.newPage();
            await this.page.goto("https://www.facebook.com/");
            //const alldataPage = new AlldataPage(this.page);
           
        
    
    
}
    async  readDataFromJsonToEnterDataEmailAndPasswordFields(key) {
        
        // json >> string >> js object(JSON) format
        // const dataset = JSON.parse(JSON.stringify(require('../Utils/data.json')));
        // console.log("Reading Input Data from Json File Email:" + dataset.email);
        // console.log("Reading Input Data from Json File PassWord:" + dataset.passWord);
        // await this.page.locator(this.email).fill(dataset.email);
        // await this.page.locator(this.passWord).fill(dataset.passWord);


        // Read the JSON file
        

        if (key === 'loanOfficerLogin' || key === 'loanOriginatorLogin') {
            const jsonData = fs.readFileSync('D:/e2e/Utils/data.json', 'utf8');
            const credentials = JSON.parse(jsonData);//json is convert from string
            const readEmail = credentials[key].email;
            console.log("Reading Input Data from Json File Email:" + readEmail);
            const readPassword = credentials[key].password;
            console.log("Reading Input Data from Json File PassWord:" + readPassword);
            await this.page.locator(this.email).fill(readEmail);
            await this.page.locator(this.passWord).fill(readPassword);
        }
        else {
            throw new Error("Invalid key provided: " + key);
        }

    
}

    
    async readDataFromExcelToEnterDataEmailAndPassword() {
      
        //Read test data from Excel file
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile('D:/e2e/Utils/testData.xlsx');
        const worksheet = workbook.getWorksheet('Sheet1');
        // Assuming your Excel file has columns 'username' and 'password'
        worksheet.eachRow(async (row, rowNumber) => {
            if (rowNumber > 1) { // Skip header row 
                const readEmail = row.getCell(1).value;
                const readPassWord = row.getCell(2).value;  // Enter username and password
                console.log("Reading Input Data From Excel To Enter Email:" + readEmail);
                console.log("Reading Input Data From Excel To Enter Email:" + readPassWord);
                await this.page.locator(this.email).fill(readEmail);
                await this.page.locator(this.passWord).fill(readPassWord);



            }
        });


    }

 
async readDataFromXMLToEnterDataEmailAndPasswordFields() {

        const testData = await readFile('D:/e2e/Utils/testdata.xml', 'utf-8');
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(testData, 'text/xml');

        // Extract username and password from XML
        const username = xmlDoc.getElementsByTagName('username')[0].textContent;
        const password = xmlDoc.getElementsByTagName('password')[0].textContent;
        console.log("Reading Input Data From XML file userName:" + username);
        console.log("Reading Input Data From XML file  Password:" + password);

        // Fill in login form fields
        await this.page.locator(this.email).fill(username);
        await this.page.locator(this.passWord).fill(password);
    }


    async readDataFromCSVFileToEnterDataEmailAndPasswordFields() {

      
        // const testData = await readCSV('D:/e2e/Utils/testdata.csv');
        // for (const data of testData) {
        //     await this.page.locator(this.email).fill(data.email);
        //     await this.page.locator(this.passWord).fill(data.password);

        const fs = require('fs');
        const csv = require('csv-parser');

        fs.createReadStream('D:/e2e/Utils/testdata.csv')
            .pipe(csv())
            .on('data', async (data) => {
                // Fill email and password fields with data from CSV
                await page.locator(this.email).fill(data.email);
                await page.locator(this.passWord).fill(data.password);
            })
            .on('end', () => {
                console.log('CSV file successfully processed');
                browser.close(); // Close the browser once done
            });




    }
}






module.exports = { AlldataPage };