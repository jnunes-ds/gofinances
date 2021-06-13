import React from 'react';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';

import{
    Container,
    Header,
    TitleWrapper,
    Title,
    SingInTitle,
    Footer,
} from './styles';

export function SingIn(){
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

            </Footer>
        </Container>
    );
}