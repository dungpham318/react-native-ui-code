import React, { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react'
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
import ErrorView from './common/ErrorView'
import Label from './common/Label'

const Select = forwardRef((props, ref) => {
  let [showSelect, setShowSelect] = useState(false)
  let [selectedItem, setSelectedItem] = useState(
    props.defaultValue !== undefined ? props.defaultValue : undefined
  );
  const { listItem } = props
  // _animatedShowSelect = new Animated.Value(showSelect ? 0 : 1);
  _animatedShowSelect = useRef(new Animated.Value(0)).current
  const time = props.time
  let [error, setError] = useState('')

  useImperativeHandle(ref, () => ({
    error: (key, content) => {
      if (key === props.id) {
        setError(content)
        return false
      }
    },
    clearError: (key) => {
      if (key === props.id) {
        setError('')
      }
    }
  }))

  useEffect(() => {
    console.log(props.listItem)
  }, [showSelect])

  handleOpen = async () => {
    await setShowSelect(true)
    Animated.timing(_animatedShowSelect, {
      toValue: 1,
      duration: time,
      useNativeDriver: false
    }).start()
  }

  handleClose = (callback) => {
    Animated.timing(_animatedShowSelect, {
      toValue: 0,
      duration: time,
      useNativeDriver: false
    }).start()
    setTimeout(async () => {
      setShowSelect(false)
      if (callback !== undefined) {
        await callback()
      }
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


  let borderColor = '#EFEFEF'
  if (showSelect) {
    borderColor = '#007AFF'
  }
  if (error !== '') {
    borderColor = 'red'
  }

  return (
    <View style={[styles.container, props.style]}>
      {/* {props.label && <Label size={props.size} label={props.label} isRequired={props.isRequired} />} */}
      <TouchableOpacity
        style={{
          borderColor: borderColor,
          borderWidth: 1,
          borderRadius: 10,
          flexDirection: 'row',
        }}
        onPress={() => handleOpen()}
      >
        <View>

          {
            selectedItem !== undefined &&
            <Text style={{
              color: color.label,
              fontSize: props.size * 0.7,
              top: 5,
              left: 10,
            }}>
              {props.placeholder}
            </Text>
          }


          <Text style={{
            paddingTop: selectedItem === undefined ? props.size : (props.size * 0.7),
            paddingBottom: selectedItem === undefined ? props.size : (props.size * 0.7 - 5),
            paddingRight: 50,
            paddingLeft: 10,
            fontSize: props.size,
            color: selectedItem === undefined ? color.placeholder : color.normalText,
            fontSize: props.size
          }}>
            {selectedItem !== undefined ? selectedItem.label : props.placeholder}
          </Text>
        </View>

        <Image
          style={{
            resizeMode: 'contain',
            height: props.size,
            alignSelf: 'center',
            right: 5,
            position: 'absolute'
          }}
          source={require('../assets/images/ic_arrowdown.png')}
        />
      </TouchableOpacity>
      {error !== '' && <ErrorView error={error} />}
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
            <TouchableWithoutFeedback>

              <Animated.View
                disabled={true}
                style={{
                  transform: [{
                    translateY: _animatedShowSelect.interpolate({
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
                    onPress={() => handleClose()}
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
            </TouchableWithoutFeedback>

          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>

  )
})

Select.defaultProps = {
  placeholder: 'Select an item',
  type: 'normal',
  size: 16,
  time: 300,
  onChooseItem: () => { },
  label: '',
  isRequired: false,
  listItem: []
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

  }
})

