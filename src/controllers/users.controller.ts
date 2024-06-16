import { Request, Response } from "express";
import { prismaConnection } from "../database/prisma.connection";

export class UsersController {
	public static async create(req: Request, res: Response) {
		try {
			const { name, email, username, password } = req.body;

			await prismaConnection.user.create({
				data: {
					name,
					email,
					username,
					password,
				},
			});

			return res.status(201).json({
				ok: true,
				message: "Usuario cadastrado com sucesso!",
			});
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
