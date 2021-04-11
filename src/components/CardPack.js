import React from 'react';
import { View } from 'react-native';
import { TextSemiBold } from '../styles/Typography';
import { CardInitial, Container } from '../styles/StyledComponent';

const CardPack = (props) => {
  const { title, children } = props;
  return (
    <View>
      <TextSemiBold size="18" m="20px 0px">
        {title}
      </TextSemiBold>
      <CardInitial>{children}</CardInitial>
    </View>
  );
};

export default CardPack;
