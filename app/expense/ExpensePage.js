import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import ExpenseItem from '../../components/Item';
import FooterButtons from '../../components/FooterButtons';
import { createTable, getExpenses } from '../../database';
import AddExpenseForm from '../../components/AddExpenseForm';

export default function ExpensePage() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const initializeDatabase = async () => {
      await createTable();
    };

    initializeDatabase();
  }, []);

  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <AddExpenseForm />
       
      </ScrollView>
      <FooterButtons />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  emptyText: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
  },
});
