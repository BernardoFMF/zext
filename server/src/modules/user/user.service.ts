import { UserModel } from "./user.model";

export async function createUser(user) {
    return UserModel.create(user)
}