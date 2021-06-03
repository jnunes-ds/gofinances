import React from 'react';

import { TransactionCard } from '../../Components/TransactionCard/index';
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
    HighlightCards,
    Transactions,
    Title,
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

            <HighlightCards>
                <HighlightCard 
                    type="up"
                    title="Entradas"
                    amount="R$ 17.400,00"
                    lastTransaction="Última entrada dia 13 de Abril"
                />
                <HighlightCard
                    type="down" 
                    title="Saídas"
                    amount="R$ 1.259,00"
                    lastTransaction="Última saída dia 03 de Abril"
                />
                <HighlightCard 
                    type="total"
                    title="Total"
                    amount="R$ 16.141,00"
                    lastTransaction="01 à 16 de abril"
                />
            </HighlightCards>

            <Transactions>
                <Title>Listagem</Title>

                <TransactionCard 
                    title="Desenvolvimento de site"
                    amount="R$ 12.000,00"
                    category={{
                        name: 'vendas',
                        icon: 'dollar-sign'
                    }}
                    date="13/04/2020"
                />
            </Transactions>

        </Container>
    );
}
