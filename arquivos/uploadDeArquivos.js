const fs = require('fs');
const path = require('path');

module.exports = (caminho, nomeDoArquivo, callbackImagemCriada) => {
    //Forma Assincrona

    const tipoValidos = ['jpg', 'png', 'jpeg'];

    const tipo = path.extname(caminho);

    const tipoEhValido = tipoValidos.indexOf(tipo.substr(1)) !== -1;

    if(!tipoEhValido) {
        const erro = "Tipo é invalido!";
        console.log("Erro Tipo invalido!");
        callbackImagemCriada(erro);
    }else {

        const novoCaminho = `./assets/images/${nomeDoArquivo}${tipo}`;

        fs.createReadStream(caminho)
        .pipe(
            fs.createWriteStream(novoCaminho)
        )
        .on('finish', () => callbackImagemCriada(false, novoCaminho));
    }

    
}

//Forma Sincrona
/* fs.readFile('./assets/salsicha.jpg', (erro, buffer) => {
    console.log('Imagem foi bufferizada');

    fs.writeFile('./assets/salsicha2.jpg', buffer, (erro) => {
        console.log('Imagem foi escrita')
    });
}); */