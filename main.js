const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 8080;

app.get('/', (request, response) => {

	response.render('main.hbs', {
		title: 'Main'
	});
});

app.listen(port, () => {
	console.log(`Server is on port ${port}`);
})