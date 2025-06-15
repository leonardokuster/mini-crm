import { promisify } from "util";
import jwt from "jsonwebtoken";
import userToken from "../config/userToken.js"
import dotenv from "dotenv";

dotenv.config();


export default async function (req, res, next) {

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: 'Token não encontrado' });
        }

        const [, token] = authHeader.split(' ');

        if (!token) {
            return res.status(401).json({ error: 'Token malformado' });
        }

        await promisify(jwt.verify)(token, userToken.secret);

        return next();
    } catch (error) {
        console.error('Erro ao verificar o token:', error);
        return res.status(401).json({ error: 'Token inválido' });
    }
};