import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { addRevenue } from '../database';
import { REVENUE_CATEGORIES } from './categories'; 

const AddRevenueForm = ({}) => {
  const [amounts, setAmounts] = useState({});

  const handleSubmit = async () => {
    await Promise.all(
      Object.entries(amounts).map(([category, amount]) => {
        if (amount) {
          return addRevenue(category, parseFloat(amount));
        }
      })
    );



    setAmounts(
      REVENUE_CATEGORIES.reduce((acc, category) => {
        acc[category.label] = '';
        return acc;
      }, {})
    );
  };

  const handleAmountChange = (category, value) => {
    setAmounts(prev => ({ ...prev, [category]: value }));
  };

  return (
    <View style={styles.container}>
      {REVENUE_CATEGORIES.map(category => (
        <View key={category.label} style={styles.inputContainer}>
          <Text style={styles.label}>{category.label}</Text>
          <TextInput
            style={styles.input}
            placeholder="Valor"
            keyboardType="numeric"
            value={amounts[category.label] || ''}
            onChangeText={(value) => handleAmountChange(category.label, value)}
          />
        </View>
      ))}
      <Button title="Adicionar" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '60%',
    paddingHorizontal: 8,
  },
});

export default AddRevenueForm;
