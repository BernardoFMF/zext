import "../styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

const queryClient = new QueryClient()

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App(props: AppPropsWithLayout) {
    const { Component, pageProps } = props;

    const getLayout = Component.getLayout || ((page) => page)

    return (
        <>
            <Head>
                <title>Page title</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    colorScheme: "dark"
                }}
            >
                <NotificationsProvider>
                    <QueryClientProvider client={queryClient}>
                        {getLayout(
                            <main>
                                <Component {...pageProps} />
                            </main>
                        )}    
                    </QueryClientProvider>
                </NotificationsProvider>
            </MantineProvider>
        </>
    )
}