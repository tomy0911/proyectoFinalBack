import { dirname } from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(filename);

export const filePath = (filename) => {
  return `/images/userAvatar/${filename}`;
};

export const filePath3 = (filename) => {
  return `/views/${filename}`;
};
