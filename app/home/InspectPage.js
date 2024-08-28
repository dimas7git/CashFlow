import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { getExpensesByDate, getRevenuesByDate, deleteExpense, deleteRevenue, updateExpense, updateRevenue } from '../../database';
import Icon from 'react-native-vector-icons/FontAwesome';

const InspectPage = ({ route }) => {
    const { type, data } = route.params;
    const [expenses, setExpenses] = useState([]);
    const [revenues, setRevenues] = useState([]);
    const [error, setError] = useState(null);

    const loadData = async () => {
        try {
            const { weekStart } = data;
            const startDate = new Date(weekStart);
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6);

            const weekExpenses = await getExpensesByDate(startDate, endDate);
            const weekRevenues = await getRevenuesByDate(startDate, endDate);

            setExpenses(weekExpenses);
            setRevenues(weekRevenues);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            setError('Erro ao carregar dados');
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleDeleteExpense = async (id) => {
        try {
            Alert.alert(
                'Deletar Despesa',
                'Tem certeza que deseja deletar essa despesa?',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel',
                    },
                    {
                        text: 'Deletar',
                        onPress: async () => {
                            await deleteRevenue(id);
                            loadData(); 
                        },
                    },
                ]
            );

        } catch (error) {
            console.error('Erro ao deletar despesa:', error);
            setError('Erro ao deletar despesa');
        }
    };

    const handleDeleteRevenue = async (id) => {
        try {
            Alert.alert(
                'Deletar Receita',
                'Tem certeza que deseja deletar essa receita?',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel',
                    },
                    {
                        text: 'Deletar',
                        onPress: async () => {
                            await deleteRevenue(id);
                            loadData();  
                        },
                    },
                ]
            );

        } catch (error) {
            console.error('Erro ao deletar receita:', error);
            setError('Erro ao deletar receita');
        }
    };

    const handleEditExpense = (item) => {
      
        Alert.prompt(
            'Editar Despesa',
            `Editar ${item.category}:`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Salvar',
                    onPress: async (newAmount) => {
                        await updateExpense(item.id, item.category, parseFloat(newAmount), item.date);
                        loadData();
                    },
                },
            ],
            'plain-text',
            `${item.amount}`
        );
    };

    const handleEditRevenue = (item) => {
        
        Alert.prompt(
            'Editar Receita',
            `Editar ${item.category}:`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Salvar',
                    onPress: async (newAmount) => {
                        await updateRevenue(item.id, item.category, parseFloat(newAmount), item.date);
                        loadData(); 
                    },
                },
            ],
            'plain-text',
            `${item.amount}`
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalhe semanal</Text>

            <Text style={styles.sectionTitle}>Despesas</Text>
            <FlatList
                data={expenses}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.item}>{item.category}: R${item.amount.toFixed(2)}</Text>
                        <View style={styles.editButton}>

                            <TouchableOpacity onPress={() => handleEditExpense(item)}>
                                <Icon name="edit" size={20} color="blue" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.delete} onPress={() => handleDeleteExpense(item.id)}>
                                <Icon name="trash" size={20} color="red" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma despesa encontrada.</Text>}
            />

            <Text style={styles.sectionTitle}>Receitas</Text>
            <FlatList
                data={revenues}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.item}>{item.category}: R${item.amount.toFixed(2)}</Text>
                        <View style={styles.editButton}>
                            <TouchableOpacity onPress={() => handleEditRevenue(item)}>
                                <Icon name="edit" size={20} color="blue" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.delete} onPress={() => handleDeleteRevenue(item.id)}>
                                <Icon name="trash" size={20} color="red" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma receita encontrada.</Text>}
            />

            {error && <Text style={styles.errorText}>{error}</Text>}
            <Text style={styles.sectionTitle}>Despesas totais: R${expenses.reduce((acc, item) => acc + item.amount, 0).toFixed(2)}</Text>
            <Text style={styles.sectionTitle}>Receitas totais: R${revenues.reduce((acc, item) => acc + item.amount, 0).toFixed(2)}</Text>
            <Text style={styles.sectionTitleLucro}>Lucro: R${(revenues.reduce((acc, item) => acc + item.amount, 0) - expenses.reduce((acc, item) => acc + item.amount, 0)).toFixed(2)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 3,
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
    delete: {
        marginLeft: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    editButton: {
        flexDirection: 'row',
        marginLeft: 'auto',
        spaceBetween: 10,
    },
    item: {
        fontSize: 16,
    },
    emptyText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginVertical: 20,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginVertical: 20,
    },
});

export default InspectPage;
