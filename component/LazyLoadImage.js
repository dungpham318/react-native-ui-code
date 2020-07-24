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

const LazyLoadImage = forwardRef((props, ref) => {

  useImperativeHandle(ref, () => ({

  }))

  return (
    <Image

    >

    </Image>
  )

})

LazyLoadImage.defaultProps = {
  backgroundColor: '#ffffff'
}

export default LazyLoadImage


const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})