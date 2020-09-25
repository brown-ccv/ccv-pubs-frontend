module.exports = {
  "Test filtering of table and chart"(client) {
    client
      .url("http://localhost:3000/")
      .waitForElementVisible(".App")
      .waitForElementVisible(".ContentPage")
      //when the 2014 bar is clicked on the Year Chart, only 2014 publications are shown in the table (first 5 shownz)
      .click(
        "#yearChart > svg > g > g > g > g > g.mark-rect.role-mark.marks > path:nth-child(3)"
      )
      .assert.containsText(
        "#main-content > div.PubsTable-CP > div > div.rt-table > div.rt-tbody > div:nth-child(1) > div > div:nth-child(3)",
        "2014"
      )
      .assert.containsText(
        "#main-content > div.PubsTable-CP > div > div.rt-table > div.rt-tbody > div:nth-child(2) > div > div:nth-child(3)",
        "2014"
      )
      .assert.containsText(
        "#main-content > div.PubsTable-CP > div > div.rt-table > div.rt-tbody > div:nth-child(3) > div > div:nth-child(3)",
        "2014"
      )
      .assert.containsText(
        "#main-content > div.PubsTable-CP > div > div.rt-table > div.rt-tbody > div:nth-child(4) > div > div:nth-child(3)",
        "2014"
      )
      .assert.containsText(
        "#main-content > div.PubsTable-CP > div > div.rt-table > div.rt-tbody > div:nth-child(5) > div > div:nth-child(3)",
        "2014"
      )
      //when bar is unclicked, table is unfiltered
      .click(
        "#yearChart > svg > g > g > g > g > g.mark-rect.role-mark.marks > path:nth-child(4)"
      )
      .assert.not.containsText(
        "#main-content > div.PubsTable-CP > div > div.rt-table > div.rt-tbody > div:nth-child(1) > div > div:nth-child(3)",
        "2014"
      )
      .assert.not.containsText(
        "#main-content > div.PubsTable-CP > div > div.rt-table > div.rt-tbody > div:nth-child(2) > div > div:nth-child(3)",
        "2014"
      )
      .assert.not.containsText(
        "#main-content > div.PubsTable-CP > div > div.rt-table > div.rt-tbody > div:nth-child(3) > div > div:nth-child(3)",
        "2014"
      )
      .assert.not.containsText(
        "#main-content > div.PubsTable-CP > div > div.rt-table > div.rt-tbody > div:nth-child(4) > div > div:nth-child(3)",
        "2014"
      )
      .assert.not.containsText(
        "#main-content > div.PubsTable-CP > div > div.rt-table > div.rt-tbody > div:nth-child(5) > div > div:nth-child(3)",
        "2014"
      );
    client.end();
  },
};
