import React from 'react';
import { categories } from '../../../utils/categories';

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

 export interface TransactionProps {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: CategoryProps | string;
    date: string;
 }

 interface Props {
     data: TransactionProps;
 }

export function TransactionCard({ data }: Props){
    const [ category ] = categories.filter(item => {
        let currentItem = String(data.category);
        if(item.key === currentItem){
            return item;
        }
    });

    return (
        <Container>
            <Title>{data.name}</Title>

            <Amount type={data.type} >
                {data.type === 'negative' && '-'} {data.amount}
            </Amount>

            <Footer>
                <Category>
                    <Icon name={category.icon}/>
                    <CategoryName>{category.name}</CategoryName>
                </Category>

                <Date>{data.date}</Date>
            </Footer>
        </Container>
    );
}