import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import FooterButtons from '../../components/FooterButtons';
import AddRevenueForm from '../../components/AddRevenueForm';

export default function RevenuePage() {
  const [revenue, setRevenue] = useState([]);

  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <AddRevenueForm />
       
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
