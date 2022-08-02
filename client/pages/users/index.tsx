import { ReactElement } from "react";
import HomePageLayout from "../../layout/home";
import { useUser } from "../../context/users";
import UserCard from "../../components/userCard";
import { SimpleGrid, Chip, Title } from '@mantine/core'

function UsersPage() {
    const { users } = useUser()

    return (
        <>
            <Title order={1}>Users</Title>
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
                    users.map(user => <UserCard user={user}/>)
                }
            </SimpleGrid>
    
        </>
    )
}

UsersPage.getLayout = function(page: ReactElement) {
    return <HomePageLayout path="/users">{page}</HomePageLayout>
  }
  
  export default UsersPage;