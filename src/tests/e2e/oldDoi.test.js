module.exports = {
  "Test Navigation through AddPub - search old DOI"(client) {
    client
      .url("http://localhost:3000/")
      .waitForElementVisible(".App")
      .click("#AddPubButton")
      .waitForElementVisible("#kc-content")
      .setValue("#username", process.env.KEYCLOAK_TEST_USER)
      .setValue("#password", process.env.KEYCLOAK_TEST_PASS)
      .click("input[type=submit]")
      .waitForElementVisible("#AddPub", (time = 60000))
      .setValue("input[type = doi]", "10.1038/nphys1170")
      .useXpath()
      .click("//*[contains(text(),'Submit')]")
      .useCss()
      .waitForElementVisible(".DoiInfo", 10000)
      .assert.containsText(
        ".DoiInfo",
        "This publication already exists in the database with the following info:"
      )
      .clearValue("#title")
      .useCss()
      .setValue("#title", "Measured Measurements")
      .useXpath()
      .click("//*[contains(text(),'Insert Edited Publication Information')]")
      .useCss()
      .assert.containsText("#AddPub", "Success!")
      .useXpath()
      .click("//*[contains(text(),'Back to Home')]")
      .useCss()
      .waitForElementVisible(".PubsTable-CP")
      .setValue(
        ".ReactTable .rt-thead.-filters input:nth-of-type(1)",
        "Measured Measurements"
      )
      .assert.containsText(".ReactTable .rt-tbody", "Measured Measurements");
    client.end();
  },
};
