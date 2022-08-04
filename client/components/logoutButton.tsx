import { Tooltip, UnstyledButton, createStyles, Box } from "@mantine/core"
import { IconLogout } from "@tabler/icons"
import { logout } from "../api"
import { useRouter } from "next/router"

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
            backgroundColor: theme.colors.dark[5]
        }
    }
}))
  
function LogoutButton() {
    const { classes, cx } = useStyles()

    const router = useRouter()

    const logoutHandler: any = () => {
        logout()
        router.push("/auth/login")
    }

    return (
        <Box mb={5}>
            <Tooltip label={"Logout"} position="right" transitionDuration={0}>
                <UnstyledButton className={cx(classes.link)} onClick={logoutHandler}>
                    <IconLogout stroke={1.5} />
                </UnstyledButton>
            </Tooltip>
        </Box>
    )
}

export default LogoutButton