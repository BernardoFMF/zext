import { AppShell } from "@mantine/core";
import React from "react";
import IconNavbar from "../components/navbar";
import { useMe } from "../context/me";
import SimpleHeader from "../components/header";
import { VideosContextProvider } from "../context/videos";
import { UserContextProvider } from "../context/users";
import { MetaContextProvider } from "../context/meta";

function HomePageLayout ({ children, path }: { children: React.ReactNode, path: string }) {
    const { user, refetch } = useMe()

    refetch()

    return (
        <VideosContextProvider>
            <UserContextProvider>
                <MetaContextProvider>
                    <AppShell
                        padding="md"
                        navbar={
                            <IconNavbar user={user} path={path} />
                        }
                        header={
                            <SimpleHeader />
                        }
                    >  
                        { children }   
                    </AppShell>
                </MetaContextProvider>
            </UserContextProvider>
        </VideosContextProvider>
    )
}

export default HomePageLayout