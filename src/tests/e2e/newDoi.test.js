module.exports = {
  'Test Navigation through AddPub - search new DOI'(client) {
    client
      .url('http://localhost:3000/')
      .waitForElementVisible('.App')
      .click('#AddPubButton')
      .waitForElementVisible('#kc-content')
      .setValue('#username', process.env.KEYCLOAK_TEST_USER)
      .setValue('#password', process.env.KEYCLOAK_TEST_PASS)
      .click('input[type=submit]')
      .waitForElementVisible('#AddPub', (time = 60000))
      .setValue('input[type = doi]', '10.1002/0470841559.ch1')
      .useXpath()
      .click("//*[contains(text(),'Submit')]")
      .useCss()
      .waitForElementVisible('.DoiInfo', 20000)
      .assert.containsText('.DoiInfo', 'We found this information from the DOI:');
    client.end();
  },
};
