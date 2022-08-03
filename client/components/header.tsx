import { Header, Container, Group, createStyles, TextInput, ActionIcon, useMantineTheme } from "@mantine/core";
import { IconSearch, IconArrowRight } from "@tabler/icons";
import Section from "./slideTransition";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import Logo from "./logo";

const HEADER_HEIGHT = 50

const useStyles = createStyles((theme) => ({
    inner: {
      height: HEADER_HEIGHT,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  
    links: {
      [theme.fn.smallerThan('sm')]: {
        display: 'none',
      },
    },
  
    burger: {
      [theme.fn.largerThan('sm')]: {
        display: 'none',
      },
    },
  
    link: {
      display: 'block',
      lineHeight: 1,
      padding: '8px 12px',
      borderRadius: theme.radius.sm,
      textDecoration: 'none',
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
      fontSize: theme.fontSizes.sm,
      fontWeight: 500,
  
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      },
    },
  
    linkLabel: {
      marginRight: 5,
    },
}));

export default function SimpleHeader() {
    const router = useRouter()
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const form = useForm({
      initialValues: {
        searchQuery: ""
      }
    })
    return (
        <Header style={{ background: "#20202380", border: "none", backdropFilter: "blur(10px)"}} height={HEADER_HEIGHT} >
            <Container className={classes.inner} fluid>
                <Group>
                    <Logo />
                    <form
                      onSubmit={form.onSubmit((values) =>
                        router.push(`/search?name=${values.searchQuery}`)
                      )}
                    >
                        <TextInput 
                          ml={15}
                          size="xs"
                          radius={10}
                          placeholder="Search"
                          {...form.getInputProps("searchQuery")}
                          icon={<IconSearch size={12} stroke={1.5} />}
                          rightSection={
                            <ActionIcon type="submit" size={20} radius={10} color={theme.primaryColor} variant="filled">
                                <IconArrowRight size={18} stroke={1.5} />
                            </ActionIcon>
                          }
                          rightSectionWidth={42}
                        />
                    </form>
                </Group>
            </Container>
        </Header>
    );
}