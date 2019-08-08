const request = require('request');

const geoData = (address, callback) => {
    const laturl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGl2eWFkYXZlIiwiYSI6ImNqejFqbm9saTA4MWIzZG13d2ZxcHEydHQifQ.5S79bKwL3lajQUq98REu9w';
    request({ url: laturl, json: true }, (error, response) => {
        if(error) {
            console.log(error);
            callback('Unable to connect to location services', undefined)
        }
        else if(response.body.features.length === 0) {
            callback('Search again', undefined)
        }
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }

    })
    

}
module.exports = geoData;