
import express from "express";
import cors from "cors";
import 'dotenv/config'

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

app.listen(process.env.PORT, () => {
	console.log(`server rodando em localhost:${process.env.PORT}`);
});
