
const { LoginPage } = require('../pageobjects/LoginPage');

class POmanager {
    constructor() {
        
        this.loginPage = new LoginPage();  
    }
    getLoginPage() {

        return this.loginPage;
    }
    
}
module.exports = { POmanager };