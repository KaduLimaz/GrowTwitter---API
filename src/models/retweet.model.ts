import { randomUUID } from "crypto";
import { Tweet } from "./tweet.model";
import { TweetType } from "../types/tweet.types";

export class Retweet extends Tweet {
	constructor(
		content: string,
		tweetType: TweetType,
		userId: string,
		tweetId: string
	) {
		super(content, "Retweet", tweetId);
	}
}
