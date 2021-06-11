import styled from "styled-components/native";
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    background-color: ${ ({ theme }) => theme.colors.background };
    flex: 1;
`;

export const Header = styled.View`
    background-color: ${ ({ theme }) => theme.colors.primary };

    width: 100%;
    height: ${RFValue(113)}px;

    align-items: center;
    justify-content: flex-end;
    padding-bottom: ${RFValue(19)}px;
`;

export const Title = styled.Text`
    font-family: ${ ({ theme }) => theme.fonts.regular };
    color: ${ ({ theme }) => theme.colors.shape };
    
    font-size: ${RFValue(18)}px;
`;

export const Content = styled.ScrollView``;

export const ChartContainer = styled.View`
    width: 100%;
    align-items: center;
`;
