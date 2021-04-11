import styled from 'styled-components';
import { theme } from './ThemeColor';

export const Container = styled.View`
  background-color: ${(props) => props.bgColor || 'white'};
  padding: 5px 20px;
`;

export const Card = styled.View`
  padding: 20px;
  background-color: white;
  border: 1px solid ${(props) => props.border || ` ${theme.line}`};
  border-radius: 16px;
  margin-right: ${(props) => props.mr || '0'};
  margin-top: ${(props) => props.mt || '0'};
  margin-bottom: ${(props) => props.mb || '0'};
  elevation: ${(props) => props.elevation || '0'};
`;

export const NavHeader = styled.View`
  padding: 0 20px;
  background-color: white;
  border-bottom-left-radius: 16;
  border-bottom-right-radius: 16;
  margin: ${(props) => props.m || '0'};
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: ${(props) => props.justify || 'flex-start'};
  /* align-items: flex-end; */
  flex-wrap: wrap;
  margin: ${(props) => props.m || '0'};
  margin-top: ${(props) => props.mt || '0'};
`;

export const CardInitial = styled.View`
  align-items: ${(props) => props.align || 'stretch'};
  padding: ${(props) => props.p || '20px'};
  border: 0.5px solid #dedede;
  background-color: white;
  border-radius: ${(props) => props.radius || '16px'};
  margin: ${(props) => props.m || '0'};
`;

export const TextInput = styled.TextInput`
  border-radius: 12;
  border: 1px solid ${theme.line};
  height: 48px;
  padding: 10px;
`;

export const Center = styled.View`
  align-items: center;
  justify-content: center;
`;

export const CardDashed = styled.View`
  border-bottom-style: dashed;
`;

export const Layout = styled.View`
  background-color: white;
  flex: 1;
`;
