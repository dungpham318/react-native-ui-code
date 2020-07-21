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
          width: '100%',
        }}>
        <SafeAreaView style={{ flex: 1, width: '100%', }}>
          <ScrollView
            style={{
              width: '100%',
              flex: 1,
              paddingHorizontal: 10,
              paddingVertical: 20,
            }}>
            <View style={{ paddingVertical: 20 }}>
              <Switcher />
            </View>
            <View style={{ paddingVertical: 20 }}>
              <Switcher />
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
                ref={this.select1}
                listItem={[
                  { label: "Item 1", value: 1 },
                  { label: "Item 2", value: 2 },
                  { label: "Item 3", value: 3 }
                ]}
              />
            </View>
            <View style={{ paddingVertical: 20 }}>
              <Select
                ref={this.select2}
                listItem={[
                  { label: "Item 3", value: 1 },
                  { label: "Item 3", value: 2 },
                  { label: "Item 3", value: 3 }
                ]}
              />
            </View>
          </ScrollView>
        </SafeAreaView>

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
