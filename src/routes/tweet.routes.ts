import { Router } from "express";
import LikeController from "../controllers/likeController"

export class UsersRoutes {
	public static execute() {
		const router = Router();

		//Rotas de User
		router.post("/", LikeController.createLike);
		router.get("/", LikeController.getLikes);
		router.get("/:id",LikeController.getLikeById);
		router.put("/", LikeController.);
		router.delete("/",LikeController.);

		return router;
	}
}
