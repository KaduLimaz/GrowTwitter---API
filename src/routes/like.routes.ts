import { Router } from "express";
import TweetController from "../controllers/likeController"

export class UsersRoutes {
	public static execute() {
		const router = Router();

		//Rotas de User
		router.post("/", TweetController.createTweet);
		router.get("/", TweetController.getTweets);
		router.get("/:id",TweetController.getTweetById);
		router.put("/", TweetController.updateTweet);
		router.delete("/",TweetController.deleteTweet);

		return router;
	}
}
