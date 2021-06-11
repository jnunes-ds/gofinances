import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { addMonths } from 'date-fns';

import { HistoryCard } from '../../Components/Cards';
import { categories } from '../../utils/categories';

import { useTheme } from 'styled-components';


import { RFValue } from 'react-native-responsive-fontsize';


import {
    Container,
    Header,
    Title,
    Content,
    ChartContainer,
} from './styles';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

interface TransactionData{
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface CategoryData{
    key: string;
    name: string;
    total: number;
    totalFormatted: string;
    color: string;
    percent: number;
    percentFormatted: string;
}


export function Resume(){
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([] as CategoryData[]);

    const theme = useTheme();

    async function loadData() {
        const dataKey = '@gofinance:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response!) : [];

        const expensives = responseFormatted
            .filter((expensive : TransactionData) => expensive.type === 'negative');
        
        const expensivesTotal = expensives
        .reduce((
            accumulator : number, 
            expensive : TransactionData
            ) => {
                return accumulator + Number(expensive.amount);
        }, 0);


        const totalByCategory : CategoryData[] = [];
        
        categories.forEach(category => {
            let categorySum = 0;

            expensives.forEach((expensive : TransactionData) => {
                if(expensive.category === category.key){
                    categorySum += Number(expensive.amount);
                }
            });

            if(categorySum > 0){
                const totalFormatted = categorySum
                    .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    });

                    const percent = (categorySum / expensivesTotal * 100);
                    const percentFormatted = `${percent.toFixed(1)}%`;

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total: categorySum,
                    totalFormatted,
                    percent,
                    percentFormatted
                });
            }
        });
        setTotalByCategories(totalByCategory);
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <Container>
            <Header>
                <Title>
                    Resumo por categoria
                </Title>
            </Header>
            <Content
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingBottom: useBottomTabBarHeight(),
                }}
            >
            <ChartContainer>
                <VictoryPie 
                    data={totalByCategories}
                    colorScale={
                        totalByCategories
                            .map(category => category.color)
                    }
                    style={{
                        labels: { 
                            fontSize: RFValue(18),
                            fontWeight: 'bold',
                            fill: theme.colors.shape
                         }
                    }}
                    labelRadius={50}
                    x="percentFormatted"
                    y="total"
                />
            </ChartContainer>
                {
                totalByCategories.map(item => (
                    <HistoryCard
                        key={item.key} 
                        title={item.name}
                        amount={item.totalFormatted}
                        color={item.color}
                    />
                ))
                }
            </Content>
        </Container>
    );
}