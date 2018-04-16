const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const bodyParser = require('body-parser');
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
		title: 'Feature 1'
	})
})

app.post('/featureoneform', (request, response) => {
	var record = {
		"username": request.body.username,
		"password": request.body.password
	};
	
	Records.push(record);
	updatedRecords = JSON.stringify(chefRecords);
	fs.writeFileSync('userpass.json', updatedRecords); 
});

function checkRecords() {
	if (fs.existsSync('userpass.json') && fs.readFileSync('userpass.json').length !== 0) {
    	getFile = fs.readFileSync('userpass.json');
    	Records = JSON.parse(getFile);
	}
}

app.listen(port, () => {
	console.log(`Server is on port ${port}`);
})