import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  Animated
} from 'react-native'

import color from '../assets/color'
import { width, height } from '../assets/size'
const Select = (props) => {
  let [showSelect, setShowSelect] = useState(false)
  let [selectedItem, setSelectedItem] = useState(
    props.defaultValue !== undefined ? props.defaultValue : undefined
  );
  const { listItem } = props
  _animatedSlideUp = new Animated.Value(showSelect ? 0 : 1);

  const time = props.time

  // useEffect(() => {
  //   if (showSelect) {
  //     handleOpen()
  //   } else {
  //     handleClose()
  //   }
  // }, [showSelect])

  handleOpen = async () => {
    await setShowSelect(true)
    Animated.timing(_animatedSlideUp, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false
    }).start()
  }

  handleClose = (callback) => {
    Animated.timing(_animatedSlideUp, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false
    }).start()
    setTimeout(async () => {
      setShowSelect(false)
      await callback()
    }, time)
  }

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          borderBottomWidth: 0.5,
          width: width * 0.9,
          marginHorizontal: 10,
          alignItem: 'center',
          justifyContent: 'center',
          borderColor: color.placeholder,
        }}>
        <TouchableOpacity
          onPress={async () => {
            handleClose(() => {
              setSelectedItem(item)
              props.onChooseItem(item)
            })
          }}>
          <Text
            style={{
              fontSize: props.size,
              paddingVertical: 15,
              color: color.normalText,
            }}>
            {item.label !== undefined ? item.label : item}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };




  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity
        style={{
          borderBottomColor: selectedItem === undefined ? color.placeholder : color.normal,
          borderBottomWidth: 2,
          flexDirection: 'row',
        }}
        onPress={() => handleOpen()}
      >
        <Text style={{
          paddingVertical: 10,
          paddingRight: 15,
          paddingLeft: 5,
          color: selectedItem === undefined ? color.placeholder : color.normalText,
          fontSize: props.size
        }}>
          {selectedItem !== undefined ? selectedItem.label : props.placeholder}
        </Text>
        <Image
          style={styles.icon}
          source={require('../assets/images/ic_arrowdown.png')}
        />
      </TouchableOpacity>

      <Modal animationType='none' transparent={true} visible={showSelect}>
        <TouchableWithoutFeedback
          onPress={() => { handleClose() }}>
          <View style={{
            backgroundColor: color.popupBackground,
            flex: 1,
            width: '100%',
            justifyContent: 'flex-end',
            alignItem: 'center',
          }}>
            <Animated.View
              disabled={true}
              style={{
                transform: [{
                  translateY: _animatedSlideUp.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1000, 0],
                  })
                }],
                width: '100%',
                backgroundColor: '#ffffff',
                alignSelf: 'center',
                borderRadius: 15,
                maxHeight: height * 0.5,
                minHeight: height * 0.2,
              }}>
              <View
                style={{
                  borderBottomWidth: 0.5,
                  width: width,
                  justifyContent: 'center',
                  borderColor: color.placeholder,
                  flexDirection: 'row'
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: props.size,
                      paddingVertical: 15,
                      alignSelf: 'center',
                      color: color.normalText,
                      fontWeight: 'bold'
                    }}>
                    {props.placeholder}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    position: 'absolute',
                    right: 10,
                    height: '100%'
                  }}
                  onPress={() => setShowSelect(!showSelect)}
                >
                  <Image
                    style={{
                    }}
                    source={require('../assets/images/ic_close.png')}
                  />
                </TouchableOpacity>
              </View>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={listItem}
                keyExtractor={(item, index) => { index.toString() }}
                renderItem={(item, index) => renderItem(item, index)}
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  backgroundColor: '#ffffff',
                  width: '100%',
                  maxHeight: height * 0.4,
                }}
                contentContainerStyle={{
                  alignItems: 'center',
                }}
              />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>

  )
}

Select.defaultProps = {
  placeholder: 'Select an item',
  type: 'normal',
  size: 16,
  time: 300,
  onChooseItem: () => { }
  // styles: StyleSheet.create({
  //   container: {
  //     width: '100%'
  //   }
  // })
}

export default Select


const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  icon: {
    resizeMode: 'contain',
    height: '40%',
    alignSelf: 'center',
    right: 5,
    position: 'absolute'
  }
})

