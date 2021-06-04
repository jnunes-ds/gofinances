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
    const [CategoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });


    function handleTransactionTypeSelect(type: 'up' | 'down'){
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false);
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

                    <CategorySelectButton 
                        title="Categoria"
                        onPress={handleOpenSelectCategoryModal}
                    />
                </Fields>

                <Button title="Enviar"/>
            </Form>

            <Modal visible={CategoryModalOpen} >
                <CategorySelect 
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleCloseSelectCategoryModal}
                />  
            </Modal>

        </Container>
    );
}
