import express from 'express';
import api from './api/index.js';
const app = express();

// Web sivusto tarjoillaan public-kansiosta
//app.use('/sivusto', express.static('public')); // aliosoite /sivusto
// tai palvelimen juuri /
app.use(express.static('public'));

// parsii json-datan http-pyynnöstä
console.log('Moi taas');
app.use(express.json());
// formdataa varten
app.use(express.urlencoded({extended: true}));

// lisää prefixin ja ohjaa siten kaikkki api-routerin sisällä oleville reiteille
app.use('/api/v3', api);


export default app;
