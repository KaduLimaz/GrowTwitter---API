import { Router } from "express";
import UserController from "../controllers/UserController";

export class UsersRoutes {
	public static execute() {
		const router = Router();

		//Rotas de User
		router.post("/", UserController.createUser);
		router.get("/", UserController.getUsers);
		router.get("/:id",UserController.getUserById);
		router.put("/", UserController.updateUser);
		router.delete("/",UserController.deleteUser);

		return router;
	}
}
