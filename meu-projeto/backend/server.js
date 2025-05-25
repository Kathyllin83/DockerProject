const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Modelo Mongoose
const UsuarioSchema = new mongoose.Schema({
  nome: String,
  email: String,
  cpf: String,
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

// Rota de cadastro
app.post("/cadastrar", async (req, res) => {
  try {
    const novoUsuario = new Usuario(req.body);
    await novoUsuario.save();
    res.json({ mensagem: "Cadastro realizado com sucesso!" });
  } catch (error) {
    console.error("Erro no cadastro:", error); // <-- log do erro
    res
      .status(500)
      .json({ mensagem: "Erro ao cadastrar.", erro: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor backend rodando em http://localhost:${port}`);
});
