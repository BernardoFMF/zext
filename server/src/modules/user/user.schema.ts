import { object, string, TypeOf } from "zod"

export const registerUserSchema = {
    body: object({
        username: string({
            required_error: "Username is required"
        }),
        email: string({
            required_error: "Email is required"
        }).email("Not a valid email"),
        password: string({
            required_error: "Password is required"
        }).min(6, "Password must be at least 6 characters long"),
        confirmPassword: string({
            required_error: "Password confirmation is required"
        })
    }).refine(data => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    })
}

export const updateProfilePictureSchema = {
    body: object({
        image: string()
    })
}

export type RegisterUserBody = TypeOf<typeof registerUserSchema.body>

export type UpdateProfilePictureBody = TypeOf<typeof updateProfilePictureSchema.body>