import express from 'express';
import { getAllUnits } from '../controllers/unitController';


 const router = express.Router();

 //GET all units
 router.get("/getUnits", getAllUnits)

 export default router;

