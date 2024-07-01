import { Router } from "express";
import TweetController from "../controllers/tweetController"

export class userRoutes {
	public static execute() {
		const router = Router();
		

		//Rotas de Tweet
		router.post("/tweets", TweetController.createTweet);
		router.get("/tweets", TweetController.getTweets);
		router.get("/:id",TweetController.getTweetById);
		router.put("/tweets/:id/:userId", TweetController.updateTweet);
		router.delete("/tweets/:id/:userId",TweetController.deleteTweet);

		return router;
	}
}


