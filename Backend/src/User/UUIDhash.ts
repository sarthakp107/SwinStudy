import { query } from "../database";
import { convertToHashID } from "../Utils/HashId";

export async function createUserInApp(uuid: string) {
  const publicId = convertToHashID(uuid);

  await query(
    `INSERT INTO user_hash_map (user_id, public_id) VALUES ($1, $2)
     ON CONFLICT (user_id) DO NOTHING`,
    [uuid, publicId]
  );

}