module.exports = {
    'Test Navigation through keycloak to AddPub'(client) {
      client
        .url('http://localhost:3000/')
        .waitForElementVisible('.App')
        .click('#AddPubButton')
        .waitForElementVisible('#kc-content')
        .setValue('#username', "ccvpubs-test")
        .setValue('#password', "test")
        .click('input[type=submit]')
        .waitForElementVisible('#AddPub', time = 60000)
      client.end();
    },
    
    'Test Navigation through AddPub - logout'(client) {
      client
        .url('http://localhost:3000/')
        .waitForElementVisible('.App')
        .click('#AddPubButton')
        .waitForElementVisible('#kc-content')
        .setValue('#username', "ccvpubs-test")
        .setValue('#password', "test")
        .click('input[type=submit]')
        .waitForElementVisible('#AddPub', time = 60000)
        .useXpath().click("//*[contains(text(),'Logout')]") 
        .useCss().waitForElementVisible('.ContentPage', time = 60000)
      client.end();
    },

    'Test Navigation through AddPub - no info found for DOI'(client) {
      client
        .url('http://localhost:3000/')
        .waitForElementVisible('.App')
        .click('#AddPubButton')
        .waitForElementVisible('#kc-content')
        .setValue('#username', "ccvpubs-test")
        .setValue('#password', "test")
        .click('input[type=submit]')
        .waitForElementVisible('#AddPub', time = 60000)
        .setValue('input[type = doi]', '2')
        .useXpath().click("//*[contains(text(),'Submit')]")    
        .useCss().assert.containsText("#AddPub", "No Information Found")
      client.end();
    },
    
  }