import { Router } from "express";
import  RetweetController  from "../controllers/retweets.controller"

export class userRoutes {
	public static execute() {
		const router = Router();
		

		//Rotas de Tweet
		router.post("/retweets/:userId/:tweetId", RetweetController.createRetweets);
        router.get("/retweets", RetweetController.getRetweets);		        		
		router.put("/retweets/:id/:userId/:tweetId", RetweetController.updateRetweet);
		router.delete("/retweets/:id/:userId/:tweetId",RetweetController.getRetweetById);

		return router;
	}
}