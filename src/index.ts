import { log } from "console";
import express from "express";

const app = express();

//// Middleware para analisar JSON no corpo da solicitação
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Testando 2");
});

app.listen(3000, () => {
	console.log("server rodando em localhost:3000");
});
