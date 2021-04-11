import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { theme } from '../styles/ThemeColor';
import { Text } from '../styles/Typography';

const AlertCustom = (props) => {
  return (
    <Alert {...props}>
      <Text semibold>{props.message}</Text>
    </Alert>
  );
};

const Alert = styled.View`
  padding: 20px;
  height: 50px;
  background-color: ${({ status }) => handleColorType(status)};
  border-radius: 12px;
  opacity: 0.5;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const handleColorType = (status) => {
  switch (status) {
    case 'success':
      return `${theme.success}`;
    case 'warning':
      return `${theme.warning}`;
    default:
      return 'transparent';
  }
};

export default AlertCustom;
