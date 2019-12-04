const { Builder, By, Key, util, until } = require("selenium-webdriver");
const assert  = require("assert");
var constant = require('./constants');
var headless = require("./make-chrome-headless");



describe("Tests on Assigments Module of http://slate.nu.edu.pk ", async function() {
  this.timeout(70000);
  var driver;

  this.beforeEach(async function() {
    driver = headless();

    await driver.get("http://slate.nu.edu.pk/portal");

    
    await driver.findElement(By.xpath(constant.LOGIN_USER_ID)).sendKeys(constant.ROLL_NUMBER); //username
    await driver.findElement(By.xpath(constant.LOGIN_PASSWORD)).sendKeys(constant.PASSWORD); //username
    await driver.findElement(By.xpath(constant.LOGIN_BUTTON)).click();

    await driver
    .wait(until.elementLocated(By.xpath(constant.SUBJECT_TAB_AP)), 10000)
    .click(); 
    
  });
  // this.afterEach(async function() {
  //  driver.quit();
  // });

  it("should have 'Assignment' tab after login", async function() {
    
    this.timeout(30000);
  
    const assignmentTab = await driver
    .wait(until.elementLocated(By.xpath(constant.ASSIGNMENT_TAB)), 10000);

    assert.equal("Assignments", await assignmentTab.getText());

  });

  it("should check if there are any assignments in the list", async function() {
    
    this.timeout(50000);
  
    await driver
    .wait(until.elementLocated(By.xpath(constant.ASSIGNMENT_TAB)), 10000).click();

    let assignments = await driver.wait(
      until.elementsLocated(By.xpath("//tbody//tr")),
      30000
    );

    const assignmentCount = await assignments.length;

    if(assignmentCount > 0){
    assert.ok(true);
    }
  });

  it("should give an error for empty assignment/project submission", async function() {
    
    this.timeout(50000);
  
    await driver
    .wait(until.elementLocated(By.xpath(constant.ASSIGNMENT_TAB)), 10000).click();

    await driver
    .wait(until.elementLocated(By.xpath(constant.PROJECT_SUBMISSION)), 20000).click();

    await driver
    .wait(until.elementLocated(By.xpath(constant.HONOR_PLEDGE_CHECK_BOX)), 30000).click();

    
    await driver
    .wait(until.elementLocated(By.xpath(constant.SUBMIT_ASSIGNMENT)), 20000).click();

    
    const errorMsgEl = await driver
    .wait(until.elementLocated(By.xpath(constant.ERROR_MSG_ON_EMPTY_ASSIGNMENT_SUBMISSION)), 30000);

    const getErrorMsg = await errorMsgEl.getText();

    assert.ok(getErrorMsg.includes("You must either type in"));

  });


  it("should have the correct file extension, i.e. Either .rar, .pdf, .zip or .doc", async function() {
    
    this.timeout(50000);
  
    await driver
    .wait(until.elementLocated(By.xpath(constant.ASSIGNMENT_TAB)), 10000).click();

    await driver
    .wait(until.elementLocated(By.xpath(constant.ASSIGNMENT_1)), 20000).click();

    const checkFileType = await driver
    .wait(until.elementLocated(By.xpath(constant.CHECK_ATTACHMENT_FILE_TYPE)), 30000);

    const getFileType = await checkFileType.getText();

    assert.ok(getFileType.includes(".rar") || getFileType.includes(".pdf")|| getFileType.includes(".zip")|| getFileType.includes(".doc"));

  });
  

});