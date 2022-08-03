import {
    Button,
    Container,
    Paper,
    PasswordInput,
    Text,
    Anchor,
    TextInput,
    Title,
    Stack,
    useMantineTheme
  } from "@mantine/core";
import { ReactElement } from "react";
import { useForm } from "@mantine/form"
import { AxiosError } from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api";
import AuthLayout from "../../layout/auth";
import { showNotification, updateNotification } from "@mantine/notifications";
import Section from "../../components/slideTransition";
import Link from "next/link";

function LoginPage() {
    const theme = useMantineTheme();
    const router = useRouter();

    const form = useForm({
      initialValues: {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
    });
  
    const mutation = useMutation<string, AxiosError, Parameters<typeof login>["0"]>(login, {
      onMutate: () => {
        showNotification({
            id: "login",
            title: "Verifying credentials",
            message: "Please wait...",
            loading: true,
        })
      },
      onSuccess: () => {
          updateNotification({
              id: "login",
              title: "Success",
              message: "Successfully logged in",
          })
      
          router.push("/");
      },
      onError: () => {
          updateNotification({
              id: "login",
              title: "Error",
              message: "Invalid credentials",
          })
      }
    });
  
    return (
        <>
          <Head>
            <title>Login</title>
          </Head>
          <Container size={420} my={40}>
            <Section delay={0}>
              <Title
                align="center"
              >
                Welcome back!
              </Title>
            </Section>
            <Section delay={0.1}>
              <Text color="dimmed" size="sm" align="center" mt={5}>
                Don't have an account yet?{' '}
                <Link href={"/auth/register"}>
                  <a style={{ color: theme.colors.blue[5] }}>
                    Create an account
                  </a>
                </Link>
              </Text>
            </Section>

            <Section delay={0.2}>
              <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
                  <Stack>
                    <Section delay={0.3}>
                      <TextInput
                        label="Email"
                        placeholder="JohnDoe@example.com"
                        required
                        {...form.getInputProps("email")}
                      />
                    </Section>
 
                    <Section delay={0.4}>
                      <PasswordInput
                        label="Password"
                        placeholder="Your password"
                        required
                        {...form.getInputProps("password")}
                      />
                    </Section>
                    <Section delay={0.4}>
                      <Button fullWidth type="submit">Login</Button>
                    </Section>
                  </Stack>
                </form>
              </Paper>
            </Section>
          </Container>
        </>
      );
    }

LoginPage.getLayout = function(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>
}
    
export default LoginPage;