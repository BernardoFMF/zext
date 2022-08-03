import { Button, Container, Paper, Text, useMantineTheme, PasswordInput, Stack, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import Head from "next/head"
import { showNotification, updateNotification } from "@mantine/notifications";
import { registerUser } from "../../api"
import Link from "next/link"
import { useRouter } from "next/router";
import AuthLayout from "../../layout/auth"
import { ReactElement } from "react"
import Section from "../../components/slideTransition"
import Meta from "../../components/meta"

function RegisterPage() {
    const theme = useMantineTheme();
    const router = useRouter();

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
            showNotification({
                id: "register",
                title: "Creating account",
                message: "Please wait...",
                loading: true,
            })
        },
        onSuccess: () => {
            updateNotification({
                id: "register",
                title: "Success",
                message: "Successfully created account",
            })
        
            router.push("/auth/login");
        },
        onError: () => {
            updateNotification({
                id: "register",
                title: "Error",
                message: "Could not create account",
            })
        }
    })

    return (
        <>
            <Meta title="Register" />
            <Container size={420} my={40}>
                <Section delay={0}>
                    <Title
                        align="center"
                    >
                        Create your account
                    </Title>
                </Section>
                <Section delay={0.1}>
                    <Text color="dimmed" size="sm" align="center" mt={5}>
                        Already have an account?{' '}
                        <Link href={"/auth/login"}>
                            <a style={{ color: theme.colors.blue[5] }}>
                                Log in
                            </a>
                        </Link>
                    </Text>
                </Section>
                <Section delay={0.2}>
                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <form onSubmit={form.onSubmit(values => mutation.mutate(values))}>
                            <Stack>
                                <Section delay={0.3}>
                                    <TextInput
                                        label="Email"
                                        placeholder="johnDoe@example.com"
                                        required
                                        styles={(theme) => ({ required: { color: theme.colors.blue[5] }})}
                                        { ...form.getInputProps("email") }
                                    />
                                </Section>
                                <Section delay={0.4}>
                                    <TextInput
                                        label="Username"
                                        placeholder="johnDoe"
                                        required
                                        styles={(theme) => ({ required: { color: theme.colors.blue[5] }})}
                                        { ...form.getInputProps("username") }
                                    />
                                </Section>
                                <Section delay={0.5}>
                                    <PasswordInput 
                                        label="Password"
                                        placeholder="password"
                                        required
                                        styles={(theme) => ({ required: { color: theme.colors.blue[5] }})}
                                        { ...form.getInputProps("password") }
                                    />
                                </Section>
                                <Section delay={0.6}>
                                    <PasswordInput 
                                        label="Confirm password"
                                        placeholder="password"
                                        required
                                        styles={(theme) => ({ required: { color: theme.colors.blue[5] }})}
                                        { ...form.getInputProps("confirmPassword") }
                                    />
                                </Section>
                                <Section delay={0.7}>
                                    <Button fullWidth type="submit">
                                        Register
                                    </Button>
                                </Section>
                            </Stack>
                        </form>
                    </Paper>
                </Section>

  
            </Container>
        </>
    )
}

RegisterPage.getLayout = function(page: ReactElement) {
    return <AuthLayout>{page}</AuthLayout>
}

export default RegisterPage