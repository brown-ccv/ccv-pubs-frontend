module.exports = {
  'Test App after initial load'(client) {
    client
      .url('http://localhost:3000/')
      .waitForElementVisible('.App')
      .assert.titleContains('Publications')
      .assert.visible('.ContentPage')
      .assert.visible('#wordcloud')
      .assert.visible('#yearChart')
      .assert.visible('.ReactTable')
      .assert.visible('.p-2')
      .assert.visible('#brown-footer');
    client.end();
  },
};
