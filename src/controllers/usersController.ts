import { Request, Response } from "express";
import { prismaConnection } from "../database/prisma.connection";

export class UsersController {
	public static async create(req: Request, res: Response) {

		const { name, email, username, password, authToken } = req.body;

		try {		

			const user =  await prismaConnection.user.create({
				data: {
					name,
					email,
					username,
					password,
					authToken,
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


	async getUserById(req: Request, res: Response) {
		
		const { id } = req.params; 

		try {
			const user = await prismaConnection.user.findUnique({
				where: {
					id
				}

			});
			if (!user) {
				return res.status(404).json({ error: 'User not found' });
			}
			res.status(200).json(user);
		}catch (err) {
			return res.status(500).json({
				ok: false,
				message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${
					(err as Error).message
				}`,
			});
		}

	}


	async updateUser(req: Request, res: Response) {
		const { id } = req.params;
		const { name, email, username, password, authToken } = req.body;

		try {
			const updateUser = await prismaConnection.user.update({
				where: {
					id
				},

				data: {

					name,
					email,
					username,
					password,
					authToken,
				},
			});
			res.status(200).json(updateUser);
		}catch (err) {
			return res.status(500).json({
				ok: false,
				message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${
					(err as Error).message
				}`,
			});
		}
	}

	async deleteUser(req: Request, res: Response) {
		const { id } = req.params;
		try {
		  await prismaConnection.user.delete({
			where: { id }
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
