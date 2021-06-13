import React from 'react';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';

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
                    />
                    <SingInSocialButton 
                        title="Entrar com Apple"
                        svg={AppleSvg}
                    />
                </FooterWrapper>

            </Footer>
        </Container>
    );
}