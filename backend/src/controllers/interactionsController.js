import AppService from "../services/appService.js";

const appService = new AppService();

class InteractionsController {
  static async criarInteracao(req, res) {
    const { cliente_id, tipo, data, observacoes } = req.body;

    if (!cliente_id || !tipo || !data) {
      return res.status(400).json({ message: 'Campos obrigatórios ausentes' });
    }

    try {
      const novaInteracao = await appService.criarInteracao({
        cliente_id,
        tipo,
        data,
        observacoes
      });

      res.status(201).json(novaInteracao);
    } catch (err) {
      console.error('Erro ao criar interação:', err);
      res.status(500).json({ message: 'Erro ao criar interação' });
    }
  }

  static async listarTodasInteracoes(req, res) {
    try {
        const interacoes = await appService.listarTodasInteracoes();
        res.status(200).json(interacoes);
    } catch (err) {
        console.error('Erro ao buscar interações:', err);
        res.status(500).json({ message: 'Erro ao buscar interações' });
    }
  }

  static async listarInteracoesPorCliente(req, res) {
    const { cliente_id } = req.params;

    try {
      const interacoes = await appService.listarInteracoesPorCliente(cliente_id);
      res.status(200).json(interacoes);
    } catch (err) {
      console.error('Erro ao buscar interações:', err);
      res.status(500).json({ message: 'Erro ao buscar interações' });
    };
  }

  static async editarInteracao(req, res) {
    const { id } = req.params;
    const { tipo, data, observacoes } = req.body;

    try {
      const interacaoEditada = await appService.editarInteracao({ id, tipo, data, observacoes });
      res.status(200).json({ message: 'Interação atualizada com sucesso', interacao: interacaoEditada });
    } catch (err) {
      console.error('Erro ao atualizar interação:', err);
      if (err.message === 'Interação não encontrada.') {
        return res.status(404).json({ message: err.message });
      }
      res.status(500).json({ message: 'Erro ao atualizar interação' });
    }
  }

  static async removerInteracao(req, res) {
    const { id } = req.params;

    try {
      const resultado = await appService.removerInteracao(id);
      res.status(200).json(resultado);
    } catch (err) {
      console.error('Erro ao excluir interação:', err);
      if (err.message === 'Interação não encontrada') {
        return res.status(404).json({ message: err.message });
      }
      res.status(500).json({ message: 'Erro ao excluir interação' });
    }
  }
}

export default InteractionsController;