import { AppShell, Header, Navbar, Box } from "@mantine/core";
import React, { useState } from "react";
import Image from "next/image";
import IconNavbar from "../components/navbar";
import { useMe } from "../context/me";

function HomePageLayout ({ children, path }: { children: React.ReactNode, path: string }) {
    const { user, refetch } = useMe()

    refetch()

    return (
        <AppShell
            padding="md"
            navbar={
                <IconNavbar user={user} path={path} />
            }
        >
            { children }
        </AppShell>
    )
}

export default HomePageLayout