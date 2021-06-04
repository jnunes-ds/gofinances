import React, { useState } from 'react';
import { Modal } from 'react-native';

import { 
    Button,
    Input,
    TransactionTypeButton,
    CategorySelectButton
 } from '../../Components/Form';

 import { CategorySelect } from '../CategorySelect';

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

                    <CategorySelectButton title="Categoria"/>
                </Fields>

                <Button title="Enviar"/>
            </Form>

            <Modal>
                <CategorySelect />  
            </Modal>

        </Container>
    );
}
