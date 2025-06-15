import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import database, { sequelize } from '../models/index.js';
import 'dotenv/config.js';

class AppService {
    async logarUsuario(dto) {
        const { email, senha } = dto;

        let usuario = await database.Usuario.findOne({
            where: { email }
        });

        if (!usuario) {
            throw new Error('E-mail inválido');
        }

        if (!senha) {
            throw new Error('Senha não fornecida');
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            throw new Error('Credenciais inválidas');
        }

        return { usuario };
    }

    async cadastrarUsuario(dto) {
        const { nome, email, senha } = dto;
        const t = await sequelize.transaction();

        const usuarioExistente = await database.Usuario.findOne({
            where: {
                [database.Sequelize.Op.or]: [
                    { email }
                ]
            }
        });

        if (usuarioExistente) {
            throw new Error('Usuário já cadastrado. Faça login.');
        }

        const hashedSenha = await bcrypt.hash(senha, 10);

        try {
            const newUser = await database.Usuario.create({
                id: uuidv4(),
                nome,
                email,
                senha: hashedSenha
            }, { transaction: t });

            await t.commit();

            return newUser;
        } catch (error) {
            await t.rollback();
            console.error('Erro ao cadastrar usuário:', error);
            throw error;
        }
    }

    async cadastrarCliente(dto) {
        const { nome, email, telefone, empresa, cargo } = dto;
        const t = await sequelize.transaction();

        const clienteExistente = await database.Cliente.findOne({
            where: { email }
        });

        if (clienteExistente) {
            throw new Error('E-mail já vinculado a um cliente.');
        }

        try {
            const newClient = await database.Cliente.create({
                id: uuidv4(),
                nome,
                email,
                telefone,
                empresa,
                cargo,
            }, { transaction: t });

            await t.commit();

            return newClient;
        } catch (error) {
            await t.rollback();
            console.error('Erro ao cadastrar cliente:', error);
            throw error;
        }
    }

    async listarClientes() {
        try {
            const clientes = await database.Cliente.findAll();
            return clientes;
        } catch (error) {
            console.error('Erro ao listar clientes:', error);
            throw error;
        }
    }

    async editarCliente(dto) {
        const { nome, email, telefone, empresa, cargo } = dto;

        const cliente = await database.Cliente.findOne({ where: { email } });

        if (!cliente) {
            throw new Error('Cliente não encontrado.');
        }

        const t = await sequelize.transaction();

        try {
            if (nome) cliente.nome = nome;
            if (email) cliente.email = email;
            if (telefone) cliente.telefone = telefone;
            if (empresa) cliente.empresa = empresa;
            if (cargo) cliente.cargo = cargo;

            await cliente.save({ transaction: t });
            await t.commit();

            return cliente;
        } catch (error) {
            await t.rollback();
            console.error('Erro ao editar cliente:', error.message);
            throw error;
        }
    }

    async removerCliente(cliente_id) {
        const cliente = await database.Cliente.findByPk(cliente_id);

        if (!cliente) {
            throw new Error('Cliente não encontrado.');
        }

        try {
            await cliente.destroy();
            return { message: 'Cliente removido com sucesso.' };
        } catch (error) {
            console.error('Erro ao remover cliente:', error);
            throw error;
        }
    }
}

export default AppService;