import React, {Component} from 'react';
import {Text} from '../styles/Typography';
import styled from 'styled-components';
import {Card, Row} from '../styles/StyledComponent';
import {connect} from 'react-redux';
import {getAllMovie} from '../redux/actions/movie';
import {FlatList, TouchableOpacity, View} from 'react-native';

export class NowShowing extends Component {
  async componentDidMount() {
    this.props.getAllMovie();
  }
  gotoDetail = id => {
    this.props.navigation.navigate('movie-detail', {});
  };
  getId = id => {
    console.log(id);
  };
  render() {
    const {movie} = this.props;
    return (
      <View>
        <Row justify="space-between" m="10px 0">
          <Text bold size="18">
            Now Showing
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('view-all')}>
            <Text semibold primary>
              view all
            </Text>
          </TouchableOpacity>
        </Row>
        <FlatList
          horizontal
          data={movie.movies}
          keyExtractor={(item, index) => String(item.id)}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('movie-detail', {
                  getItem: item,
                })
              }>
              <Card mr="20" mt="10">
                <Image source={{uri: item.picture}} />
              </Card>
            </TouchableOpacity>
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
const mapStateToProps = state => ({
  movie: state.movie,
});

const mapDispatchToProps = {
  getAllMovie,
};

export default connect(mapStateToProps, mapDispatchToProps)(NowShowing);
