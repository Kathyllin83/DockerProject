require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Usuario = require("./models/usuario");

const app = express();
const PORT = 4000;

const MONGO_URI = "mongodb+srv://dbAdmin:CXI8xDbM5YYRPIS0@cluster0.lu0bsyj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGO_URI, { dbName: "personal_finances" })
  .then(() => console.log("MongoDB conectado com sucesso!"))
  .catch((error) => console.error("Erro ao conectar MongoDB:", error));

// Cadastro
app.post("/cadastrar", async (req, res) => {
  try {
    const { nome, email, cpf } = req.body;

    if (!nome || !email || !cpf) {
      return res.status(400).json({ mensagem: "Dados incompletos." });
    }

    const novoUsuario = new Usuario({ nome, email, cpf });
    await novoUsuario.save();

    res.json({ mensagem: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro na rota /cadastrar:", error);
    res.status(500).json({ mensagem: "Erro ao cadastrar." });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, cpf } = req.body;

    if (!email || !cpf) {
      return res.status(400).json({ mensagem: "Email e CPF são obrigatórios." });
    }

    // Busca usuário com email e cpf iguais
    const usuario = await Usuario.findOne({ email, cpf });

    if (!usuario) {
      return res.status(401).json({ mensagem: "Credenciais inválidas." });
    }

    // Login bem-sucedido
    res.json({ mensagem: "Login realizado com sucesso!" });
  } catch (error) {
    console.error("Erro na rota /login:", error);
    res.status(500).json({ mensagem: "Erro no login." });
  }
});

// Listagem
app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    res.status(500).json({ mensagem: "Erro ao buscar usuários." });
  }
});

// Remoção
app.delete("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const usuarioRemovido = await Usuario.findByIdAndDelete(id);
    if (!usuarioRemovido) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    res.json({ mensagem: "Usuário removido com sucesso." });
  } catch (error) {
    console.error("Erro ao remover usuário:", error);
    res.status(500).json({ mensagem: "Erro ao remover usuário." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});
