import React from 'react';

import { Input } from '../../Components/Form/Input';
import { Button } from '../../Components/Form/Button';

import { 
    Container,
    Header,
    Title,
    Form
 } from './styles';



export function Register(){
    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Input 
                    placeholder="Nome"
                />
                
                <Input 
                    placeholder="Preço"
                />

                <Button title="Enviar"/>
            </Form>

        </Container>
    );
}
