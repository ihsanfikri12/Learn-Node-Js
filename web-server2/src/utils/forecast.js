const request = require('request');
const forecast = (langitude,longitude,callback) => {
    const url = "https://api.darksky.net/forecast/4ba6601e457efd1dd7403e89ac5288ce/"+langitude+","+longitude;
    request({url, json:true}, (err,{body} = {}) => {
                if(err) {
                    callback('unable to connect wheter service',undefined);
                } else if (body.error) {
                    callback('unable to find location',undefined);
                } else {
                    callback(undefined, 
                    body.daily.data[0].summary + "it's currently " + 
                    body.currently.temperature + ' degress out. There is a ' + 
                    body.currently.precipProbability + ' % chance of rain')
                    }
    })
}
module.exports = forecast