import {
    Button,
    Container,
    Paper,
    PasswordInput,
    Stack,
    TextInput,
    Title,
  } from "@mantine/core";
import { useForm } from "@mantine/form"
import { AxiosError } from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api";
import { showNotification, updateNotification } from "@mantine/notifications";

  function LoginPage() {
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
          <Container>
            <Title>Login</Title>
    
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
              <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
                <Stack>
                  <TextInput
                    label="Email"
                    placeholder="jane@example.com"
                    required
                    {...form.getInputProps("email")}
                  />
    
                  <PasswordInput
                    label="Password"
                    placeholder="Your strong password"
                    required
                    {...form.getInputProps("password")}
                  />
    
                  <Button type="submit">Login</Button>
                </Stack>
              </form>
            </Paper>
          </Container>
        </>
      );
    }
    
export default LoginPage;