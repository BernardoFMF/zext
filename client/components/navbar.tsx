import { useState } from 'react';
import { Navbar, Center, Tooltip, UnstyledButton, createStyles, Stack, Box } from '@mantine/core';
import {
  TablerIcon,
  IconHome2,
  IconUser,
  IconLogout,
  IconHeart,
  IconSwitchHorizontal,
  IconUsers
} from '@tabler/icons'
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  path: string;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, path, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
      <Link href={path} passHref>
        <Box mb={5}>
          <Tooltip label={label} position="right" transitionDuration={0}>
            
              <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
                <Icon stroke={1.5} />
              </UnstyledButton>
          
          </Tooltip>
        </Box>
      </Link>
  );
}

const mockdata = [
  { icon: IconHome2, label: 'Home', path: "/" },
  { icon: IconUser, label: 'Profile', path: "/profile" },
  { icon: IconUsers, label: 'Users', path: "/users" },
  { icon: IconHeart, label: 'Dashboard', path: "/liked-videos" }
];

export default function NavbarMinimal() {
  const [active, setActive] = useState(2);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <Navbar height={"100%"} width={{ base: 80 }} p="md">
      <Center>

      </Center>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink icon={IconSwitchHorizontal} label="Change account" path='/xpto'/>
          <NavbarLink icon={IconLogout} label="Logout" path='/xptk' />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}