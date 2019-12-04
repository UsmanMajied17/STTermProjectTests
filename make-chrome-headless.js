
const { Builder } = require("selenium-webdriver");
let chrome = require("selenium-webdriver/chrome");

module.exports = function () {

    var options = new chrome.Options();
    options.addArguments("--no-sandbox")
    options.addArguments("--disable-dev-shm-usage")
    options.addArguments("--window-size=1920,1080");
    options.addArguments("--start-maximized")
    options.addArguments('allow-file-access-from-files')
    // options.addArguments('use-fake-device-for-media-stream')
    options.addArguments('use-fake-ui-for-media-stream')
    //options.addArguments("--user-data-dir=D:\\Work\\HashLogics\\Selenium\\Default");
    // options.addArguments("--user-data-dir=./profile1/Default");


    options.headless();
    var driver = new Builder()
     .forBrowser("chrome")
     .setChromeOptions(new chrome.Options().headless())
     .setChromeOptions(options)
     .build();
 
     return driver;
 }