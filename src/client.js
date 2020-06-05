import _ from "lodash";
import fetch from "isomorphic-fetch";

const SERVICE_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://datasci.brown.edu/ccvpubs-api"
    : "http://localhost:8080";
class Client {
  // get all data values from the bcbi db
  async getData() {
    var url = `${SERVICE_ENDPOINT}/publications`;

    var response;
    try {
      response = await fetch(url);
    } catch (error) {
      throw new Error(`Could not connect to server: ${error}`);
    }

    if (!response.ok) {
      throw new Error(
        `CCVService getConcepts failed, HTTP status ${response.status}`
      );
    }
    const data = await response.json();

    return data;
  }

  async getNgrams() {
    var url = `${SERVICE_ENDPOINT}/ngrams`;

    var response;
    try {
      response = await fetch(url);
    } catch (error) {
      throw new Error(`Could not connect to server: ${error}`);
    }

    if (!response.ok) {
      throw new Error(
        `CCVService getConcepts failed, HTTP status ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  }
  //gets doi information for user to check
  async getDoiInfo(newPub) {
    var url = `${SERVICE_ENDPOINT}/getdoi`;
    var response;
    var data;
    try {
      response = await fetch(url, {
        method: "POST",
        body: String(newPub.doi),
      });

      if (!response.ok) {
        throw new Error(
          `getdoi route failed, HTTP status ${response.status}`
        );
      }

      
    } catch (error) {
      throw new Error(`Could not connect to server: ${error}`);
    }
    data = await response.json();
    console.log(data)
    return data;
  }

  //adds publication to database
  async postPub(newPub) {
    var url = `${SERVICE_ENDPOINT}/addpublications`;
    var response;
    var update;
    
    try {
      response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(newPub.data),
      });
    } catch (error) {
      throw new Error(`Could not connect to server: ${error}`);
    }
    
    if (!response.ok) {
      throw new Error(`Publication was not able to be added to database.`);
    }
    
    update = await response.json();
    console.log(update)
    return update;
  }
}

export default new Client();
