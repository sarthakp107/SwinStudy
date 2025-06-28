import { pool } from "../database";

export const saveMessages = async (
    unitName: string,
    sender : string,
    message: string
)=> {
    const query = `
    INSERT INTO messages (unit_name, sender, message)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [unitName, sender, message];
  const result = await pool.query(query, values);
  return result.rows[0];
}