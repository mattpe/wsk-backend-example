import express from 'express';
import api from './api/index.js';
import {errorHandler, notFoundHandler} from './middlewares/error-handlers.js';
const app = express();

// Web sivusto tarjoillaan public-kansiosta
//app.use('/sivusto', express.static('public')); // aliosoite /sivusto
// tai palvelimen juuri /
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// parsii json-datan http-pyynnöstä
app.use(express.json());
// formdataa varten
app.use(express.urlencoded({extended: true}));

// lisää prefixin ja ohjaa siten kaikkki api-routerin sisällä oleville reiteille
app.use('/api/v1', api);

// jos mikään reitti ei osunut, kutsutaan notFound-middlewarea
app.use(notFoundHandler);
// kaikissa virhetilanteissa kutsutaan lopuksi virheenkäsittelijää
app.use(errorHandler);

export default app;
