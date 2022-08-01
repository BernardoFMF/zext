import { useState } from 'react';
import { Navbar, Center, Tooltip, UnstyledButton, createStyles, Stack, Box, Avatar } from '@mantine/core';
import {
  TablerIcon,
  IconHome2,
  IconUser,
  IconLogout,
  IconHeart,
  IconSwitchHorizontal,
  IconUsers,
  IconLogin,
  IconUpload
} from '@tabler/icons'
import Link from 'next/link';
import { useMe } from '../context/me';
import LogoutButton from './logoutButton';
import { Me } from '../types';
import Image from 'next/image';
import UploadVideo from './uploadVideo';

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
  );
}

const mockdata = [
  { icon: IconHome2, label: 'Home', href: "/", needLog: false },
  { icon: IconUser, label: 'Profile', href: "/test", needLog: true },
  { icon: IconUsers, label: 'Users', href: "/users", needLog: true },
  { icon: IconHeart, label: 'Liked Videos', href: "/liked-videos", needLog: true }
];

export default function NavbarMinimal({ path, user }: { path: string, user: Me }) {

  const links = mockdata.filter(link => {
    if (!link.needLog) return true
    if (user) return true
    return false
  }).map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={link.href === path}
    />
  ));

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
                <UploadVideo />
                <Box><Avatar size={50} mb={5} src={null} alt="no image here" /></Box>
                <LogoutButton />
              </>
            ) : (
              <NavbarLink icon={IconLogin} label="Login" href='/auth/login' />
            )
          }
          
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}