import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Animated,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'
import color from '../assets/color'

const Switcher = (props) => {
  const {
    defaultValue,
    size,
    offColor,
    onChange,
    color,
    time
  } = props
  const [isChoose, setIsChoose] = useState(defaultValue)

  _animatedIsChoose = useRef(new Animated.Value(0)).current

  useEffect(() => {
    onChange(isChoose)
    let value = 0
    if (isChoose) {
      value = 1
    }
    Animated.timing(_animatedIsChoose, {
      toValue: value,
      duration: time,
      useNativeDriver: false
    }).start();
  })

  return (
    <TouchableWithoutFeedback
      onPress={() => setIsChoose(!isChoose)}
    >
      <Animated.View
        style={{
          width: size * 2.7,
          backgroundColor: _animatedIsChoose.interpolate({
            inputRange: [0, 1],
            outputRange: [offColor, '#ffffff'],
          }),
          height: size,
          justifyContent: "center",
          borderRadius: size
        }}
      >
        {
          isChoose &&
          <Animated.View
            style={{
              width: _animatedIsChoose.interpolate({
                inputRange: [0, 1],
                outputRange: [0, size * 2.7],
              }),
              backgroundColor: _animatedIsChoose.interpolate({
                inputRange: [0, 1],
                outputRange: ['#ffffff', color],
              }),
              height: size,
              justifyContent: "center",
              borderRadius: size,
              opacity: 0.4
            }}
          />
        }
        <Animated.View
          style={{
            width: size * 1.4,
            height: size * 1.4,
            borderRadius: size * 1.4,
            position: "absolute",
            left: _animatedIsChoose.interpolate({
              inputRange: [0, 1],
              outputRange: [0, size * 1.4],
            }),
            backgroundColor: _animatedIsChoose.interpolate({
              inputRange: [0, 1],
              outputRange: ['#ffffff', color],
            }),
            borderColor: color.placeholder,
            shadowColor: "black",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
          }}
        >

        </Animated.View>

      </Animated.View>
    </TouchableWithoutFeedback>

  )
}

Switcher.defaultProps = {
  defaultValue: false,
  size: 20,
  color: color.normal,
  offColor: color.placeholder,
  onChange: (value) => { },
  time: 200
}

export default Switcher