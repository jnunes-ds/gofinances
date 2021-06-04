import React, { useState } from 'react';

import { 
    Button,
    Input,
    TransactionTypeButton,
    CategorySelect
 } from '../../Components/Form';

import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes
 } from './styles';



export function Register(){
    const [transactionType, setTransactionType] = useState('');

    function handleTransactionTypeSelect(type: 'up' | 'down'){
        setTransactionType(type);
    }

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    <Input 
                        placeholder="Nome"
                    />
                    
                    <Input 
                        placeholder="Preço"
                    />

                    <TransactionsTypes>
                        <TransactionTypeButton 
                            type="up"
                            title="Income"
                            onPress={() => handleTransactionTypeSelect('up')}
                            isActive={transactionType === 'up'}
                        />
                        <TransactionTypeButton 
                            type="down"
                            title="Outcome"
                            onPress={() => handleTransactionTypeSelect('down')}
                            isActive={transactionType === 'down'}
                        />
                    </TransactionsTypes>

                    <CategorySelect title="Categoria"/>
                </Fields>

                <Button title="Enviar"/>
            </Form>

        </Container>
    );
}
