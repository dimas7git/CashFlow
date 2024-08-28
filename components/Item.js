import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExpenseItem = ({ description }) => {
  return (
    <View style={styles.itemContainer}>
      <Text>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default ExpenseItem;
