import express from 'express';
import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
  getCatsByUserId,
  getMyCats,
} from '../controllers/cat-controller.js';

// multer imports
import multer from 'multer';
import {authenticateToken} from '../../middlewares/authentication.js';
const upload = multer({dest: 'uploads/'});

const catRouter = express.Router();
catRouter.route('/').get(getCat).post(authenticateToken, upload.single('file'), postCat);
// omat kuvat
catRouter.route('/user').get(authenticateToken, getMyCats);
// jonkun muun käyttäjän kuvat
catRouter.route('/user/:id').get(authenticateToken, getCatsByUserId);
catRouter.route('/:id').get(getCatById).put(putCat).delete(deleteCat);

export default catRouter;

// Expressin middleware on kerros, joka käsittelee pyyntöä ennen kuin se pääsee reitille tai kontrolleriin.
// Multer on yksi tällainen middleware, joka osaa lukea multipart/form-data -pyynnöt ja tallentaa tiedostot serverille

// Myöhemmin lisätään esim. autentikointi, virheenkäsittely.

// upload.single('file'):
// tallentaa tiedoston esim. uploads/-kansioon ja
// lisää req.file-olion, jossa on esim.:

// {
//   fieldname: 'file',           // formin "name"
//   originalname: 'image.jpg',   // alkuperäinen nimi
//   encoding: '7bit',
//   mimetype: 'image/jpeg',
//   destination: 'uploads/',     // mihin tallennettiin
//   filename: 'a8f9234bd12.jpg', // generoitu nimi levyllä
//   path: 'uploads/a8f9234bd12.jpg',
//   size: 12345
// }

// Kaikki muut kentät (cat_name, weight, …) menevät  req.body-olioon.
