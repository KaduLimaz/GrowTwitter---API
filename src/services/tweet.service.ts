import { prismaConnection } from "../database/prisma.connection";
import { ResponseType } from "../types/response.type";
import { CreateTweetType, UpdateTweetType } from "../types/tweets.type";
import { Tweet } from "../models/tweet.model";

export class TweetService {
	public async findAll(): Promise<ResponseType> {
		const tweets = await prismaConnection.tweet.findMany();

		return {
			success: true,
			code: 200,
			message: "Tweets listados.",
			data: tweets,
		};
	}

	public async createTweet(tweet: CreateTweetType): Promise<ResponseType> {
		const newTweet = new Tweet(tweet.content, tweet.tweetType, tweet.userId);

		const createdTweet = await prismaConnection.tweet.create({
			data: {
				content: tweet.content,
				type: "TWEET",
				userId: tweet.userId,
			},
		});

		return {
			success: true,
			code: 201,
			message: "Tweet criado com sucesso.",
			data: createdTweet,
		};
	}
	public async getTweetById(id: string, userId: string): Promise<ResponseType> {
		const tweet = await prismaConnection.tweet.findUnique({
			where: { id, userId },
		});

		if (!tweet || !userId) {
			throw new Error("Tweet não encontrado");
		}

		return {
			success: true,
			code: 200,
			message: "Tweet encontrado com sucesso.",
			data: tweet,
		};
	}

	public async updateTweet(tweetUpdate: UpdateTweetType,userId: string): Promise<ResponseType> {
		const tweet = await prismaConnection.tweet.findUnique({
			where: { id: tweetUpdate.id, userId },
		});

		if (!tweet || !userId) {
			throw new Error("Tweet não encontrado");
		}

		const updatedTweet = await prismaConnection.tweet.update({
			where: {
				id: tweetUpdate.id,
				userId: tweetUpdate.userId,
			},
			data: {
				content: tweetUpdate.content,
				type: "TWEET",
			},
		});

		return {
			success: true,
			code: 200,
			message: "Tweet atualizado com sucesso",
			data: updatedTweet,
		};
	}

	public async deleteTweet(id: string, userId: string): Promise<ResponseType> {
		const tweet = await prismaConnection.tweet.findUnique({
			where: { id, userId },
		});

		if (!tweet || !userId) {
			throw new Error("Tweet não encontrado");
		}

		const deletedTweet = await prismaConnection.tweet.delete({
			where: { id, userId },
		});

		return {
			success: true,
			code: 200,
			message: "Tweet removido com sucesso.",
			data: deletedTweet,
		};
	}
}
