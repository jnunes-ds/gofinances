import React, { useState } from 'react';
import { Modal } from 'react-native';
import { useForm } from 'react-hook-form';

import { 
    Button,
    Input,
    TransactionTypeButton,
    CategorySelectButton
 } from '../../Components/Form';
 import { InputForm } from '../../Components/Form/InputForm';

 import { CategorySelect } from '../CategorySelect';

import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes
 } from './styles';


 interface FormData {
     name: string;
     amount: string;
 }



export function Register(){
    const [transactionType, setTransactionType] = useState('');
    const [CategoryModalOpen, setCategoryModalOpen] = useState(false);


    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    const {
        control,
        handleSubmit
    } = useForm();


    function handleTransactionTypeSelect(type: 'up' | 'down'){
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false);
    }

    function handleRegister(form: FormData){
        const data = {
            name: form.name,
            amount: form.amount,
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
                    <InputForm
                        name="name"
                        control={control} 
                        placeholder="Nome"
                    />
                    
                    <InputForm 
                        name="amount"
                        control={control}
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
                        title={category.name}
                        onPress={handleOpenSelectCategoryModal}
                    />
                </Fields>

                <Button 
                    title="Enviar"
                    onPress={handleSubmit(handleRegister)}
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
