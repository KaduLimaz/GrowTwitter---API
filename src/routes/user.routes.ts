import { Router } from "express";

export class UsersRoutes {
	public static execute() {
		const router = Router();

		//Rotas de User
		router.post("/");
		router.get("/");
		router.get("/:id");
		router.put("/");
		router.delete("/");

		return router;
	}
}
