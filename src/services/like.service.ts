import { prismaConnection } from "../database/prisma.connection";
import { ResponseType } from "../types/response.type";
import {CreateLikesType} from "../types/likes.type"
import { Like } from "../models/like.model"

export class LikeService {
    public async findAll(): Promise<ResponseType> {
      const likes = await prismaConnection.like.findMany();
  
      return {
        success: true,
        code: 200,
        message: "Retweets listados.",
        data: likes,
      };
    }
  
    public async findById(id: string, userId: string, tweetId: string): Promise<ResponseType> {
      const like = await prismaConnection.like.findUnique({
        where: { id, userId, tweetId },
      });
  
      if (!id || !userId || !tweetId) {
        throw new Error("Like não encontrado");
      }
  
      return {
        success: true,
        code: 200,
        message: "Like encontrado com sucesso.",
        data: like,
      };
    }
  
    public async create(like: CreateLikesType): Promise<ResponseType> {
      const newLike = new Like(like.tweetId, like.userId);
  
      const createdLike = await prismaConnection.like.create({
        data: {
          userId: newLike.userId,
          tweetId: newLike.tweetId,
        },
      });
  
      return {
        success: true,
        code: 201,
        message: "Like criado com sucesso",
        data: createdLike,
      };
    }
  
    public async delete(id: string, userId: string, tweetId: string): Promise<ResponseType> {
      const like = await prismaConnection.like.findUnique({
        where: { id, userId, tweetId },
      });
  
      if (!like) {
        throw new Error("Like não encontrado");
      }
  
      const deletedLike = await prismaConnection.like.delete({
        where: {
          id, userId, tweetId
        },
      });
  
      return {
        success: true,
        code: 200,
        message: "Like removido com sucesso.",
        data: deletedLike,
      };
    }
  }