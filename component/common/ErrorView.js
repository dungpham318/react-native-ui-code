import React, { useState, forwardRef, useImperativeHandle } from 'react'
import {
  Text,
  TextInput,
  View
} from 'react-native'
const ErrorView = (props) => {
  return (
    <View>
      <Text style={{
        fontSize: props.size,
        color: 'red',
        paddingVertical: props.size
      }}>{props.error}</Text>
    </View>
  )
}
ErrorView.defaultProps = {
  size: 12,
}
export default ErrorView