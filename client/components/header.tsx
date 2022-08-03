import { Header, Container, Group, createStyles, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import Section from "./slideTransition";
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
    const { classes } = useStyles();
    return (
        <Header style={{ background: "#20202380", border: "none", backdropFilter: "blur(10px)"}} height={HEADER_HEIGHT} >
            <Container className={classes.inner} fluid>
                <Group>
                    <Logo />
                    <TextInput
                        ml={15}
                        placeholder="Search"
                        size="xs"
                        radius={10}
                        icon={<IconSearch size={12} stroke={1.5} />}
                        rightSectionWidth={70}
                        styles={{ rightSection: { pointerEvents: 'none' } }}
                    />
                </Group>
                <Group spacing={5} className={classes.links}>
                    
                </Group>
            </Container>
        </Header>
    );
}