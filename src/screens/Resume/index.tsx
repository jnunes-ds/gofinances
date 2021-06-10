import React from 'react';
import { HistoryCard } from '../../Components/Cards';

import {
    Container,
    Header,
    Title
} from './styles';

export function Resume(){
    return (
        <Container>
            <Header>
                <Title>
                    Resumo por categoria
                </Title>
            </Header>

            <HistoryCard />
        </Container>
    );
}