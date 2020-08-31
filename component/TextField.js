import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Animated,
  TextInput,
  Text,
  Image,
  TouchableOpacity
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
    type,
    clearButton,
    textStyle,
    autoFocus,
    onFocus,
    onBlur,
    multiline,
    numberOfLines
  } = props
  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState('')

  // _animatedIsFocused = new Animated.Value(isFocused ? 1 : 0)
  // _animatedLabel = new Animated.Value((isFocused || value !== '') ? 1 : 0)
  _animatedIsFocused = useRef(new Animated.Value(0)).current
  _animatedLabel = useRef(new Animated.Value(0)).current
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
      outputRange: [type === "border" ? size : size * 1.5, size * 0.1],
    }),
    fontSize: _animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [size, size * 0.6],
    }),
    color: _animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: ['#ccc', '#7F8890'],
    }),
  }



  const styleNormal = {
    borderBottomWidth: isFocused ? 0 : 1,
  }
  const styleBorder = {
    borderWidth: 1,
    borderColor: isFocused ? color.normal : '#ccc',
    minHeight: size * 3.5,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 5,
  }
  return (
    <View style={[{
      width: '100%',
      minHeight: size * 2,
      justifyContent: 'center',
    }, style, type === 'border' && styleBorder]}>
      <Animated.Text style={labelStyle}>
        {label}
      </Animated.Text>

      <TextInput
        multiline={multiline}
        numberOfLines={numberOfLines}
        autoFocus={autoFocus}
        placeholder={isFocused ? placeholder : ''}
        editable={editable}
        defaultValue={defaultValue}
        onChangeText={(text) => {
          onChangeText(text)
          setValue(text)
        }}
        value={value}
        style={[{
          paddingVertical: size * 0.5,
          paddingTop: size * 0.5,
          fontSize: size,
          borderColor: '#ccc',
          paddingRight: type === 'normal' ? size * 2 : size * 1.7
        }, textStyle,
        type === 'normal' && styleNormal
        ]}
        keyboardType={props.numeric ? 'numeric' : ''}
        onFocus={async () => {
          await setIsFocused(true)
          onFocus()
        }}
        onBlur={async () => {
          await setIsFocused(false)
          onBlur()
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

      {
        (clearButton && value !== '') &&
        <TouchableOpacity
          onPress={() => {
            setValue('')
            onChangeText('')
          }}
          style={{
            width: size * 0.9,
            height: size * 0.9,
            backgroundColor: '#EFEFEF',
            padding: size * 0.8,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: size,
            marginLeft: size * 0.4,
            position: 'absolute',
            right: 10
          }}>
          <Image
            style={{
              width: size * 0.5,
            }}
            resizeMode='contain'
            source={require('../assets/images/ic_times.png')}
          />
        </TouchableOpacity>
      }
    </View>
  )
}

TextField.defaultProps = {
  placeholder: '',
  label: 'Input text',
  size: 20,
  defaultValue: '',
  editable: true,
  time: 150,
  numeric: false,
  type: 'normal',
  clearButton: false,


  autoFocus: false,
  onChangeText: (text) => { },
  onFocus: () => { },
  onBlur: () => { },
  multiline: false,
  numberOfLines: 1
}

export default TextField
