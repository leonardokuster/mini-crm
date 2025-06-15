import dotenv from "dotenv";

dotenv.config();

const userToken = process.env.USER_TOKEN;

if (!userToken) {
  throw new Error('USER_TOKEN não está definido no arquivo .env');
}

export default {
  secret: userToken,
  expiresIn: '5d'
};
