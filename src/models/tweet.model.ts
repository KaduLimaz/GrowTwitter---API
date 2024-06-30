import { randomUUID } from "crypto";
import { TweetType } from "../types/tweet.types";

export class Tweet {
	private _id: string;

	constructor(
		private _content: string,
		protected _tweetType: TweetType,
		private _userId: string
	) {
		this._id = randomUUID();
		this._tweetType = "Tweet";
	}

	get id(): string {
		return this._id;
	}

	get content(): string {
		return this._content;
	}

	get tweetType(): TweetType {
		return this._tweetType;
	}
}
