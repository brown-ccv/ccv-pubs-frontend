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

      /**
       * In this case instead of throwing an error like the other gets, if the response is no ok (404),
       * it means nothing was found from the doi API
       */
      if (!response.ok) {
        return [];
      }

      /**
       * My thought process here is that 208 represents when a value was already in the database and found
       * instead of needing to a add a new one. Open to other ideas
       */
      if (response.status == 208) {
        data = await response.json();
        data.push("found");
        return data;
      }
    } catch (error) {
      throw new Error(`Could not connect to server: ${error}`);
    }
    data = await response.json();
    return data;
  }

  //adds publication to database
  async postPub(newPub) {
    var url = `${SERVICE_ENDPOINT}/addpublications`;
    var response;
    var status;
    var resp;
    try {
      response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(newPub.data),
      });
    } catch (error) {
      throw new Error(`Could not connect to server: ${error}`);
    }
    if (!response.ok) {
      throw new Error(`Publication not able to be added to database.`);
    }
  }
}

export default new Client();
