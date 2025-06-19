// import {establishConnectionToDB, query} from '../database'
import {establishConnectionToDB, query} from '../database'
import { Request, Response } from "express";

export const getAllUnits = async(req: Request, res : Response) => {

    // try{
    //    const result = await query('SELECT * FROM all_units');
    //     res.json(result.rows);
    // }catch{
    //     // console.log("Error: ", error);
    // }
   await res.send("controller is good");
};

export const getHome = async(req: Request, res : Response) => {
    await res.send("Welcome to SwinStudy! test ");
}
