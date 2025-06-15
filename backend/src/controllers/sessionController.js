import jwt from "jsonwebtoken";
import userToken from "../config/userToken.js";
import AppService from "../services/appService.js";

const appService = new AppService();

class SessionController {
    static async logarUsuario(req, res) {
        const { email, senha } = req.body;
        
        try {
            const { usuario, tipo } = await appService.logarUsuario({ email, senha });

            let token = jwt.sign({ id: usuario._id, tipo: 'user' }, userToken.secret, { expiresIn: userToken.expiresIn });

            res.status(201).json({ usuario, token });
        } catch (error) {
            console.error('Erro ao fazer login:', error.message);
            res.status(400).send({ message: error.message });
        }
    };

    static async cadastrarUsuario(req, res) {
        const {
            nome, email, senha, confisenha
        } = req.body;
    
        if (senha !== confisenha || !nome || !email || !senha || !confisenha) {
            return res.status(400).send({ message: 'Não foi possível realizar seu cadastro, verifique os dados informados.' });
        }
    
        try {
            const usuario = await appService.cadastrarUsuario({
                nome, email, senha
            });

            res.status(201).json({
                usuario,
                message: 'Conta criada com sucesso! Verifique seu e-mail com os dados de login.'
            });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    };    
}

export default SessionController;