import React, { useState } from 'react';
import {Picker} from '@react-native-picker/picker';
import RadioForm from 'react-native-simple-radio-button';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {

  const [weight, setWeight] = useState(0);
  const [gender, setGender] = useState('male');
  const [bottle, setBottle] = useState(1);
  const [time, setTime] = useState(1);
  const [result, setResult] = useState(0);


  const genders = Array();
  genders.push({label: 'Male', value: 'male'});
  genders.push({label: 'Female', value: 'female'});
  

  const bottles=Array();
  for (let i = 1; i <= 20; i++){
    bottles.push({label: i + ' bottles', value: i});
  }

  const hours=Array();
  for (let i = 1; i <= 24; i++){
    hours.push({label: i + ' hours', value: i});
  }

  function calculate() {
    let aika = time;
    let grams = (bottle * 0.33) * 8 * 4.5;
    let burning = weight / 10;
    let gramsLeft = grams - (burning * time);
    let promilles = 0; 

    if (gender === 'male') {
      promilles = gramsLeft / (weight * 0.7);
    } else {
      promilles = gramsLeft / (weight * 0.6);
    }
    if (promilles < 0) {
      setResult(0);
    } else {
      setResult(promilles);
    }
    
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>ALCOMETER</Text>
      </View>
      <View style={styles.field}>
        <Text>Weight</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setWeight(text)}
          placeholder="in kilograms"
          keyboardType='numeric'></TextInput>
      </View>
      <View style={styles.field}>
        <Text>Bottles</Text>
        <Picker
          
          onValueChange={(itemValue) => setBottle(itemValue)}
          selectedValue={bottle}
        >
          {bottles.map((bottle, index) => (
            <Picker.Item key={index} label={bottle.label} value={bottle.value}/>
          ))
          }
        </Picker>
      </View>
      <View style={styles.field}>
        <Text>Time</Text>
        <Picker
          
          onValueChange={(itemValue) => setTime(itemValue)}
          selectedValue={time}
        >
          {hours.map((hour, index) => (
            <Picker.Item key={index} label={hour.label} value={hour.value}/>
          ))
          }</Picker>
      </View>
      <View style={styles.field}>
        <Text> Gender</Text>
        <RadioForm
          buttonColor={'#c74141'}
          selectedButtonColor={'#c74141'}
          style={styles.radio}
          buttonSize={15}
          radio_props={genders}
          initial={0}
          onPress={(value) => {setGender(value)}}
          />  
      </View>
      <View style={styles.field}>
        <Text>Promilles</Text>
        <Text>{result.toFixed(2)}</Text>
      </View>
      <Button color='#c74141' onPress= {calculate} title="Calculate"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
    margin: 20,
  },
  header: {
    backgroundColor: '#c74141',
    paddingTop: 20,
    paddingBottom: 30,
  },
  headerText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
  },
  field: {
    margin: 10,
  },
  input: {
    marginLeft: 10,
  },
  radio: {
    marginTop: 10,
    marginBottom: 10,
    
  },
});
