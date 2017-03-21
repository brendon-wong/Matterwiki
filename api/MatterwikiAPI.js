/* This is the wrapper for the Matterwiki API
The main function in the wrapper is the .call(endpoint,type,body,token) which returns a
promise with the response.
*/

var Promise = require("bluebird");
var os = require("os");
var hostname = os.hostname();
import unirest from "unirest";
import request from "request";

const MatterwikiAPI = new API()

function API() {

  this.call = function(endpoint,type,token=null,body=null,query=null) {
    return new Promise(function(resolve,reject){

      // Create the endpoint URL
      endpoint = "http://"+hostname+":"+(process.env.PORT||5000).toString()+"/api/"+endpoint;

      var headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": token
      };

      console.log("Sending a "+type+" request to "+endpoint);

      // var query = "";
      // // Convert JSON body into Form encoded
      // if(body){
      //   console.log("Getting into for");
      //   for(var key in body) {
      //       console.log("Inside for");
      //       console.log(key);
      //       console.log(query);
      //       query += encodeURIComponent(key)+"="+encodeURIComponent(body[key]);
      //   }
      //   console.log("New Body = "+query);
      // }

      request({
        url: endpoint, //URL to hit
        method: type, //Specify the method
        headers: { //We can define headers too
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: body,
        json: true,
      },
        function(error,response,body) {
            if(body.error.error) {
                reject(body.error.message);
            }
            else {
                resolve(body);
            }
          });
    });
  }
}

export default MatterwikiAPI;