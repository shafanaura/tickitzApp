import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import listMonth from '../utils/listMonth';
import listComingMovie from '../utils/listComingMovie';
import { Card, Center, Row } from '../styles/StyledComponent';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components';
import { Text } from '../styles/Typography';
import ButtonCustom from './ButtonCustom';

export class UpcomingMovie extends Component {
  state = {
    listComingMovie,
    listMonth
  };
  render() {
    return (
      <View>
        <Row justify="space-between">
          <Text bold size="18" mt="50">
            Upcoming Movies
          </Text>
          <Text semibold primary>
            view all
          </Text>
        </Row>
        <FlatList
          horizontal
          data={listMonth}
          keyExtractor={(item, index) => String(item.id)}
          renderItem={({ item }) => (
            <ButtonCustom size="small" mr="10" mw="100" mt="20" br="8">
              <Text white>{item.month}</Text>
            </ButtonCustom>
          )}
        />
        <FlatList
          horizontal
          data={listComingMovie}
          keyExtractor={(item, index) => String(item.id)}
          renderItem={({ item }) => (
            <Card mr="20" mt="20">
              <Center>
                <Image source={item.poster} />
                <Text semibold size="16" mt="10">
                  {item.title}
                </Text>
                <Text light size="12">
                  {item.genre}
                </Text>
              </Center>
              <ButtonCustom size="small" color="white" mt="40">
                <Text semibold primary>
                  Details
                </Text>
              </ButtonCustom>
            </Card>
          )}
        />
      </View>
    );
  }
}

const Image = styled.Image`
  height: 185;
  width: 122;
  border-radius: 8;
`;

export default UpcomingMovie;
