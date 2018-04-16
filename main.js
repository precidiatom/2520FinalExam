const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const bodyParser = require('body-parser');
const weathercode = require('./darksky');
const port = process.env.PORT || 8080;

var app = express();
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/views'));
hbs.registerPartials(__dirname + '/views/partials');
app.use(bodyParser.urlencoded({ 
	extended:true
}));

var Records = {};

app.get('/', (request, response) => {
	response.render('main.hbs', {
		title: 'Main'
	});
});

app.get('/feature1', (request, response) => {
	response.render('feature1.hbs', {
		title: 'Image',
		imgurl: imgURLresult,
		imgresult: 'https://pixabay.com/get/ed6a9364a9fd0a76647.jpg'
	})
})

// app.post('/imageform', (request, response) => {
// 	var record = {
// 		"result": request.body.img
// 	};
// 	getImg = (request, callback) => {
// 	request({
// 		url: 'https://pixabay.com/api/?key=7246674-b37aac3e55b379cef1f626bb09&q=yellow+flowers&image_type=photo',
// 		json: true
// 	}, (error, response, body) => {
// 		if (error) {
// 			callback("Cannot connect to API");
// 		} else if (body.userImageURL) {
// 			callback(undefined, {
// 				imgresult: body.userImageURL
// 			})
// 		} else {
// 			console.log('Error beyond control');			
// 		}
// 	})
// 	}
// 	getImg(request.body, (error, results) => {
// 		response.render('feature2.hbs', {
// 			imgresult: results.userImageURL
// 		});
// 	});
// });

var imgURLresult = [];

weathercode.getImg('cat', (errorMessage, result) => {
	if (errorMessage) {
		console.log(errorMessage);
	} else {
		console.log(result.img);
		console.log('meow');
		var imgresult = result.img;
		console.log(result.imgHD);
		imgURLresult.push(result.imgHD);
		imgURLresult.push(imgresult);
	}
});

// app.get('/feature1', (request, response) => {
// 	var record = {
// 		"result": request.body.img
// 	};
// 	getImg = (request, callback) => {
// 	request({
// 		url: 'https://pixabay.com/api/?key=7246674-b37aac3e55b379cef1f626bb09&q=yellow+flowers&image_type=photo',
// 		json: true
// 	}, (error, response, body) => {
// 		if (error) {
// 			callback("Cannot connect to API");
// 		} else if (body.userImageURL) {
// 			callback(undefined, {
// 				imgresult: body.userImageURL
// 			})
// 		} else {
// 			console.log('Error beyond control');			
// 		}
// 	})
// 	}
// 	getImg(request.body, (error, results) => {
// 		response.render('feature1.hbs', {
// 			imgresult: results.userImageURL
// 		});
// 	});
// });



var weather_result = '';

app.get('/feature2', (request, response) => {
	response.render('feature2.hbs', {
		title: 'Searching for weather',
		summary: weatherresult,
		location: weatherlocation

	})
});

app.post('/weatherform', (request, response) => {
	console.log(request.body.result);
	// request({
	// 	url: `http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=63bb0526947325cd64538bc0baa9740c/weather?q=${request.body.result}`,
	// 	json: true
	// }) (error, response, body) => {
	// 	if(error) {
	// 		callback("cannot connect");
	// 	}
	// 	else if(body.results {})
	// 	}
	// }
})

var weatherresult = [];
var weatherlocation = [];
var latitude = 49.2827;
var longitude = -123.1207;
weathercode.getWeather(latitude, longitude, (errorMessage, result) => {
	if (errorMessage) {
		console.log(errorMessage);
	} else {
		var location = result.timezone;
		var summary = result.summary;
		weatherresult.push(summary);
		weatherlocation.push(location);
	}
});


app.listen(port, () => {
	console.log(`Server is on port ${port}`);
})