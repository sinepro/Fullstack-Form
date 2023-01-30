const express = require('express');
const cors = require('cors');
const formDefinitionFile = require('./definition.json');    // Get form definition from JSON file
const fs = require('fs');   // For read/write to file

// ~ App config
const app = express();
const port = process.env.PORT || 9000; // Enviroment variable PORT if defined or 9 000

// ~ Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// ~ API routes
app.get('/definition', (request, response) => {
    console.log('GET Method - Get Form Definition');
    response.status(200).send(formDefinitionFile);
});

app.get('/form', (request, response) => {
    console.log('GET Method - Get Form Data');
    const formFile = `${__dirname}/formData.json`;
    response.status(200).download(formFile);
});

app.post('/form/create', (request, response) => {
    console.log('POST Method - Save Form Data');
    const formData = request.query.data;
    fs.writeFileSync('./formData.json', formData);
    response.status(200).send('200 OK');
});

// Server listening
app.listen(port, () => console.log(`Listening on localhost:${port}`));