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

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

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

    function handleRegister(){
        const data = {
            name,
            amount,
            transactionType,
            category: category.key
        };

        console.log(data);
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
                        onChangeText={setName}
                    />
                    
                    <Input 
                        placeholder="Preço"
                        onChangeText={setAmount}
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
                        title={category.name}
                        onPress={handleOpenSelectCategoryModal}
                    />
                </Fields>

                <Button 
                    title="Enviar"
                    onPress={handleRegister}
                />
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
