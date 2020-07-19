import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Animated,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal
} from 'react-native'
import color from '../assets/color'

const Dialog = (props) => {
  const [isSlide, setIsSlide] = useState(false)

  _animatedSlideUp = new Animated.Value(isSlide ? 0 : 1);

  useEffect(() => {
    let value = 0
    if (showSelect) {
      value = 1
    }
    Animated.timing(_animatedSlideUp, {
      toValue: value,
      duration: 300,
      useNativeDriver: false
    }).start();
  })

  return (
    <Modal animationType='none' transparent={true} visible={showSelect}>

    </Modal>
  )
}

export default Dialog