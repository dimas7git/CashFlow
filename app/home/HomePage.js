import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import FooterButtons from '../../components/FooterButtons';
import { groupByMonth } from '../utils/groupByMonth';
import { groupByWeek } from '../utils/groupByWeek';
import { getExpenses, getRevenues } from '../../database';
import { useNavigation } from '@react-navigation/native';
import { startOfMonth } from 'date-fns';

const HomePage = ({ navigation }) => {
    const [weeklyData, setWeeklyData] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const isFocused = useIsFocused();

    const loadData = async () => {
        try {
            const expenses = await getExpenses();
            const revenues = await getRevenues();

            const weekly = groupByWeek(expenses, revenues);
            setWeeklyData(weekly);

            const monthly = groupByMonth(expenses, revenues);
            setMonthlyData(monthly);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    };

    useEffect(() => {
        if (isFocused) {
            loadData();
        }
    }, [isFocused]);

    const handleWeekPress = (weekData) => {
        navigation.navigate('InspectPage', { data: weekData });
    };

    const handleMonthPress = (month) => {
        const startDate = new Date(month.monthStart);
        const endDate = new Date(startOfMonth(startDate.setMonth(startDate.getMonth() + 1)).toISOString());
    
        navigation.navigate('InspectPageMonth', {
            type: 'month',
            data: {
                monthStart: startDate.toISOString(),
                monthEnd: endDate.toISOString(),
                revenue: month.revenue,
                expense: month.expense,
                profit: month.profit,
            }
        });
    };
    
      

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lucro Semanal</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {weeklyData.map((week, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={styles.weekContainer}
                        onPress={() => handleWeekPress(week)}
                    >
                        <Text style={styles.weekTitle}>Semana {index + 1}</Text>
                        <Text style={styles.weekProfit}>Lucro: R${week.profit.toFixed(2)}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <Text style={styles.title}>Receita Mensal</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {monthlyData.map((month, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={styles.monthContainer}
                        onPress={()=> handleMonthPress(month)}
                    >
                        <Text style={styles.monthTitle}>Mês {index + 1}</Text>
                        <Text style={styles.monthRevenue}>Receita: R${month.revenue.toFixed(2)}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <FooterButtons />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        color: '#333',
    },
    weekContainer: {
        marginBottom: 15,
    },
    weekTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    weekProfit: {
        fontSize: 16,
        color: 'green',
    },
    monthContainer: {
        marginBottom: 20,
    },
    monthTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    monthRevenue: {
        fontSize: 18,
        color: 'blue',
    },
    scrollContainer: {
        flexGrow: 1,
    },
});

export default HomePage;
