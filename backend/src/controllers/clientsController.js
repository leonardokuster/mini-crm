import AppService from "../services/appService.js";

const appService = new AppService();

class ClientsController {
    static async cadastrarCliente(req, res) {
        const { nome, email, telefone, empresa, cargo } = req.body;

        console.log('Dados recebidos:', req.body);
    
        if (!nome || !email || !telefone || !empresa || !cargo ) {
            return res.status(400).json({ message: 'Dados incompletos para cadastro de cliente.' });
        }
    
        try {
            const newClient = await appService.cadastrarCliente({
                nome,
                email,
                telefone,
                empresa,
                cargo,
            });
    
            res.status(201).json({
                newClient,
                message: 'Cliente cadastrado com sucesso.'
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao cadastrar cliente', error });
        }
    };    

    static async listarClientes(req, res) {
        try {
            const clientes = await appService.listarClientes();
    
            if (!clientes || clientes.length === 0) { return res.status(404).json({ message: 'Nenhum cliente encontrado.' });}
    
            res.status(200).json(clientes);  
    
        } catch (error) {
            console.error('Erro ao listar clientes:', error); 
            res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
        }
    };    

    static async editarCliente(req, res) {
        const cliente_id = req.params.id;
        const { nome, email, telefone, empresa, cargo } = req.body;
        
        try {
            const client = await appService.editarCliente({
                id: cliente_id,
                nome,
                email,
                telefone,
                empresa,
                cargo,
            });
            
            res.status(200).json(client);
        } catch (error) {
            console.log('Message error: ', error.message);
            res.status(400).send({ message: error.message });
        }
    };

    static async removerCliente(req, res) {
        const { cliente_id } = req.params;

        if (!cliente_id) {
            return res.status(400).json({ message: 'ID de cliente não foi informado.' });
        }

        try {
            const result = await appService.removerCliente(cliente_id);

            res.status(200).json({ message: result.message });
        } catch (error) {
            console.error('Erro ao remover cliente no controller:', error);

            if (error.message.includes('Cliente não encontrado')) {
                return res.status(404).json({ message: 'Cliente não encontrado.' });
            }

            res.status(500).json({ message: 'Erro interno do servidor', details: error.message });
        }
    };
}

export default ClientsController;
