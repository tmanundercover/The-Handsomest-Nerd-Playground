import React, {useEffect, useState} from 'react';
import {
    AppContainer,
    Content,
    ErrorText,
    Header,
    LoadingText,
    SubTitle,
    Title,
    UserCard,
    UserList
} from "./styles/App.styled";

interface User {
    id: string;
    name: string;
    email: string;
}


const App =()=> {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch('/api/users');
                const data = await response.json();
                setUsers(data.users);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch users');
                setLoading(false);
                console.error(err);
            }
        }

        fetchUsers();
    }, []);

    return (
        <AppContainer>
            <Header>
                <Title>React + TypeScript + MirageJS</Title>
                <Content>
                    {loading ? (
                        <LoadingText>Loading users...</LoadingText>
                    ) : error ? (
                        <ErrorText>{error}</ErrorText>
                    ) : (
                        <div>
                            <SubTitle>Users from Mock API</SubTitle>
                            <UserList>
                                {users.map(user => (
                                    <UserCard key={user.id}>
                                        <h3>{user.name}</h3>
                                        <p>{user.email}</p>
                                    </UserCard>
                                ))}
                            </UserList>
                        </div>
                    )}
                </Content>
            </Header>
        </AppContainer>
    );
}

export default App;