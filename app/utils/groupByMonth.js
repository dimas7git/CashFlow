import { format, startOfMonth } from 'date-fns';

export const groupByMonth = (expenses, revenues) => {
    const months = {};

    expenses.forEach(expense => {
        const date = new Date(expense.date);
        const monthStart = startOfMonth(date);
        const monthKey = format(monthStart, 'yyyy-MM');

        if (!months[monthKey]) {
            months[monthKey] = { revenue: 0, expense: 0, monthStart };
        }

        months[monthKey].expense += expense.amount;
    });

    revenues.forEach(revenue => {
        const date = new Date(revenue.date);
        const monthStart = startOfMonth(date);
        const monthKey = format(monthStart, 'yyyy-MM');

        if (!months[monthKey]) {
            months[monthKey] = { revenue: 0, expense: 0, monthStart };
        }

        months[monthKey].revenue += revenue.amount;
    });

    return Object.keys(months).map(monthKey => ({
        monthStart: months[monthKey].monthStart, 
        revenue: months[monthKey].revenue,
        expense: months[monthKey].expense,
        profit: months[monthKey].revenue - months[monthKey].expense
    }));
};
