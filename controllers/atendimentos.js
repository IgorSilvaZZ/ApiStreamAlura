const Atendimento = require("../models/atendimentos");

module.exports = (app) => {
  app.get("/atendimentos", (req, res) => {
    Atendimento.lista()
      .then((resultados) => {
        return res.json(resultados);
      })
      .catch((erro) => {
        return res.status(400).json({ erro: erro.message });
      });
  });

  app.get("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Atendimento.buscaPorId(id, res);
  });

  app.post("/atendimentos", (req, res) => {
    const atendimento = req.body;

    Atendimento.adiciona(atendimento)
      .then((atendimentoCadastrado) => {
        return res.status(201).json(atendimentoCadastrado);
      })
      .catch((erro) => {
        return res.status(400).json({ erro: erro.message });
      });
  });

  app.patch("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;

    Atendimento.altera(id, valores, res);
  });

  app.delete("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Atendimento.deleta(id, res);
  });
};
