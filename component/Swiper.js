import React, { useState, forwardRef, useEffect, useImperativeHandle, useLayoutEffect } from 'react'
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
  ScrollView
} from 'react-native'

const Swiper = forwardRef((props, ref) => {
  const [index, setIndex] = useState(props.index)

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      ref={ref => { this.scrollView = ref }}
      onLayout={() => {
        this.scrollView.scrollTo({
          x: props.index * Dimensions.get('window').width,
          y: 0,
          animated: false
        })
      }}
      pagingEnabled={true}
    >
      {props.children}
    </ScrollView>
  )

})

Swiper.defaultProps = {
  index: 0
}

export default Swiper

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})