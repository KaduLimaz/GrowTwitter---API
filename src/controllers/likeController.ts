import { Request, Response } from "express";
import { LikeService } from "../services/like.service"
import {CreateLikesType} from "../types/likes.type"

const likeService = new LikeService();

export class LikeController {

  public async CreateLike(request: Request, response: Response) {
    try {
      const { userId, tweetId } = request.params;

      if (!userId || !tweetId) {
        return response.status(400).json({
          success: false,
          code: 400,
          message: "Preencha todos os campos obrigatórios.",
        });
      }

      const like: CreateLikesType = { userId, tweetId };

      const result = await likeService.create(like);
      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: 500,
        message: "Erro ao criar usuário.",
      });
    }
  }
  public async ListLikes(request: Request, response: Response) {
    try {
      const { id, userId, tweetId } = request.params;

      const result = await likeService.findById(id, userId, tweetId);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: 500,
        message: "Erro ao buscar like.",
      });
    }
  }
  public async deleteLike(request: Request, response: Response) {
    try {
      const { id, userId, tweetId } = request.params;

      const result = await likeService.delete(id, userId, tweetId);

      response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: 500,
        message: "Erro ao remover like.",
      });
    }
  }
}

export default new LikeController();