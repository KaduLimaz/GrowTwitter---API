import { log } from "console";
import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

// definição das rotas
app.get("/", (req, res) => {
	res.status(200).json({
		message: "Testando",
		ok: true,
	});
});

app.listen(3000, () => {
	console.log("server rodando em localhost:3000");
});
