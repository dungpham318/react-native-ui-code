import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import {
  View,
  Animated,
  TouchableWithoutFeedback,
  Modal
} from 'react-native'
import color from '../assets/color'
import { width, height } from '../assets/size'

const Slide = forwardRef((props, ref) => {
  const time = props.time
  const [onSlide, setOnSlide] = useState(false)
  _animatedSlide = new Animated.Value(onSlide ? 0 : 1)
  let slideData = {}

  if (props.type === 'down') {
    Object.assign(slideData, {
      from: -1000,
      to: 0
    })
  } else {
    Object.assign(slideData, {
      from: 1000,
      to: 0
    })
  }

  useEffect(() => {
    if (onSlide) {
      Animated.timing(_animatedSlide, {
        toValue: 1,
        duration: time,
        useNativeDriver: false
      }).start()
    } else {

    }
  }, [onSlide])

  handleOpen = async () => {
    await setOnSlide(true)
    // Animated.timing(_animatedSlide, {
    //   toValue: 1,
    //   duration: time,
    //   useNativeDriver: false
    // }).start()
  }

  handleClose = (callback) => {
    Animated.timing(_animatedSlide, {
      toValue: 0,
      duration: time,
      useNativeDriver: false
    }).start()
    setTimeout(async () => {
      setOnSlide(false)
      if (callback !== undefined) {
        await callback()
      }
    }, time)
  }

  useImperativeHandle(ref, () => ({
    open: () => {
      handleOpen()
    },
    close: () => {
      handleClose()
    }
  }))

  return (
    <Modal animationType='none' transparent={true} visible={onSlide}>
      <TouchableWithoutFeedback
        onPress={() => {
          handleClose()
        }}
      >
        <View style={{
          backgroundColor: color.popupBackground,
          flex: 1,
          width: '100%',
          justifyContent: 'center',
          alignItem: 'center',
        }}>
          <Animated.View
            style={{
              transform: [{
                translateY: _animatedSlide.interpolate({
                  inputRange: [0, 1],
                  outputRange: [slideData.from, slideData.to],
                })
              }],
              alignSelf: 'center',
              borderRadius: 10,
              flex: 1,
              justifyContent: props.position
            }}>
            <TouchableWithoutFeedback>
              {props.children}

            </TouchableWithoutFeedback>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )

})

Slide.defaultProps = {
  position: 'center',
  type: 'up',
  time: 300
}

export default Slide



