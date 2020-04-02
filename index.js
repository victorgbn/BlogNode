require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express(); // Instancie une nouvelle application Express.js

app.set('view engine', 'pug'); // Indique a Express que le moteur de templating sera "Pug"
app.set('views', './views'); // Indique à Express que le dossier contenant les fichiers .pug s'appelle "./views/"
app.use(express.static('./public'));
const blogRouter = require('./blog.router');


const PORT = 9000;
const HOST = 'localhost';

app.use('/', blogRouter);

mongoose.connect(`mongodb+srv://${encodeURIComponent(process.env.DB_USER)}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log(`[MongoDB] - Connexion établie !`))
.catch(err => console.error(err));


app.listen(PORT, HOST, () => {
    console.log(`[Express.js] - L'application a démarré sur http://${HOST}:${PORT}`);
});


//mongodb+srv://dbVictor:<password>@projetnode-o67td.gcp.mongodb.net/test?retryWrites=true&w=majority