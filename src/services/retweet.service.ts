import { prismaConnection } from "../database/prisma.connection";
import { ResponseType } from "../types/response.type";
import { Retweet } from "../models/retweet.model";
import { CreateRetweetType, UpdateRetweetType } from "../types/retweets.type";

export class RetweetService {
	public async findAllRetweet(): Promise<ResponseType> {
		const retweets = await prismaConnection.retweet.findMany();

		return {
			success: true,
			code: 200,
			message: "Retweets listados.",
			data: retweets,
		};
	}

	public async createRetweet(retweet: CreateRetweetType): Promise<ResponseType> {
		const newRetweet = new Retweet(
			retweet.content,
			(retweet.tweetType = "Retweet"),
			retweet.userId,
			retweet.tweetId
		);

		const createdRetweet = await prismaConnection.retweet.create({
			data: {
				content: newRetweet.content,
				userId: retweet.userId,
				tweetId: retweet.tweetId,
			},
		});

		return {
			success: true,
			code: 201,
			message: "Retweet criado com sucesso.",
			data: createdRetweet,
		};
	}
	public async findById(
		id: string,
		userId: string,
		tweetId: string
	): Promise<ResponseType> {
		const retweet = await prismaConnection.retweet.findUnique({
			where: { id, userId, tweetId },
		});

		if (!retweet) {
			throw new Error("Tweet não encontrado");
		}

		return {
			success: true,
			code: 200,
			message: "Tweet encontrado com sucesso.",
			data: retweet,
		};
	}

	public async updateRetweet(retweet: UpdateRetweetType): Promise<ResponseType> {
		const retweetUpdate = await prismaConnection.retweet.findUnique({
			where: {
				id: retweet.id,
				userId: retweet.userId,
				tweetId: retweet.tweetId,
			},
		});

		if (!retweet) {
			throw new Error("Tweet não encontrado");
		}

		const updatedRetweet = await prismaConnection.retweet.update({
			where: {
				id: retweet.id,
				userId: retweet.userId,
				tweetId: retweet.tweetId,
			},
			data: {
				content: retweet.content,
			},
		});

		return {
			success: true,
			code: 200,
			message: "Tweet atualizado com sucesso",
			data: updatedRetweet,
		};
	}

	public async deleteRetweet(
		id: string,
		userId: string,
		tweetId: string
	): Promise<ResponseType> {
		const retweet = await prismaConnection.retweet.findUnique({
			where: { id, userId, tweetId },
		});

		if (!retweet) {
			throw new Error("Tweet não encontrado");
		}

		const deletedRetweet = await prismaConnection.retweet.delete({
			where: { id, userId, tweetId },
		});

		return {
			success: true,
			code: 200,
			message: "Tweet removido com sucesso.",
			data: deletedRetweet,
		};
	}
}
