import { Request, Response } from "express";
import { CreateFollowerType } from "../types/follower.type"
import { FollowerService } from "../services/follower.service"

const followerService = new FollowerService();

export class FollowerController {

  public async CreateFollower(request: Request, response: Response) {
    try {
      const { id, userId} = request.params;

      if (!id || !userId) {
        return response.status(400).json({
          success: false,
          code: 400,
          message: "Preencha todos os campos obrigatórios.",
        });
      }

      const follower: CreateFollowerType = { id, userId };

      const result = await followerService.create(follower);
      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: 500,
        message: "Erro ao criar usuário.",
      });
    }
  }
  public async ListFollowers(request: Request, response: Response) {
    try {
      const { id, userId } = request.params;

      const result = await followerService.findById(id, userId);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: 500,
        message: "Erro ao buscar follower.",
      });
    }
  }
  public async deleteFollower(request: Request, response: Response) {
    try {
      const { id, userId} = request.params;

      const result = await followerService.delete(id, userId );

      response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: 500,
        message: "Erro ao excluir follower.",
      });
    }
  }
}

export default new FollowerController();