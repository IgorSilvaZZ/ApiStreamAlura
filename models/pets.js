const conexao = require("../infraestrutura/database/conexao");
const uploadDeArquivo = require("../arquivos/uploadDeArquivos");

class Pet {
  adiciona(pet, res) {
    const query = "INSERT INTO Pets SET ?";

    uploadDeArquivo(pet.imagem, pet.nome, (erro, novoCaminho) => {
      if (erro) {
        return res.status(400).json({ message: erro });
      } else {
        const novoPet = {
          nome: pet.nome,
          imagem: novoCaminho,
        };

        conexao.query(query, novoPet, (erro) => {
          if (erro) {
            return res.status(400).json(erro);
          }

          res.status(201).json(novoPet);
        });
      }
    });
  }
}

module.exports = new Pet();
