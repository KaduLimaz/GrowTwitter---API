import { Request, Response } from "express";
import { prismaConnection } from "../database/prisma.connection";

export class TweetController {
	async createTweet(req: Request, res: Response) {
		const { content, type, userId } = req.body;

		try {
			const tweet = await prismaConnection.tweet.create({
				data: {
					content,
					type,
					userId,
				},
			});

			res.status(201).json(tweet);
		} catch (err) {
			return res.status(500).json({
				ok: false,
				message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${
					(err as Error).message
				}`,
			});
		}
	}

	async getTweets(req: Request, res: Response) {
		try {
			const tweets = await prismaConnection.tweet.findMany();
			res.status(200).json(tweets);
		} catch (err) {
			return res.status(500).json({
				ok: false,
				message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${
					(err as Error).message
				}`,
			});
		}
	}

	async getTweetById(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const tweet = await prismaConnection.tweet.findUnique({
				where: {
					id,
				},
			});
			if (!tweet) {
				return res.status(404).json({ error: "Tweet not found" });
			}
			res.status(200).json(tweet);
		} catch (err) {
			return res.status(500).json({
				ok: false,
				message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${
					(err as Error).message
				}`,
			});
		}
    }
    
    async updateTweet(req: Request, res: Response) {
        const { id } = req.params;
        const { content, type } = req.body;

        try {
            const updatedTweet = await prismaConnection.tweet.update({
                where: {
                  id,
                },
                data: {
                  content,
                  type,
                },
            });
            res.status(200).json(updatedTweet);
        }catch (err) {
			return res.status(500).json({
				ok: false,
				message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${
					(err as Error).message
				}`,
			});
		}
    }

    async deleteTweet(req: Request, res: Response) {
        const { id } = req.params;

        try {
            await prismaConnection.tweet.delete({
                where: {
                  id,
                },
              });
              res.status(204).end();
        }catch (err) {
			return res.status(500).json({
				ok: false,
				message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${
					(err as Error).message
				}`,
			});
		}
    }
}

export default new TweetController();