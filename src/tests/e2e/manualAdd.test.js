module.exports = {
'Test Navigation through AddPub - manual add'(client) {
    client
      .url('http://localhost:3000/')
      .waitForElementVisible('.App')
      .click('#AddPubButton')
      .waitForElementVisible('#kc-content')
      .setValue('#username', process.env.KEYCLOAK_TEST_USER)
      .setValue('#password', process.env.KEYCLOAK_TEST_PASS)
      .click('input[type=submit]')
      .waitForElementVisible('#AddPub', time = 60000)
      .useXpath().click("//*[contains(text(),'Enter Manually')]")  
      .useCss().waitForElementVisible('.DoiInfo',10000)
      .useCss().setValue('#title', "TEST")
      .setValue('#doi', "10.0000/000")
      .useXpath().click("//*[contains(text(),'Submit')]")    
      .useCss().assert.containsText("#AddPub", "Success!")
    client.end();
  },

  'Test Navigation through AddPub - manual add in table'(client) {
    client
      .url('http://localhost:3000/')
      .waitForElementVisible('.App')
      .click('#AddPubButton')
      .waitForElementVisible('#kc-content')
      .setValue('#username', process.env.KEYCLOAK_TEST_USER)
      .setValue('#password', process.env.KEYCLOAK_TEST_PASS)
      .click('input[type=submit]')
      .waitForElementVisible('#AddPub', time = 60000)
      .useXpath().click("//*[contains(text(),'Enter Manually')]")  
      .useCss().waitForElementVisible('.DoiInfo',10000)
      .useCss().setValue('#title', "TEST")
      .setValue('#doi', "10.0000/000")
      .useXpath().click("//*[contains(text(),'Submit')]")    
      .useCss().assert.containsText("#AddPub", "Success!")
      .useXpath().click("//*[contains(text(),'Back to Home')]")  
      .useCss().waitForElementVisible('.PubsTable-CP')
      .setValue('.ReactTable .rt-thead.-filters input:nth-of-type(1)', "TEST")
      .assert.containsText('.ReactTable .rt-tbody', "TEST")
    client.end();
  },

  'Test Navigation through AddPub - manual add no title or doi'(client) {
    client
      .url('http://localhost:3000/')
      .waitForElementVisible('.App')
      .click('#AddPubButton')
      .waitForElementVisible('#kc-content')
      .setValue('#username', process.env.KEYCLOAK_TEST_USER)
      .setValue('#password', process.env.KEYCLOAK_TEST_PASS)
      .click('input[type=submit]')
      .waitForElementVisible('#AddPub', time = 60000)
      .useXpath().click("//*[contains(text(),'Enter Manually')]")  
      .useCss().waitForElementVisible('.DoiInfo',10000)
      .useXpath().click("//*[contains(text(),'Submit')]")    
      .useCss().assert.containsText("#AddPub", "Please enter at least DOI and Title")
    client.end();
  },
}