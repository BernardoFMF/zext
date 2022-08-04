import { Navbar, Tooltip, UnstyledButton, createStyles, Stack, Box } from "@mantine/core"
import { TablerIcon, IconHome2, IconUser, IconHeart, IconUsers, IconLogin } from "@tabler/icons"
import Link from "next/link"
import LogoutButton from "./logoutButton"
import { Me } from "../types"
import UploadVideo from "./uploadVideo"
import Section from "./slideTransition"
import UserImageContainer from "./userImageContainer"

const useStyles = createStyles((theme) => ({
    link: {
        width: 50,
        height: 50,
        borderRadius: theme.radius.md,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: theme.colors.dark[0],

        "&:hover": {
            backgroundColor: theme.colors.dark[5],
        }
    },

    active: {
        "&, &:hover": {
            backgroundColor: theme.fn.variant({ variant: "light", color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
        }
    }
}))

interface NavbarLinkProps {
    icon: TablerIcon;
    label: string;
    active?: boolean;
    href: string;
}

function NavbarLink({ icon: Icon, label, active, href }: NavbarLinkProps) {
    const { classes, cx } = useStyles();
    
    return (
        <Link href={href} passHref>
            <Box mb={5}>
            <Tooltip label={label} position="right" transitionDuration={0}>
                <UnstyledButton className={cx(classes.link, { [classes.active]: active })}>
                    <Icon stroke={1.5} />
                </UnstyledButton>
            </Tooltip>
            </Box>
        </Link>
    )
}

const navData = [
    { icon: IconHome2, label: "Home", href: "/", needLog: false, self: false },
    { icon: IconUser, label: "Profile", href: "/users/", needLog: true, self: true, falseRef: "/users/:userid" },
    { icon: IconUsers, label: "Users", href: "/users", self: false },
    { icon: IconHeart, label: "Liked Videos", href: "/likes", needLog: true, self: false }
]

function NavbarMinimal({ path, user }: { path: string, user: Me }) {
    const links = navData.filter(link => {
        if (!link.needLog) return true
        if (user) return true
        return false
    }).map(link => {
        if (!link.self) return link
        let formattedLink = { ...link }
        formattedLink.href = formattedLink.href + user._id
        return formattedLink
    }).map((link, index) => (
        <Section delay={0.1 * index}>
            <NavbarLink
                {...link}
                key={link.label}
                active={link.self ? link.falseRef === path : link.href === path}
            />
        </Section>
    ))

    return (
        <Navbar style={{ background: "#20202380", border: "none", backdropFilter: "blur(10px)"}} height={"100%"} width={{ base: 80 }} p="md">
            <Navbar.Section grow>
                <Stack justify="center" spacing={0}>
                    {links}
                </Stack>
            </Navbar.Section>
            <Navbar.Section>
                <Stack justify="center" mb={35} spacing={0}>
                    {
                        user ? (
                            <>
                                <Section delay={0.4}>
                                    <UploadVideo />
                                </Section>
                                <Section delay={0.5}>
                                    <UserImageContainer image={user.image} userId={user._id} />
                                </Section>
                                <Section delay={0.6}>
                                <LogoutButton />
                                </Section>
                            </>
                        ) : (
                            <Section delay={0.6}>
                                <NavbarLink icon={IconLogin} label="Login" href="/auth/login" />
                            </Section>
                            
                        )
                    }
                </Stack>
            </Navbar.Section>
        </Navbar>
    )
}

export default NavbarMinimal