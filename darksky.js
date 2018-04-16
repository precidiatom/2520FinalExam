const request = require('request');

var getWeather = (lat, lon, callback) => {
	request({
		url: 'https://api.darksky.net/forecast/02d56d3bb1c3bf0b4a055f0687bfef6f/' + 
		lat + ',' + lon + '?units=si',
		json: true
	}, (error, response, body) => {
		if(error){
			callback('Cannot connect to Dark Sky');
		} else if (body.status == '400'){
			callback('Bad request, retry coordinates');
		} else if(body.timezone){
			callback(undefined, {
				summary: body.daily.data[0].summary,
				high: body.daily.data[0].temperatureMax,
				low: body.daily.data[0].temperatureMin,
				timezone: body.timezone,
				apptemp: body.currently.apparentTemperature
			});
		}
	});
};


var getImg = (query, callback) => {
	request({
		url: `https://pixabay.com/api/?key=7246674-b37aac3e55b379cef1f626bb09&q=${query}&image_type=photo`,
		json: true
	}, (error, response, body) => {
		if(error){
			callback('Cannot connect to pixabay');
		} else if (body.status == '400'){
			callback('Bad request, retry coordinates');
		} else if(body.timezone){
			callback(undefined, {
				img: body.hits[0].userImageURL
			});
		}
	});
};


module.exports = {
	getWeather,
	getImg
}