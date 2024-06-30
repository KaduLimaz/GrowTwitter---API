export interface CreateUserType {
    name: string
    email: string
    password: string
    username: string
}

export interface UpdateUserType {
    id: string
    email?: string
    name?: string
    password?: string
    username?: string
}
