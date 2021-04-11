import React, { Fragment, Component } from 'react';
import * as ImagePicker from 'react-native-image-picker';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { updateUser } from '../redux/actions/auth';
import { getUserDetail } from '../redux/actions/user';
import * as yup from 'yup';
import styled from 'styled-components';
import AlertCustom from '../components/AlertCustom';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filepath: {
        data: '',
        uri: ''
      },
      fileData: '',
      fileUri: '',
      message: ''
    };
  }

  componentDidMount() {
    this.props.getUserDetail(
      this.props.auth.token,
      this.props.auth.userData.id
    );
  }
  chooseImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' }
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const image = {
          uri: response.uri,
          type: response.type,
          name: response.fileName
        };
        this.props.updateUser(
          this.props.auth.token,
          this.props.auth.userData.id,
          { picture: image }
        );
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });

        if (this.props.auth.message !== '') {
          this.setState({
            message: this.props.auth.message
          });
        } else {
          this.setState({ message: this.props.auth.errorMsg });
        }
      }
    });
  };

  launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const image = {
          uri: response.uri,
          type: response.type,
          name: response.fileName
        };
        this.props.updateUser(
          this.props.auth.token,
          this.props.auth.userData.id,
          { picture: image }
        );
        if (this.props.auth.message !== '') {
          this.setState({
            message: this.props.auth.message
          });
        } else {
          this.setState({ message: this.props.auth.errorMsg });
        }
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
      }
    });
  };

  renderFileData() {
    if (this.state.fileData) {
      return (
        <Image
          source={{ uri: this.props.user.userDetail.picture }}
          style={styles.images}
        />
      );
    } else {
      return (
        <Image
          source={{ uri: this.props.user.userDetail.picture }}
          style={styles.images}
        />
      );
    }
  }

  renderFileUri() {
    const { userDetail } = this.props.user;
    if (this.state.fileUri) {
      return (
        <Image source={{ uri: this.state.fileUri }} style={styles.images} />
      );
    } else {
      return (
        <Image source={{ uri: userDetail.picture }} style={styles.images} />
      );
    }
  }
  render() {
    const { userDetail } = this.props.user;
    return (
      <Fragment>
        <SafeAreaView>
          <View style={styles.body}>
            <View style={styles.ImageSections}>
              <View>{this.renderFileUri()}</View>
            </View>
            <NameText>{userDetail.fullName}</NameText>
            <TypeText>Moviegoers</TypeText>
            {this.state.message !== '' && (
              <AlertCustom status="success" message={this.state.message} />
            )}
            <View style={styles.btnParentSection}>
              <TouchableOpacity
                onPress={this.chooseImage}
                style={styles.btnSection}>
                <Text style={styles.btnText}>Choose File</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={this.launchCamera}
                style={styles.btnSection}>
                <Text style={styles.btnText}>Directly Launch Camera</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'yellow'
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center'
  },
  images: {
    width: 150,
    height: 150,
    marginHorizontal: 3,
    borderRadius: 100
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold'
  }
});

const NameText = styled.Text`
  font-family: 'Mulish-Semibold';
  font-size: 20px;
  margin: 10px 0;
  text-align: center;
`;
const TypeText = styled.Text`
  font-family: 'Mulish-Light';
  margin-bottom: 30px;
  text-align: center;
`;

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user
});

const mapDispatchToProps = {
  updateUser,
  getUserDetail
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);
