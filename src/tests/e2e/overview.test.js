module.exports = {
    'Test App after initial load'(client) {
      client
        .url('http://localhost:3000/')
        .waitForElementVisible('.App')
        .assert.titleContains('Publications')
        .assert.visible('.ContentPage')
        .assert.visible('.Navbar')
        .assert.visible('.Footer')
      client.end();
    },

    'Test App after initial load'(client) {
        client
          .url('http://localhost:3000/')
          .waitForElementVisible('.App')
          .assert.titleContains('Publications')
          .assert.visible('.ContentPage')
        client.end();
      },
    
  }