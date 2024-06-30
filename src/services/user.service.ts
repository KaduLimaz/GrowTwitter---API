import { prismaConnection } from "../database/prisma.connection";
import { ResponseType } from "../types/response.type";
import { CreateUserType, UpdateUserType } from "../types/users.type";
import { User } from "../models/user.model";
import { error } from "console";

export class UserService {
	async findAll(): Promise<ResponseType> {
		const users = await prismaConnection.user.findMany();

		return {
			success: true,
			code: 200,
			message: "Usuários listados.",
			data: users,
		};
	}

	async createUser(UserNew: CreateUserType): Promise<ResponseType> {
		const newUser = new User(
			UserNew.email,
			UserNew.name,
			UserNew.username,
			UserNew.password
		);

		const createUser = await prismaConnection.user.create({
			data: {
				email: UserNew.email,
				name: UserNew.name,
				username: UserNew.username,
				password: UserNew.password,
			},
		});

		return {
			success: true,
			code: 201,
			message: "Usuário criado com sucesso.",
		};
	}

	// async getUsers(req: Request, res: Response) {
	// 	try {
	// 		const users = await prismaConnection.user.findMany();
	// 		res.status(200).json(users);
	// 	} catch (err) {
	// 		return res.status(500).json({
	// 			ok: false,
	// 			message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${
	// 				(err as Error).message
	// 			}`,
	// 		});
	// 	}
	// }

	async getUserById(id: string): Promise<ResponseType> {
		const user = await prismaConnection.user.findUnique({
			where: {
				id,
			},
		});
		if (!user) {
			throw new Error("Usuário não encontrado");
		}
		return {
			success: true,
			code: 200,
			message: "Usuário encontrado com sucesso.",
			data: user,
		};
	}

	async updateUser(user: UpdateUserType): Promise<ResponseType> {
		const userId = await prismaConnection.user.findUnique({
			where: { id: user.id },
		});
		if (!user) {
			throw new Error("Usuário não encontrado");
		}

		const updatedUser = await prismaConnection.user.update({
			where: {
				id: user.id,
			},
			data: {
				name: user.name,
				password: user.password,
				username: user.username,
			},
		});

		return {
			success: true,
			code: 200,
			message: "Usuário atualizado com sucesso",
			data: updatedUser,
		};
	}

	async deleteUser(id: string): Promise<ResponseType> {
		const user = await prismaConnection.user.findUnique({
			where: { id },
		});

		if (!user) {
			throw new Error("Usuário não encontrado");
		}

		const deletedUser = await prismaConnection.user.delete({
			where: { id },
		});

		return {
			success: true,
			code: 200,
			message: "Usuário removido com sucesso.",
			data: deletedUser,
		};
	}
}
