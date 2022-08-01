import { AppShell, Header, Navbar, Box } from "@mantine/core";
import React, { useState } from "react";
import Image from "next/image";
import IconNavbar from "../components/navbar";
import { useMe } from "../context/me";
import SimpleHeader from "../components/header";
import { VideosContextProvider } from "../context/videos";
import { UserContextProvider } from "../context/users";

function HomePageLayout ({ children, path }: { children: React.ReactNode, path: string }) {
    const { user, refetch } = useMe()

    refetch()

    return (
        <VideosContextProvider>
            <UserContextProvider>
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
            </UserContextProvider>
        </VideosContextProvider>
    )
}

export default HomePageLayout