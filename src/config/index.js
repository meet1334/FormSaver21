const dotenv = require("dotenv");
dotenv.config();

// config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
export const {
  //#BASIC
  PORT,
} = process.env;
