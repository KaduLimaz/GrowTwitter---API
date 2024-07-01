import { Router } from "express";
import UserController from "../controllers/UserController";

export class userRoutes {
	public static execute() {
		const router = Router();
		

		//Rotas de User
		router.post("/", UserController.createUser);
		router.get("/", UserController.getUsers);
		router.get("/:id",UserController.getUserById);
		router.put("/:id", UserController.updateUser);
		router.delete("/:id",UserController.deleteUser);

		return router;
	}
}


