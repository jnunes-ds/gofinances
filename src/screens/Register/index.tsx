import React, { useState, useEffect } from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import AscyncStorage from '@react-native-async-storage/async-storage';

import { 
    Button,
    InputForm,
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
    TransactionsTypes,
 } from './styles';


 interface FormData {
     name: string;
     amount: string;
 }


 const schema = Yup.object().shape({
     name: Yup
            .string()
            .required('Nome é obrigatório'),
     amount: Yup
              .number()
              .typeError('Informe um valor numérico')
              .positive('O valor não pode ser negativo')
              .required('O valor é obrigatório')
 });



export function Register(){
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const dataKey = '@gofinance:transactions';


    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
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

    async function handleRegister(form: FormData){
        if(!transactionType) return Alert.alert('Selecione o tipo da transação');
        if(category.key === 'category') return Alert.alert('Selecione a categoria');

        const newTransaction = [{
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }];

        try{
            const data = await AscyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data!) : [];
            
            const dataFormatted = [
                ...currentData,
                newTransaction
            ];

            await AscyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
            
        }catch(error){
            console.log(error);
            Alert.alert('Não foi possível salvar');
        }
    }

    useEffect(() => {
        async function loadData(){
            const data = await AscyncStorage.getItem(dataKey);
            console.log(JSON.parse(data!));
        }

        loadData();
    },[])

    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
        >
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
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />
                        
                        <InputForm 
                            name="amount"
                            control={control}
                            placeholder="Preço"
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message}
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

                <Modal visible={categoryModalOpen} >
                    <CategorySelect 
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategoryModal}
                    />                
                </Modal>

            </Container>
        </TouchableWithoutFeedback>
    );
}
