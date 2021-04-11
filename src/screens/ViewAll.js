import React, { Component } from 'react';
import { FlatList, View, TouchableOpacity, StyleSheet } from 'react-native';
import listMonth from '../utils/listMonth';
import listComingMovie from '../utils/listComingMovie';
import { Card, Center, Container, Row } from '../styles/StyledComponent';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components';
import { Text } from '../styles/Typography';
import ButtonCustom from '../components/ButtonCustom';
import { connect } from 'react-redux';
import {
  getSortMovie,
  getSearchMovie,
  getOrderMovie,
  getAllMovie
} from '../redux/actions/movie';
import { withNavigation } from 'react-navigation';
import FormInput from '../components/Form/FormInput';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';
import http from '../helpers/http';

export class ViewAll extends Component {
  state = {
    search: '',
    sort: '',
    order: ''
  };
  async componentDidMount() {
    await this.props.getAllMovie();
  }
  gotoDetail = (id) => {
    this.props.navigation.navigate('movie-detail');
  };
  changeText = async (search) => {
    await this.setState(this.props.getSearchMovie(search));
  };
  changeSort = async (sort) => {
    await this.setState({ sort: sort });
    await this.props.getSortMovie(this.state.sort);
  };
  changeOrder = async (order) => {
    await this.setState({ order: order });
    await this.props.getOrderMovie(this.state.order);
  };
  render() {
    const { movie } = this.props;
    return (
      <Container bgColor="transparent">
        <TextInput
          name="search"
          placeholder="Search Movie"
          onChangeText={this.changeText}
        />
        <Row>
          <Picker
            style={styles.picker}
            selectedValue={this.state.order}
            onValueChange={this.changeOrder}>
            <Picker.Item label="Order by" />
            <Picker.Item label="⏫ Ascending" value="ASC" />
            <Picker.Item label="⏬ Descending" value="DESC" />
          </Picker>
          <Picker
            style={styles.picker}
            selectedValue={this.state.sort}
            onValueChange={this.changeSort}>
            <Picker.Item label="Sort by" />
            <Picker.Item label="Title" value="title" />
            <Picker.Item label="Duration" value="duration" />
            <Picker.Item label="Release Date" value="releaseDate" />
          </Picker>
        </Row>
        <FlatList
          data={movie.movies}
          keyExtractor={(item, index) => String(item.id)}
          renderItem={({ item }) => (
            <Card mr="20" mt="10">
              <Center>
                <Image source={{ uri: item.picture }} />
                <Text semibold size="16" mt="10">
                  {item.title}
                </Text>
                <Text mt="10">
                  Release Date: {moment(item.releaseDate).format('D MMMM YYYY')}
                </Text>
                <Text>
                  Duration:{' '}
                  {moment.duration(item.duration).format('h[h] m [min]')}
                </Text>
              </Center>
              <ButtonCustom
                onPress={() =>
                  this.props.navigation.navigate('movie-detail', {
                    getItem: item
                  })
                }
                size="small"
                color="white"
                mt="20">
                <Text semibold primary>
                  Details
                </Text>
              </ButtonCustom>
            </Card>
          )}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  picker: {
    flex: 1
  }
});

const Image = styled.Image`
  height: 185;
  width: 122;
  border-radius: 8;
`;
const TextInput = styled.TextInput`
  background-color: white;
  padding: 10px 20px;
  border-radius: 12;
  elevation: 2;
  margin: 10px 0;
`;

const mapStateToProps = (state) => ({
  movie: state.movie
});

const mapDispatchToProps = {
  getSortMovie,
  getSearchMovie,
  getOrderMovie,
  getAllMovie
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(ViewAll)
);
