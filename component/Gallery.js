import React, { useState, forwardRef, useEffect, useImperativeHandle } from 'react'
import Slide from '../custom/Slide'
import {
  Text,
  Modal,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  BackHandler
} from 'react-native'
import Swiper from './Swiper'
import Slide from './Slide'

const Gallery = forwardRef((props, ref) => {


  useImperativeHandle(ref, () => ({
    open: () => {

    },
    close: () => {

    }
  }))

  return (
    <Slide>

    </Slide>
  )

})

Gallery.defaultProps = {
  backgroundColor: '#ffffff'
}

export default Gallery


const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})


import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CameraRoll from '@react-native-community/cameraroll';

class ShowGalleryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      choosedItem: [],
      pageSize: 20,
      page: 1,
      status: null,
      flag: 0,
      multiple: this.props.navigation.getParam('multiple'),
      index: this.props.navigation.getParam('index'),
    };
  }

  loadImage = async () => {
    await this.setState({ page: 1 })
    const imageData = await CameraRoll.getPhotos({
      first: 50,
      assetType: 'Photos',
    })
      .then((image) => {
        return image;
      })
      .catch((err) => {
        Alert.alert(
          'Thông báo',
          'Không thể truy cập vào dữ liệu ảnh. Vui lòng cấp quyền cho ứng dụng',
          [{ text: 'OK', onPress: () => this.props.navigation.goBack() }],
          { cancelable: false },
        )
      });

    this.setState(
      {
        data: imageData.edges,
        page: ++this.state.page,
      },
      () => {
        this.state.data.forEach((data) => {
          Object.assign(data, { status: false });
        });
        this.checkSelectedImage()
      },
    );
  };

  async componentDidMount() {
    await this.setState({
      choosedItem: this.props.navigation.getParam('selectedImage')
    })
    await this.loadImage()
  }

  _renderItem = (item) => {
    const { data, multiple } = this.state;
    return (
      <TouchableOpacity
        style={item.status ? styles.itemChoosing : styles.item}
        onPress={() => {
          if (multiple) {
            item.status = !item.status
            if (item.status) {
              if (this.state.choosedItem.length >= this.props.navigation.getParam('maximumImage')) {
                Alert.alert(
                  'Thông báo',
                  `Số lượng ảnh tối đa là ${this.props.navigation.getParam('maximumImage')} ảnh`,
                  [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                  { cancelable: false },
                )
                item.status = !item.status
              } else {
                this.setState({
                  choosedItem: [...this.state.choosedItem, item],
                });
              }

            } else {
              let array = this.state.choosedItem;
              let index = this.state.choosedItem.findIndex(ele => ele.node.image.uri === item.node.image.uri);
              array.splice(index, 1);
              this.setState({
                choosedItem: array,
              });
            }
          } else {
            data.forEach((data) => {
              data.status = false;
            });
            item.status = !item.status;
            this.setState({
              choosedItem: [item],
            });
          }
        }}>
        <Image
          style={
            item.status ? styles.imageStyleChoosed : styles.imageStyle
          }
          source={{ uri: item.node.image.uri }}
        />
        {item.status && (
          <View
            style={{
              position: 'absolute',
              right: Sizes.s15,
              bottom: Sizes.s15,
              backgroundColor: '#fff',
              borderRadius: Sizes.s40,
              padding: Sizes.s2,
            }}>
            <Icon
              name={'check-circle'}
              color="#0A84FF"
              size={Sizes.s40}
              solid
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  loadMoreData = async () => {
    const moreImage = await CameraRoll.getPhotos({
      first: 50 * this.state.page,
      assetType: 'Photos',
    })
      .then((image) => {
        return image;
      })
      .catch((err) => {
      });

    moreImage.edges.splice(0, 50 * (this.state.page - 1));

    this.setState({
      data: this.state.data.concat(moreImage.edges),
      page: ++this.state.page,
    }, () => this.checkSelectedImage());
  };

  submitAvatar = () => {
    if (this.state.choosedItem.length > this.props.navigation.getParam('maximumImage')) {
      Alert.alert(
        'Thông báo',
        `Số lượng ảnh tối đa là ${this.props.navigation.getParam('maximumImage')} ảnh`,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
      )
    } else {
      this.props.navigation.state.params.returnData({
        index: this.state.index,
        selectedImage: this.state.choosedItem,
      });
      this.props.navigation.goBack();
    }
  };

  returnData = async (data) => {
    await this.loadImage();

    if (this.state.multiple) {
      for (let i = 0; i < data.selectedImage.length; i++) {
        this.state.data[i].status = true;
        this.setState({
          choosedItem: [...this.state.choosedItem, this.state.data[i]],
        });
      }
    } else {
      let index = this.state.data.findIndex(item => this.state.choosedItem[0].node.image.uri === item.node.image.uri)
      this.state.data[index].status = false
      this.state.data[0].status = true;
      this.setState({
        choosedItem: [this.state.data[0]],
      });
    }
  };

  checkSelectedImage = () => {
    for (const item of this.state.choosedItem) {
      let index = this.state.data.findIndex(ele => {
        return ele.node.image.uri === item.node.image.uri
      })
      if (index !== -1) {
        this.state.data[index].status = true
      }
    }
  }

  render() {
    const { data, status, flag } = this.state;
    return (
      <View style={styles.root}>
        <FlatList
          data={[0, ...data]}
          extraData={this.state}
          renderItem={({ item, index }) => {
            if (index === 0) {
              return (
                <TouchableOpacity
                  style={{
                    width: Dimensions.get('window').width / 3,
                    height: Dimensions.get('window').width / 3,
                    justifyContent: 'center',
                    backgroundColor: '#00000066',
                  }}
                  onPress={() => {
                    this.props.navigation.navigate('Camera', {
                      multiple: this.state.multiple,
                      returnData: this.returnData.bind(this),
                    });
                  }}>
                  <Icon
                    name="camera"
                    size={30}
                    color={Colors.title}
                    style={{
                      alignSelf: 'center',
                    }}
                  />
                </TouchableOpacity>
              );
            } else {
              return this._renderItem(item);
            }
          }}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          onMomentumScrollEnd={() => this.loadMoreData()}
        />
      </View>
    );
  }
}

export default ShowGalleryComponent;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    height: 55,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  containerIcon: {
    height: 55,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginHorizontal: 10,
    position: 'absolute',
    left: 10,
    top: 0,
  },
  containerText: {
    height: 55,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  title: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: Sizes.s35,
    color: Colors.title,
  },
  chooseTextContainer: {
    height: 55,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 20,
    top: 0,
  },
  chooseText: {
    alignSelf: 'center',
    fontSize: Sizes.s30,
    color: '#0A84FF',
  },
  item: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    justifyContent: 'center',
  },
  itemChoosing: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    borderWidth: 1,
    borderColor: '#0A84FF',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  imageStyleChoosed: {
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
});
