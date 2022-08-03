import { ReactElement } from "react";
import HomePageLayout from "../../layout/home";
import { useUser } from "../../context/users";
import UserCard from "../../components/userCard";
import { SimpleGrid, Chip, Title } from '@mantine/core'
import Meta from "../../components/meta";
import Section from "../../components/slideTransition";

function UsersPage() {
    const { users } = useUser()

    return (
        <>
            <Meta title={`All users`} />
            <Section delay={0}>
                <Title order={1}>Users</Title>
            </Section>

            <SimpleGrid 
                cols={5}   
                pt={20}   
                breakpoints={[
                { maxWidth: 1024, cols: 3, spacing: 'md' },
                { maxWidth: 769, cols: 2, spacing: 'sm' },
                { maxWidth: 600, cols: 1, spacing: 'sm' },
                ]}
            >
                {
                    users.map((user, index) => <Section delay={0.1 + (0.1 * index)}><UserCard user={user}/></Section>)
                }
            </SimpleGrid>
        </>
    )
}

UsersPage.getLayout = function(page: ReactElement) {
    return <HomePageLayout path="/users">{page}</HomePageLayout>
  }
  
  export default UsersPage;