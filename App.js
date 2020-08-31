/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Select from './component/Select'
import TextField from './component/TextField'
import Switcher from './component/Switcher'
import Slide from './component/Slide'
import RadioSelect from './component/RadioSelect'
import Button from './component/Button'
import Swiper from './component/Swiper';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.select1 = React.createRef()
    this.select2 = React.createRef()
    this.select3 = React.createRef()

    this.slide1 = React.createRef()
    this.slide2 = React.createRef()

  }

  render() {
    return (
      <SafeAreaView style={{
        flex: 1
      }}>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            width: '100%',
          }}>
          <Swiper
            listItem={[
              { label: 'Thong tin', view: <Item1 /> },
              { label: 'Thong tin', view: <Item1 /> },
              { label: 'Thong tin', view: <Item1 /> },
              { label: 'Thong tin', view: <Item1 /> },
              { label: 'Thong tin', view: <Item1 /> },

            ]}
          >

          </Swiper>
        </View>

      </SafeAreaView>

    );
  }
};


class Item1 extends Component {

  constructor(props) {
    super(props);
    this.select1 = React.createRef()
    this.select2 = React.createRef()
    this.select3 = React.createRef()

    this.slide1 = React.createRef()
    this.slide2 = React.createRef()

  }

  componentDidMount() {
    this.select1.current.info()
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, width: '100%' }}>
        <ScrollView
          style={{
            width: Dimensions.get('window').width,
            flex: 1,
            paddingHorizontal: 10,
            paddingVertical: 20,
          }}>
          <View style={{ paddingVertical: 20 }}>
            <TouchableOpacity onPress={() => this.slide1.current.open()}>
              <Text>Slide1</Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingVertical: 20 }}>
            <TouchableOpacity onPress={() => this.slide1.current.open()}>
              <Text>Slide2</Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingVertical: 20 }}>
            <Switcher />
          </View>
          <View style={{ paddingVertical: 20 }}>
            <Switcher color="red" />
          </View>
          <View style={{ paddingVertical: 20 }}>
            <TextField
              id={1}
              size={20}
              placeholder="23213212131"
              clearButton={true}
            />
          </View>
          <View style={{ paddingVertical: 20 }}>
            <TextField
              id={3}
              size={18}
              type="border"
              placeholder="23213212131"
              clearButton={true}
              textStyle={{
              }}
              multiline
            />
          </View>
          <View style={{ paddingVertical: 20 }}>
            <Select
              id={1}
              ref={this.select1}
              listItem={[
                { label: "Item 1", value: 1 },
                { label: "Item 1", value: 2 },
                { label: "Item 1", value: 3 }
              ]}
            />
          </View>
          <View style={{ paddingVertical: 20 }}>
            <Select
              borderColor='red'
              id={2}
              listItem={[
                { label: "Item 2", value: 1 },
                { label: "Item 2", value: 2 },
                { label: "Item 2", value: 3 }
              ]}
            />
          </View>
          <View style={{ paddingVertical: 20 }}>
            <Button
              label="Button 1"
            />
          </View>
          <Slide ref={this.slide1}>
            <View style={{ paddingVertical: 20 }}>
              <Switcher />
            </View>
          </Slide>
          <Slide ref={this.slide2}>
            <View style={{ paddingVertical: 20 }}>
              <Switcher />
            </View>
          </Slide>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
