/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
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

class App extends React.Component {

  constructor(props) {
    super(props);
    this.slide1 = React.createRef()
    this.slide2 = React.createRef()
    this.select1 = React.createRef()
    this.select2 = React.createRef()
  }

  render() {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <View
          style={{
            width: '100%',
            flex: 1,
            paddingHorizontal: 30,
            justifyContent: 'center',
          }}>

          <TouchableOpacity
            onPress={() => {
              this.slide1.current.open()
            }}
          >
            <Text>
              11111111
          </Text>
          </TouchableOpacity>
          <Slide
            ref={this.slide1}
            type='up'
            position='flex-end'
          >
            <View
              style={{
                width: Dimensions.get('window').width * 0.9,
                height: 200,
                backgroundColor: 'red'
              }}
            >
              <Text>11111111</Text>

              <TouchableOpacity
                onPress={() => {
                  this.slide1.current.close()
                }}
              >
                <Text>
                  11111111
                </Text>
              </TouchableOpacity>
              {/* <Switcher
                size={20}
              /> */}
            </View>
          </Slide>

          <TouchableOpacity
            onPress={() => {
              this.slide2.current.open()
            }}
          >
            <Text>
              222222222
          </Text>
          </TouchableOpacity>
          <Slide
            ref={this.slide2}
            type='up'
            position='flex-end'
          >
            <View
              style={{
                width: Dimensions.get('window').width * 0.9,
                height: 200,
                backgroundColor: 'red'
              }}
            >
              <Text>22222222222</Text>

              <TouchableOpacity
                onPress={() => {
                  this.slide2.current.close()
                }}
              >
                <Text>
                  22222222222
                </Text>
              </TouchableOpacity>
              {/* <Switcher
                size={20}
              /> */}
            </View>
          </Slide>
          {/* <View style={{ marginVertical: 40 }}></View> */}

          {/* <View style={{ marginVertical: 40 }}></View> */}

          {/* <Switcher
            color="red"
            size={20}
          />
          <Switcher
            color="red"
            size={20}
          /> */}

          {/* <RadioSelect
            size={20}
            position="left"
            listItem={
              [
                { label: 'Item 111', value: '1' },
                { label: 'Item 222', value: '2' },
                { label: 'Item 333', value: '3' },
                { label: 'Item 444', value: '4' }
              ]
            }
          /> */}

          {/* <ScrollView>
            <TextField
              type='normal'
            />

          </ScrollView> */}
          <Select
            size={20}
            listItem={[
              { label: 'Item 111', value: '1' },
              { label: 'Item 222', value: '2' },
            ]}
          />

          {/* <Select
            size={20}
            listItem={[
              { label: 'Item 111', value: '1' },
              { label: 'Item 222', value: '2' },
              { label: 'Item 333', value: '3' },
              { label: 'Item 444', value: '4' },
              { label: 'Item 111', value: '1' },
              { label: 'Item 222', value: '2' },
              { label: 'Item 333', value: '3' },
              { label: 'Item 444', value: '4' }
            ]}
          />
          <Select
            size={20}
            listItem={[
              { label: 'Item 111', value: '1' },
              { label: 'Item 222', value: '2' },
              { label: 'Item 333', value: '3' },
              { label: 'Item 444', value: '4' },
              { label: 'Item 111', value: '1' },
              { label: 'Item 222', value: '2' },
              { label: 'Item 333', value: '3' },
              { label: 'Item 444', value: '4' }
            ]}
          /> */}
        </View>
      </View>
    );
  }
};

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
