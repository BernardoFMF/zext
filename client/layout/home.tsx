import { AppShell, Header, Navbar, Box } from "@mantine/core";
import React, { useState } from "react";
import Image from "next/image";
import NavbarSearch from "../components/navbar";

function HomePageLayout ({ children }: { children: React.ReactNode }) {
    const [ open, setOpen ] = useState(true)

    return (
        <AppShell
            padding="md"
            navbar={
                <NavbarSearch open={open}/>
            }
        >
            { children }
        </AppShell>
    )
}

export default HomePageLayout