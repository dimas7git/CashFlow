import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getExpensesByDate, getRevenuesByDate } from '../../database';

const InspectPage = ({ route }) => {
    const { type, data } = route.params;
    const [expenses, setExpenses] = useState([]);
    const [revenues, setRevenues] = useState([]);
    const [error, setError] = useState(null);

    console.log('InspectPage', type, data);
    
    useEffect(() => {
        const loadData = async () => {
            try {
                const { monthStart, monthEnd } = data;

                const startDate = new Date(monthStart);
                const endDate = new Date(monthEnd);

                const monthlyExpenses = await getExpensesByDate(startDate, endDate);
                const monthlyRevenues = await getRevenuesByDate(startDate, endDate);
                
                setExpenses(monthlyExpenses);
                setRevenues(monthlyRevenues);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
                setError('Erro ao carregar dados');
            }
        };

        loadData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalhe Mensal</Text>
            
            <Text style={styles.sectionTitle}>Despesas totais: R${data.expense.toFixed(2)}</Text>
            <Text style={styles.sectionTitle}>Receitas totais: R${data.revenue.toFixed(2)}</Text>
            <Text style={styles.sectionTitleLucro}>Lucro: R${data.profit.toFixed(2)}</Text>


            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    sectionTitleLucro: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        color: 'green',
    },
    item: {
        fontSize: 16,
        marginVertical: 5,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginVertical: 20,
    },
});

export default InspectPage;
