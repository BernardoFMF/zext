import { useState } from 'react';
import { Tooltip, UnstyledButton, createStyles, Box } from '@mantine/core';
import {
  IconLogout,
  TablerIcon
} from '@tabler/icons'
import Link from 'next/link';
import { logout } from '../api';
import { useRouter } from 'next/router';
import cookies from 'js-cookie'

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
  
export default function LogoutButton() {
    const { classes, cx } = useStyles();

    const router = useRouter()

    const logoutHandler: any = () => {
      logout()
      router.push("/auth/login")

    }

    return (
          <Box mb={5}>
            <Tooltip label={"logout"} position="right" transitionDuration={0}>
              
                <UnstyledButton className={cx(classes.link)} onClick={logoutHandler}>
                  <IconLogout stroke={1.5} />
                </UnstyledButton>
            
            </Tooltip>
          </Box>
    );
  }