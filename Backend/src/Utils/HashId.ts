import Hashids from "hashids";

const SALT =process.env.SECRET_SALT; 
const hashids = new Hashids(SALT, 10); // minimum hash length

if(!SALT){
    console.error("empty SALT");
}

// Converts UUID to hash
export const convertToHashID = (uuid: string): string => {
  const hex = uuid.replace(/-/g, ""); // remove dashes
  return hashids.encodeHex(hex); // convert to obfuscated hash
};

// Converts hash back → UUID
export const decodeHashId = (hash: string): string => {
  const hex = hashids.decodeHex(hash);
  if (!hex || hex.length !== 32) throw new Error("Invalid hash ID");

  // Re-insert dashes to get UUID format
  return [
    hex.substring(0, 8),
    hex.substring(8, 12),
    hex.substring(12, 16),
    hex.substring(16, 20),
    hex.substring(20)
  ].join("-");
};
