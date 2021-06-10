import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components'; 

import { TransactionCard, TransactionCardProps } from '../../Components/TransactionCard/index';

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
    LogoutButton,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionList,
    LoadContainer
 } from './styles';
export interface DataListProps extends TransactionCardProps{
    id: string;
}

interface HighlightProps{
    amount: string;
    LastTransaction: string;
};
interface HighlightData{
    entries: HighlightProps;
    expensives: HighlightProps;
    total: HighlightProps;
};

export function Dashboard(){
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]); 
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);
    const dataKey = '@gofinance:transactions';

    const theme = useTheme();

    function getLastTransactionDate(
        collection : DataListProps[], 
        type : 'positive' | 'negative'
    ){
        const lastTransactions = Math.max.apply(
                Math, transactions
                    .filter((transaction) => transaction.type === 'positive')
                    .map((transaction) => new Date(transaction.date).getTime())
            );

            return Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: 'long'
            }).format(new Date(lastTransactions));
    }
    
    async function loadTransactions(){
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entresTotal = 0;
        let expensiveTotal = 0;

        try{
            const transactionsFormatted: DataListProps[] =  transactions
            .map((item: DataListProps) => {

                if(item.type === 'positive'){
                    entresTotal += Number(item.amount);
                }else{
                    expensiveTotal += Number(item.amount);
                }

                const amount = Number(item.amount)
                    .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    });

                const date = Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                }).format(new Date(item.date));
                
                
                return {
                    id: item.id,
                    name: item.name,
                    amount,
                    type: item.type,
                    category: item.category,
                    date
                } 
            });
            setTransactions(transactionsFormatted);

            const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
            const lastTransactionExpensive = getLastTransactionDate(transactions, 'negative');


            const total = entresTotal - expensiveTotal;

            setHighlightData({
                entries: {
                    amount: entresTotal
                    .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }),
                    LastTransaction: `Última entrada dia ${lastTransactionEntries}`
                },
                expensives: {
                    amount: expensiveTotal
                    .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }),
                    LastTransaction: `Última saída dia ${lastTransactionExpensive}`
                },
                total: {
                    amount: total
                    .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }),
                    LastTransaction: `Última operação dia ${(lastTransactionEntries >= lastTransactionExpensive)
                        ? String(lastTransactionEntries) : lastTransactionExpensive}`
                }
            });

            setIsLoading(false);
        }catch(error){
            console.log(error);
        }
        

    }

    // const removeAll = async () => {
    //     try {
    //         await AsyncStorage.removeItem(dataKey);
    //     } catch(e) {
    //         console.log(e);
    //     }

    //     console.log('Done.')
    // }

    useEffect(() => {
        loadTransactions();
        // removeAll();
    }, []);

    useFocusEffect(useCallback(() => {
        loadTransactions();
    },[]));

    return (
        <Container>
            {
            isLoading 
            ? <LoadContainer> 
                <ActivityIndicator 
                    size="large"
                    color={theme.colors.primary}
                /> 
              </LoadContainer> 
            : <>
                <Header>
                    <UserWrapper>
                        <UserInfo>
                            <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/68449430?v=4' }}/>
                            
                            <User>
                                <UserGreeting>Olá, </UserGreeting>
                                <UserName>Júnior</UserName>
                            </User>
                        </UserInfo>

                        <LogoutButton onPress={() => {}}>
                            <Icon name="power"/>
                        </LogoutButton>
                    </UserWrapper>
                </Header>

                <HighlightCards>
                    <HighlightCard 
                        type="up"
                        title="Entradas"
                        amount={highlightData.entries.amount}
                        lastTransaction={highlightData.entries.LastTransaction}
                    />
                    <HighlightCard
                        type="down" 
                        title="Saídas"
                        amount={highlightData.expensives.amount}
                        lastTransaction={highlightData.expensives.LastTransaction}
                    />
                    <HighlightCard 
                        type="total"
                        title="Total"
                        amount={highlightData.total.amount}
                        lastTransaction={highlightData.total.LastTransaction}
                    />
                </HighlightCards>

                <Transactions>
                    <Title>Listagem</Title>

                    <TransactionList 
                        data={transactions}
                        keyExtractor={ item => item.id }
                        renderItem={ ({ item }) => (
                            <TransactionCard 
                                data={item}
                            />
                        ) }
                    />

                </Transactions>
            </>
            }
        </Container>
    );
}
