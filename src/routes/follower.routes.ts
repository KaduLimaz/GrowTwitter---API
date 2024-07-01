import { Router } from "express";
import  FollowerController  from "../controllers/followers.controller"



export class UsersRoutes {
	public static execute() {
		const router = Router();

		//Rotas de User
		router.post("/follower/:id/:userId", FollowerController.CreateFollower);
		router.get("/follower/:id/:userId", FollowerController.ListFollowers);	
		router.delete("'/follower/:id/:userId",FollowerController.deleteFollower);

		return router;
	}
}
