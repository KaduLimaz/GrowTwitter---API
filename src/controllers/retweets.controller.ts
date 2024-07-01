import { Request, Response } from "express";
import { RetweetService } from "../services/retweet.service"
import { CreateRetweetType } from "../types/retweets.type"



const retweetService = new RetweetService();

export class RetweetController {
  public async getRetweets(request: Request, response: Response) {
    try {
      const retweets = await retweetService.findAllRetweet();

      return response.status(200).json(retweets);
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: 500,
        message: "Erro ao listar retweets.",
      });
    }
  }

  public async createRetweets(request: Request, response: Response) {
    try {
      const {
        content, tweetId, userId } = request.body;

      if (!content ||!userId || !tweetId) {
        return response.status(400).json({
          success: false,
          code: 400,
          message: "Preencha todos os campos obrigatórios.",
        });
      }

      const retweet: CreateRetweetType = { content, tweetType: "Retweet", userId, tweetId };

      const result = await retweetService.createRetweet(retweet);
      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: 500,
        message: "Erro ao criar retweet.",
      });
    }
  }
  public async getRetweetById(request: Request, response: Response) {
    try {
      const { id, userId, tweetId } = request.params;

      const result = await retweetService.findById(id, userId, tweetId);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: 500,
        message: "Erro ao buscar retweet.",
      });
    }
  }
  public async updateRetweet(request: Request, response: Response) {
    try {
      const { id, userId, tweetId } = request.params;
      const { content } = request.body;

      const result = await retweetService.updateRetweet({
        id,
        content,
        userId,
        tweetId
      });

      response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: 500,
        message: "Erro ao atualizar retweet.",
      });
    }
  }
  public async deleteRetweet(request: Request, response: Response) {
    try {
      const { id, userId, tweetId } = request.params;

      const result = await retweetService.deleteRetweet(id, userId, tweetId);

      response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: 500,
        message: "Erro ao excluir retweet.",
      });
    }
  }
}
