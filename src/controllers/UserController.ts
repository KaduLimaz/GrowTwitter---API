import { Request, Response } from "express";
import { prismaConnection } from "../database/prisma.connection";
import { UserService } from "../services/user.service";
import { CreateUserType } from "../types/users.type";

const userService = new UserService();

export class UserController {
	async list(req: Request, res: Response) {
		try {
			const users = await userService.findAll();
			return res.status(200).json(users);
		} catch (err) {
			return res.status(500).json({
				ok: false,
				message: `Erro ao listar usuarios. Erro: ${(err as Error).name} - ${
					(err as Error).message
				}`,
			});
		}
	}

	async createUser(req: Request, res: Response) {
		try {
			const { name, email, username, password, authToken } = req.body;

			if (!name || !email || !password || !username) {
				return res.status(400).json({
					success: false,
					code: 400,
					message: "Preencha todos os campos obrigatórios.",
				});
			}

			const user: CreateUserType = { name, email, username, password };
			const sucess = await userService.createUser(user);
			return res.status(200).json(sucess);
		} catch (err) {
			return res.status(500).json({
				ok: false,
				message: `Erro ao criar usuário. Erro: ${(err as Error).name} - ${
					(err as Error).message
				}`,
			});
		}
	}

	async getUsers(req: Request, res: Response) {
		try {
			const users = await prismaConnection.user.findMany();
			res.status(200).json(users);
		} catch (err) {
			return res.status(500).json({
				ok: false,
				message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${
					(err as Error).message
				}`,
			});
		}
	}

	async getUserById(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const sucess = await userService.getUserById(id);
			return res.status(200).json(sucess);
		} catch (err) {
			return res.status(500).json({
				ok: false,
				message: `Erro ao buscar usuário. Erro: ${(err as Error).name} - ${
					(err as Error).message
				}`,
			});
		}
	}

	async updateUser(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { name, email, username, password } = req.body;

			const sucess = await userService.updateUser({
				id,
				name,
				password,
				username,
				email,
			});

			return res.status(200).json(sucess);
		} catch (err) {
			return res.status(500).json({
				ok: false,
				message: `Erro ao atualizar usuário. Erro: ${(err as Error).name} - ${
					(err as Error).message
				}`,
			});
		}
	}

	async deleteUser(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const sucess = await userService.deleteUser(id);
		} catch (err) {
			return res.status(500).json({
				ok: false,
				message: `Erro ao excluir usuário. Erro: ${(err as Error).name} - ${
					(err as Error).message
				}`,
			});
		}
	}
}

export default new UserController();
