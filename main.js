const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;

var app = express();
app.set('view engine', 'hbs');
app.get('/', (request, response) => {

	response.render('main.hbs', {
		title: 'Main'
	});
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