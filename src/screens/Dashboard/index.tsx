import React from 'react';

import { HighlightCard } from '../../Components/HighlightCard/index';
import { 
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighlightCards
 } from './styles'

export function Dashboard(){
    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/68449430?v=4' }}/>
                        
                        <User>
                            <UserGreeting>Olá, </UserGreeting>
                            <UserName>Júnior</UserName>
                        </User>
                    </UserInfo>

                    <Icon name="power"/>
                </UserWrapper>
            </Header>

            <HighlightCards
                horizontal
            >
                <HighlightCard />
                <HighlightCard />
                <HighlightCard />
            </HighlightCards>
        </Container>
    );
}
