import _ from 'lodash';
import fetch from 'isomorphic-fetch';

//const SERVICE_ENDPOINT = 'https://datasci.brown.edu/ccvpubs-api';
const SERVICE_ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://datasci.brown.edu/ccvpubs-api' : 'http://localhost:8080';
class Client {

  // get all data values from the bcbi db
  async getData() {
    var url = `${SERVICE_ENDPOINT}/publications`;

    var response;
    try {
      response = await fetch(url);
    } catch(error) {
      throw new Error(`Could not connect to server: ${error}`);
    }

    if (!response.ok) {
      throw new Error(`CCVService getConcepts failed, HTTP status ${response.status}`);
    }
    const data = await response.json();

    return data;
  }

  async getNgrams() {
    var url = `${SERVICE_ENDPOINT}/ngrams`;

    var response;
    try {
      response = await fetch(url);
    } catch(error) {
      throw new Error(`Could not connect to server: ${error}`);
    }

    if (!response.ok) {
      throw new Error(`CCVService getConcepts failed, HTTP status ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
//gets doin information for user to check
  async getDoiInfo(newPub){
    var url = `${SERVICE_ENDPOINT}/getDOI`;
    var response;
    var data;
    try {
      response = await fetch(url, {
        method: 'POST',
        body: String(newPub.doi),
      });
      
      if (!response.ok) {
        return [];
     }
    
     if (response.status == 208) {
      data = await response.json();
      data.push("found")
      return data
   }

    } catch(error) {
      throw new Error(`Could not connect to server: ${error}`);
    }
    data = await response.json()
   return data;
  }

  //adds publication to database
  async postPub(newPub){
    var url = `${SERVICE_ENDPOINT}/addPublications`;
    var response;
    var status;
    var resp;
    try {
      response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(newPub.data),
      });
      
    } catch(error) {
      throw new Error(`Could not connect to server: ${error}`);
    }
    if (!response.ok) {
      throw new Error(`No DOI found`);
   }
  }
  
}

export default new Client();
