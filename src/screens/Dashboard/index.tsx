import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components'; 
import { useAuth } from '../../hooks/auth';


import { 
    HighlightCard,
    TransactionCard, 
    TransactionProps 
} from '../../Components/Cards';

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
import id from 'date-fns/esm/locale/id/index.js';
export interface DataListProps extends TransactionProps{
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
    
    const theme = useTheme();
    const { singOut, user } = useAuth();
    
    const dataKey = `@gofinance:transactions_user:${user.id}`;
    
    async function loadTransactions(){
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];


        const getLastTransactionDate = (
            collection : DataListProps[], 
            type : 'positive' | 'negative'
        ) => {
            const collectionFiltered = collection
                .filter((transaction) => transaction.type === type)

                if(collectionFiltered.length === 0){
                    return 0;
                }

            const lastTransactions = Math.max.apply(
                Math, collectionFiltered
                    .map((transaction) => new Date(transaction.date).getTime())
            );

            const DATE = new Date(lastTransactions)
            .toLocaleString('pt-BR', {
                day: '2-digit',
                month: 'long'
            })

            return DATE;
        }

        const getLastTransactionTotal = (
            lastDate1 : string | number, 
            lastDate2 : string | number
        ) => {
            let lastDateTotal;
            if(lastDate1 === 0 && lastDate2 === 0){
                lastDateTotal = 0;
            }else if(lastDate1 === 0 || lastDate2 === 0){
                lastDateTotal = lastDate1 === 0
                    ? lastDate2 : lastDate1
            }else{
                lastDateTotal = lastDate1 >= lastDate2
                    ? lastDate1 : lastDate2 
            }
            return lastDateTotal;
        }

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

                const date = new Date(item.date)
                    .toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit'
                    })
                
                
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
            
            const lastTransactionTotal = getLastTransactionTotal(lastTransactionEntries, lastTransactionExpensive);


            const total = entresTotal - expensiveTotal;
                
            setHighlightData({
                entries: {
                    amount: entresTotal
                    .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }),
                    LastTransaction: lastTransactionEntries === 0
                    ? "Não há entradas"
                    : `Última entrada dia ${lastTransactionEntries}`
                },
                expensives: {
                    amount: expensiveTotal
                    .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }),
                    LastTransaction: lastTransactionExpensive === 0
                    ? "Não há saídas"
                    : `Última saída dia ${lastTransactionExpensive}`
                },
                total: {
                    amount: total
                    .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }),
                    LastTransaction: (lastTransactionTotal === 0)
                        ? "Não há transações"
                        : `Última operação dia ${lastTransactionTotal}`
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
                            <Photo source={{ uri: `${user.photo}` }}/>
                            
                            <User>
                                <UserGreeting>Olá, </UserGreeting>
                                <UserName> { user.name } </UserName>
                            </User>
                        </UserInfo>

                        <LogoutButton onPress={singOut}>
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
