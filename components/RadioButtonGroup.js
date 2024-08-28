import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RadioButtonGroup = ({ options, selectedValue, onValueChange }) => {
  return (
    <View style={styles.container}>
      {options.map(option => (
        <TouchableOpacity
          key={option.value}
          style={[styles.option, selectedValue === option.value && styles.selectedOption]}
          onPress={() => onValueChange(option.value)}
        >
          <Text style={styles.text}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  option: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  selectedOption: {
    backgroundColor: '#e0e0e0',
  },
  text: {
    fontSize: 16,
  },
});

export default RadioButtonGroup;
