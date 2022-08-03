import { AppShell } from "@mantine/core";
import React from "react";
import IconNavbar from "../components/navbar";
import { useMe } from "../context/me";
import SimpleHeader from "../components/header";
import { VideosContextProvider } from "../context/videos";
import { UserContextProvider } from "../context/users";
import { MetaContextProvider } from "../context/meta";

function AuthLayout ({ children }: { children: React.ReactNode }) {
    return (
        <VideosContextProvider>
            <UserContextProvider>
                <MetaContextProvider>
                    <AppShell
                        padding="md"
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

export default AuthLayout