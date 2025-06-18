// import {establishConnectionToDB, query} from '../database'
import express from 'express';
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