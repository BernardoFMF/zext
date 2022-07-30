import { Button, Container, Paper, PasswordInput, Stack, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import Head from "next/head"
import { registerUser } from "../../api"

function RegisterPage() {
    const form = useForm({
        initialValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: ""
        }
    })

    const mutation = useMutation<string, AxiosError, Parameters<typeof registerUser>["0"]>(registerUser, {
        onMutate: () => {

        },
        onSuccess: () => {

        },
        onError: () => {
            
        }
    })

    return (
        <>
            <Head>
                <title>Register user</title>
            </Head>
            <Container>
                <Title>
                    Register
                </Title>

                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <form onSubmit={form.onSubmit(values => mutation.mutate(values))}>
                        <Stack>
                            <TextInput
                                label="Email"
                                placeholder="johnDoe@example.com"
                                required
                                { ...form.getInputProps("email") }
                            />
                            <TextInput
                                label="Username"
                                placeholder="johnDoe"
                                required
                                { ...form.getInputProps("username") }
                            />
                            <PasswordInput 
                                label="Password"
                                placeholder="password"
                                required
                                { ...form.getInputProps("password") }
                            />
                            <PasswordInput 
                                label="Confirm password"
                                placeholder="password"
                                required
                                { ...form.getInputProps("confirmPassword") }
                            />
                            <Button type="submit">
                                Register
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </>
    )
}

export default RegisterPage