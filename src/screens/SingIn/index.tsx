import React, { useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';

import { useTheme } from 'styled-components';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';

import { useAuth } from '../../hooks/auth';

import { SingInSocialButton } from '../../Components/SingInSocialButton';

import{
    Container,
    Header,
    TitleWrapper,
    Title,
    SingInTitle,
    Footer,
    FooterWrapper
} from './styles';

export function SingIn(){
    const [isLoading, setIsLoading] = useState(false);
    const {
        singInWithGoogle,
        singInWithApple
    } = useAuth();

    const theme = useTheme();
    
    async function handleSignInWithGoogle(){
        try{
            setIsLoading(true);
            return await singInWithGoogle();
        }catch(error){
            console.log(error);
            Alert.alert('Não foi possívelconectar com a conta Google!')
        }finally{
            setIsLoading(false);
        }
    }

    async function handleSingInWithApple(){
        try {
            setIsLoading(true);
            return await singInWithApple();
        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possível conectar a conta Apple')
        }finally{
            setIsLoading(false);
        }
    }


    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg 
                        width={RFValue(120)}
                        height={RFValue(68)}
                    />
                    <Title>
                        Controle suas{'\n'}
                        finanças de forma{'\n'}
                        muito simples
                    </Title>
                </TitleWrapper>
                <SingInTitle>
                    Faça seu login com{'\n'}
                    uma das contas abaixo
                </SingInTitle>
            </Header>
            <Footer>
                <FooterWrapper>
                    <SingInSocialButton 
                        title="Entrar com Google"
                        svg={GoogleSvg}
                        onPress={handleSignInWithGoogle}
                    />
                    <SingInSocialButton 
                        title="Entrar com Apple"
                        svg={AppleSvg}
                        onPress={handleSingInWithApple}
                    />
                </FooterWrapper>
                { 
                    isLoading && 
                    <ActivityIndicator 
                        color={theme.colors.shape}
                        style={{ marginTop: 18 }} 
                    /> 
                }

            </Footer>
        </Container>
    );
}