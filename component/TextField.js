import React, { useState, useEffect } from 'react';
import {
  View,
  Animated,
  TextInput,
  Text
} from 'react-native'
import color from '../assets/color'
const TextField = (props) => {
  const {
    size,
    label,
    placeholder,
    defaultValue,
    onChangeText,
    editable,
    style,
    time,
    type
  } = props
  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState('')

  _animatedIsFocused = new Animated.Value(isFocused ? 0 : 1)
  _animatedLabel = new Animated.Value((isFocused || value !== '') ? 0 : 1)

  useEffect(() => {
    if (value === '') {
      (value !== '' || isFocused) ? animatedLabel(1) : animatedLabel(0)
    }
    isFocused ? animatedFocus(1) : animatedFocus(0)
  }, [isFocused])

  animatedFocus = value => {
    Animated.timing(_animatedIsFocused, {
      toValue: value,
      duration: time,
      useNativeDriver: false
    }).start()
  }

  animatedLabel = value => {
    console.warn(value)
    Animated.timing(_animatedLabel, {
      toValue: value,
      duration: time,
      useNativeDriver: false
    }).start()
  }

  const labelStyle = {
    left: 0,
    top: _animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [size * 1.5, 0],
    }),
    fontSize: _animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [size, size * 0.6],
    }),
    color: _animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', '#000'],
    }),
  }

  const styleNormal = {
    borderBottomWidth: isFocused ? 0 : 1,
  }

  return (
    <View style={[{ width: '100%' }, style,]}>
      <Animated.Text style={labelStyle}>
        {label}
      </Animated.Text>

      <TextInput
        placeholder={label === '' ? '' : placeholder}
        editable={editable}
        defaultValue={defaultValue}
        onChangeText={(text) => {
          onChangeText(text)
          setValue(text)
        }}
        value={value}
        style={[{
          paddingVertical: size * 0.5,
          fontSize: size,
          borderColor: '#ccc',
        },
        type === 'normal' && styleNormal
        ]}
        keyboardType={props.numeric ? 'numeric' : ''}
        onFocus={() => {
          setIsFocused(true)
        }}
        onBlur={() => {
          setIsFocused(false)
        }}
      />
      {
        type === 'normal' &&
        <Animated.View
          style={{
            width: _animatedIsFocused.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
            backgroundColor: _animatedIsFocused.interpolate({
              inputRange: [0, 1],
              outputRange: ['#ccc', color.normal],
            }),
            height: 2,
            alignSelf: 'center'
          }}
        ></Animated.View>
      }
    </View>
  )
}

TextField.defaultProps = {
  placeholder: '',
  label: 'Input text',
  size: 20,
  defaultValue: '',
  onChangeText: (text) => { },
  editable: true,
  time: 200,
  numeric: false,
  type: 'normal'
}

export default TextField
