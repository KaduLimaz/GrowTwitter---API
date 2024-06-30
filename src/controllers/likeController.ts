import { Request, Response } from "express";
import { prismaConnection } from "../database/prisma.connection";

export class LikeController {
    async createLike(req: Request, res: Response) {
      const { usernameUser, tweetId } = req.body;
      try {
        const like = await prismaConnection.like.create({
          data: {
            usernameUser,
            tweetId,
          },
        });
        res.status(201).json(like);
      } catch (err) {
        return res.status(500).json({
            ok: false,
            message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${
                (err as Error).message
            }`,
        });
    }
    }
  
    async getLikes(req: Request, res: Response) {
      try {
        const likes = await prismaConnection.like.findMany();
        res.status(200).json(likes);
      } catch (err) {
        return res.status(500).json({
            ok: false,
            message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${
                (err as Error).message
            }`,
        });
    }
    }
  
    async getLikeById(req: Request, res: Response) {
      const { id } = req.params;
      try {
        const like = await prismaConnection.like.findUnique({
          where: {
            id,
          },
        });
        if (!like) {
          return res.status(404).json({ error: 'Like not found' });
        }
        res.status(200).json(like);
      } catch (err) {
        return res.status(500).json({
            ok: false,
            message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${
                (err as Error).message
            }`,
        });
    }
    }
  
    async deleteLike(req: Request, res: Response) {
      const { id } = req.params;
      try {
        await prismaConnection.like.delete({
          where: {
            id,
          },
        });
        res.status(204).end();
      } catch (err) {
        return res.status(500).json({
            ok: false,
            message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${
                (err as Error).message
            }`,
        });
    }
    }
}
  
export default new LikeController();