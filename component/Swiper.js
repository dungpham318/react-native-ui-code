import React, { useState, forwardRef, useEffect, useImperativeHandle, useLayoutEffect } from 'react'
import {
  Text,
  Modal,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  ListView
} from 'react-native'
import color from '../assets/color'

const Swiper = forwardRef((props, ref) => {
  const [index, setIndex] = useState(props.index)
  let {
    size
  } = props

  useEffect(() => {
    console.log(index)
  }, [index])

  useImperativeHandle(ref, () => ({
    changeIndex: (index) => {
      setIndex(index)
    }
  }))

  return (
    <View style={{
      flex: 1,
      width: '100%',
    }}>
      <View style={{
        paddingVertical: size
      }}>
        <ScrollView
          style={{
            width: '100%',
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          // ref={ref => { this.scrollView = ref }}
          onLayout={() => {
            // this.scrollView.scrollTo({
            //   x: props.index * Dimensions.get('window').width,
            //   y: 0,
            //   animated: false
            // })
          }}
          pagingEnabled={true}
        >
          {props.listItem.map((item, position) => {
            return <TouchableOpacity
              style={{
                borderBottomColor: color.normal,
                borderBottomWidth: 2
              }}
            >
              <Text style={{
                paddingVertical: size * 0.5,
                paddingHorizontal: size
              }}>{item.label}</Text>
            </TouchableOpacity>


          })}

        </ScrollView>
      </View>


      <ScrollView
        style={{
          width: '100%',
          flex: 1
        }}
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
        onScrollEndDrag={(event) => {
          setIndex(parseInt(event.nativeEvent.contentOffset.x / Dimensions.get('window').width))
        }}
        pagingEnabled={true}
      >


        {props.listItem.map(item => {
          return item.view
        })}
      </ScrollView>
    </View>

  )

})

Swiper.defaultProps = {
  index: 0,
  size: 20
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