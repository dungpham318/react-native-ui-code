import React, { Component } from 'react'
import {
  Text
} from 'react-native'

const Label = (props) => {
  return (
    <Text
      style={{
        color: '#335272',
        paddingVertical: props.size * 0.2,
        fontSize: props.size,
        fontWeight: 'bold'
      }}
    >{props.label}{(props.isRequired && props.label !== '') ? <Text style={{ color: 'red' }}> *</Text> : null}</Text>
  )
}
Label.defaultProps = {
  size: 16,
  label: '',
  isRequired: false
}
export default Label