import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/ThemeColor';

const ButtonCustom = (props) => {
  const { children } = props;
  return <Button {...props}>{children}</Button>;
};

const Button = styled.TouchableOpacity`
  padding: ${({ size }) => handleSizeType(size)};
  border-radius: ${(props) => props.br || '12px'};
  elevation: ${(props) => props.elevation || '0'};
  align-items: center;
  background-color: ${({ color }) => handleColorType(color)};
  border: 2px solid ${({ variant }) => handleColorType(variant)};
  margin: ${(props) => props.m || '0'};
  margin-top: ${(props) => props.mt || '0'};
  margin-bottom: ${(props) => props.mb || '0'};
  margin-right: ${(props) => props.mr || '0'};
  margin-left: ${(props) => props.ml || '0'};
  min-width: ${(props) => props.mw || '0'};
`;

const handleSizeType = (padding) => {
  switch (padding) {
    case 'large':
      return '17px';
    case 'small':
      return '6px';
    default:
      return '8px';
  }
};

const handleColorType = (color) => {
  switch (color) {
    case 'white':
      return `${theme.offwhite}`;
    case 'danger':
      return `${theme.danger}`;
    case 'success':
      return `${theme.success}`;
    case 'transparent':
      return 'transparent';
    default:
      return `${theme.primary}`;
  }
};

export default ButtonCustom;
