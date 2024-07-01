
import express from "express";
import cors from "cors";
import 'dotenv/config'
import { userRoutes } from "./routes/user.routes"



const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes.execute());

// definição das rotas
// app.get("/", (req, res) => {
// 	res.status(200).json({
// 		message: "Testando",
// 		ok: true,
// 	});
// });

app.listen(process.env.PORT, () => {
	console.log(`server rodando em localhost:${process.env.PORT}`);
});
