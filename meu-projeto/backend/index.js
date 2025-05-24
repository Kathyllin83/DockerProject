const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Usuario = require("./models/usuario");

const app = express();
const PORT = 4000;

const MONGO_URI =
  "mongodb+srv://dbAdmin:CXI8xDbM5YYRPIS0@cluster0.lu0bsyj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const MONGO_URI =
//   "mongodb+srv://dbAdmin:CXI8xDbM5YYRPIS0@cluster0.lu0bsyj.mongodb.net/SeuBanco?retryWrites=true&w=majority&appName=Cluster0";
//                 👆👆 Substitua 'SeuBanco' por um nome de banco, ex: cadastroDB

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGO_URI, {
    dbName: "personal_finances", // 👈 Defina o nome do banco aqui também, se quiser separar
  })
  .then(() => console.log("MongoDB conectado com sucesso!"))
  .catch((error) => console.error("Erro ao conectar MongoDB:", error));

// Rota de cadastro
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

app.listen(PORT, () => {
  console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});
