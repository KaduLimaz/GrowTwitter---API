import { Router } from "express";
import LikeController from "../controllers/likeController"

export class UsersRoutes {
	public static execute() {
		const router = Router();

		//Rotas de User
		router.post("/likes/:userId/:tweetId", LikeController.CreateLike);
		router.get("/likes/:id/:userId/:tweetId", LikeController.ListLikes);
		// router.get("/:id",LikeController);
		// router.put("/", LikeController);
		router.delete("'/likes/:userId/:tweetId",LikeController.deleteLike);

		return router;
	}
}
