import {DefaultTheme} from '@react-navigation/native';

export const ColorsTheme = {
  dark: false,
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // colors
    primary: '#5F2EEA',
    secondary: '#1CC8EE',
    error: '#ED2E7E',
    success: '#00BA88',
    warning: '#F4B740',
    // typography color
    title: '#14142B',
    body: '#4E4B66',
    label: '#6E7191',
    placeholder: '#A0A3BD',
    line: '#DEDEDE',
    inputbg: '#EFF0F6',
    bg: '#F7F7FC',
    offwhite: '#FCFCFC',
  },
};
