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
      console.log(response)
    } catch(error) {
      throw new Error(`Could not connect to server: ${error}`);
    }

    if (!response.ok) {
      throw new Error(`CCVService getConcepts failed, HTTP status ${response.status}`);
    }
    const data = await response.json();
    console.log(data)
    return data;
  }

  async getDoiInfo(newPub){
    var url = `${SERVICE_ENDPOINT}/getDOI`;
    var response;
    var status;
    var resp;
    var data;
    console.log(newPub)
    try {
      response = await fetch(url, {
        method: 'POST',
        body: String(newPub.doi),
      });
      data = await response.json()
    } catch(error) {
      throw new Error(`Could not connect to server: ${error}`);
    }
    if (!response.ok) {
      throw new Error(`No DOI found`);
   }
   console.log(data)
   return data;
  }

  // async postPub(newPub){
  //   var url = `${SERVICE_ENDPOINT}/addPublications`;
  //   var response;
  //   var status;
  //   var resp;
  //   try {
  //     response = await fetch(url, {
  //       method: 'POST',
  //       body: String(newPub.doi),
  //     })
  //     .then(function(res){
  //       return res.json(); 
  //    }).then(function(data){
  //      resp = data
  //   }).catch((error)=>{console.log(error);
  //   });
  //   console.log(resp)
  //   } catch(error) {
  //     throw new Error(`Could not connect to server: ${error}`);
  //   }
  //   if (!resp) {
  //     throw new Error(`No DOI found`);
  //  }
  //  return resp;
  // }
  
}

export default new Client();
