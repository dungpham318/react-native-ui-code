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
import { width, height } from '../assets/size'

const RadioSelect = (props) => {
  const { size, listItem, color, position } = props
  const [selectedData, setSelectedData] = useState(new Array)

  useEffect(
    () => {
      console.warn(selectedData)
    }, [selectedData]
  )
  const itemView = (item) => {
    let index = selectedData.findIndex(ele => {
      return ele === item
    })
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: 'center',
        }}
        onPress={
          () => {
            // if (selectedData.length >= 0) {
            //   let index = selectedData.findIndex(ele => {
            //     return ele === item
            //   })
            //   if (index === -1) {
            //     setSelectedData(
            //       [...selectedData, item]
            //     )
            //   } else {
            //     let data = selectedData
            //     data.splice(index, 1)
            //     setSelectedData([...data])
            //   }
            // } else {
            setSelectedData(
              [item]
            )
            // }
          }
        }
      >
        {
          position === 'left' &&
          <View style={{ marginRight: size * 0.5 }}>
            {dotView(index)}
          </View>

        }

        <View
          style={{
            paddingRight: size * 0.4
          }}
        >
          <Text
            style={{
              paddingVertical: size,
              fontSize: size
            }}
          >
            {item.label}
          </Text>
        </View>

        <View style={{ flex: 1 }}></View>
        {
          position === 'right' &&
          dotView(index)
        }


      </TouchableOpacity>
    )
  }

  const dotView = (index) => {
    return (
      <View
        style={{
          borderWidth: 2,
          borderRadius: size,
          borderColor: color,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: size * 0.2
        }}
      >
        <View
          style={{
            width: size * 0.7,
            height: size * 0.7,
            backgroundColor: index !== -1 ? color : 'transparent',
            borderRadius: size * 0.7,
            margin: 2
          }}
        ></View>
      </View>
    )
  }

  return (
    <View
      style={{
        width: '100%'
      }}
    >
      {
        listItem.map((item, index) => {
          return itemView(item, index)
        })
      }
    </View>
  )
}

RadioSelect.defaultProps = {
  multiple: false,
  listItem: [],
  size: 18,
  color: color.normal,
  position: 'right',
}

export default RadioSelect