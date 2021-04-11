import styled from 'styled-components/native';
import { theme } from './ThemeColor';

export const Text = styled.Text`
  ${({ light, semibold, bold }) => {
    switch (true) {
      case bold:
        return 'font-family: "Mulish-Bold"';
      case semibold:
        return 'font-family: "Mulish-SemiBold"';
      case light:
        return 'font-family: "Mulish-Light"';
      default:
        return 'font-family: "Mulish-Regular"';
    }
  }}
  ${({ primary, secondary, labelColor, white }) => {
    switch (true) {
      case primary:
        return `color: ${theme.primary}`;
      case secondary:
        return `color: ${theme.secondary}`;
      case labelColor:
        return `color: ${theme.label}`;
      case white:
        return `color: ${theme.offwhite}`;
      default:
        return 'color: black';
    }
  }}
  ${({ center }) => {
    switch (true) {
      case center:
        return 'text-align: center';
      default:
        return 'text-align: left';
    }
  }}
  font-size: ${(props) => props.size || '14px'};
  margin: ${(props) => props.m || '0'};
  margin-top: ${(props) => props.mt || '0'};
  margin-bottom: ${(props) => props.mb || '0'};
  margin-right: ${(props) => props.mr || '0'};
  margin-left: ${(props) => props.ml || '0'};
  flex-wrap: wrap;
`;

export const TextLight = styled.Text`
  font-family: ${(props) => props.fontStyle || 'Mulish-Light'};
  font-size: ${(props) => props.size || '14px'};
  margin: ${(props) => props.m || '0'};
  color: ${(props) => props.color || 'black'};
  text-align: ${(props) => props.align || 'auto'};
`;

export const TextSemiBold = styled.Text`
  font-family: ${(props) => props.fontStyle || 'Mulish-SemiBold'};
  font-size: ${(props) => props.size || '14px'};
  margin: ${(props) => props.m || '0'};
  color: ${(props) => (props.primary ? '#5F2EEA' : 'black')};
  text-align: ${(props) => props.align || 'auto'};
`;

export const TextBold = styled.Text`
  font-family: ${(props) => props.fontStyle || 'Mulish-Bold'};
  font-size: ${(props) => props.size || '14px'};
  margin: ${(props) => props.m || '0'};
  text-align: ${(props) => props.align || 'auto'};
  color: ${(props) => props.color || 'black'};
`;

export const ErrorText = styled.Text`
  color: ${theme.error};
  font-size: 12px;
  font-family: 'Mulish-SemiBold';
`;
