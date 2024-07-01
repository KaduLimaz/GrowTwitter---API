import { prismaConnection } from "../database/prisma.connection";
import { ResponseType } from "../types/response.type";
import { CreateFollowerType } from "../types/follower.type"
import { Follower } from "../models/follower.mode"



export class FollowerService {
    public async create(follower: CreateFollowerType): Promise<ResponseType> {
      const newFollower = new Follower(follower.id, follower.userId);
  
        const createdFollower = await prismaConnection.follower.create({
            data: {
                id: newFollower.id,
                userId: newFollower.userId,
              },
        })
  
      return {
        success: true,
        code: 201,
        message: "Follower criado com sucesso",
        data: createdFollower,
      };
    }
  
    public async findById(
      id: string,
      userId: string
    ): Promise<ResponseType> {
      const follower = await prismaConnection.follower.findUnique({
        where: { id, userId },
      });
  
      if (!id || !userId ) {
        throw new Error("Follower não encontrado");
      }
  
      return {
        success: true,
        code: 200,
        message: "Follower encontrado com sucesso.",
        data: follower,
      };
    }
  
    public async delete(id: string, userId: string): Promise<ResponseType> {
      const follower = await prismaConnection.follower.findUnique({
        where: { id, userId },
      });
  
      if (!follower) {
        throw new Error("Follower não encontrado");
      }
  
      const deletedFollower = await prismaConnection.follower.delete({
        where: {
          id,
        },
      });
  
      return {
        success: true,
        code: 200,
        message: "Follower removido com sucesso.",
        data: deletedFollower,
      };
    }
  }