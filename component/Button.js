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

const Button = forwardRef((props, ref) => {
  let {
    label,
    size,
    icon
  } = props
  return (
    <TouchableOpacity
      style={{
        backgroundColor: color.normal,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 5,
      }}
    >
      <Text style={{
        paddingVertical: size * 0.7,
        color: '#ffffff',
        fontSize: size,
        fontWeight: '600'
      }}>{label}</Text>
      <Image
        source={icon}
      >

      </Image>
    </TouchableOpacity>
  )
})

Button.defaultProps = {
  size: 18
}

export default Button


const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  icon: {

  }
})

