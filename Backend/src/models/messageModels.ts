import { query } from "../database";

export const saveMessages = async (unitName: string, sender: string, message: string) => {
  const sql = `
    INSERT INTO messages (unit_name, sender, message, sent_at)
    VALUES ($1, $2, $3, NOW())
  `;
  await query(sql, [unitName, sender, message]);
};