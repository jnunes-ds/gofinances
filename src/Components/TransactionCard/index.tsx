import React from 'react';

import { 
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date,
 } from './styles';

 interface CategoryProps{
    name: string;
    icon: string;
 }
 interface Props {
     title: string;
     amount: string;
     category: CategoryProps;
     date: string;
 }

export function TransactionCard({
    title,
    amount,
    category,
    date
}: Props){
    return (
        <Container>
            <Title>{title}</Title>

            <Amount>{amount}</Amount>

            <Footer>
                <Category>
                    <Icon name="dollar-sign"/>
                    <CategoryName>{category.name}</CategoryName>
                </Category>
                
                <Date>{date}</Date>
            </Footer>
        </Container>
    );
}