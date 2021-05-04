const express = require('express');
const path = require('path');
const app = express();
app.use(express.static('./dist/sistema-de-apoyo-para-cotizaciones'));
app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/sistema-de-apoyo-para-cotizaciones/'}),
);
app.listen(process.env.PORT || 8080);
