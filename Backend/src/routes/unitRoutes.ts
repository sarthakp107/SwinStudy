import express from 'express';
import { getAllUnits, getHome } from '../controllers/unitController';


 const router = express.Router();

 //GET all units
 router.get("/getUnits", getAllUnits);
 router.get("/", getHome );

 export default router;

