var payUMoney = require('payumoney_nodejs');
payUMoney.setProdKeys("6PqKSK15", "sAOVPuJG2X");
payUMoney.isProdMode(true);

var pay = function(requestBody , cb){
    payUMoney.pay(requestBody, function(error, response) {
        if (error) {
          // Some error console.log(response);
        } else {
          // You will get a link in response to redirect to payUMoney
        //  callback(null, { 'payulink' : response });
            cb(null,response) 
        }
      });
}

module.exports = pay;