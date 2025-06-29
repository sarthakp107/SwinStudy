import { Response, Request } from "express";
import { query } from "../database";


export const saveMessages = async (res: Response, req: Request) => {

  const {unitName, sender, message} = req.body
  
  const sql = `
    INSERT INTO unit_messages (unit_name, sender, message)
    VALUES ($1, $2, $3)
  `;
  try{

   const result =  await query(sql, [unitName, sender, message]);
  }
  catch(err){
    console.log(err);
  }
};