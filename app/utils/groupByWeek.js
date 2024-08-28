import { format, startOfWeek } from 'date-fns';

export const groupByWeek = (expenses, revenues) => {
    const weeks = {};

    const parseDate = (dateString) => {
        return new Date(dateString);
    };

    expenses.forEach(expense => {
        const weekStart = startOfWeek(parseDate(expense.date), { weekStartsOn: 0 });
        const weekKey = format(weekStart, 'yyyy-MM-dd');

        if (!weeks[weekKey]) {
            weeks[weekKey] = { expenses: 0, revenues: 0, profit: 0 };
        }

        weeks[weekKey].expenses += expense.amount;
    });

    revenues.forEach(revenue => {
        const weekStart = startOfWeek(parseDate(revenue.date), { weekStartsOn: 0 });
        const weekKey = format(weekStart, 'yyyy-MM-dd');

        if (!weeks[weekKey]) {
            weeks[weekKey] = { expenses: 0, revenues: 0, profit: 0 };
        }

        weeks[weekKey].revenues += revenue.amount;
    });

    Object.keys(weeks).forEach(weekKey => {
        weeks[weekKey].profit = weeks[weekKey].revenues - weeks[weekKey].expenses;
    });

    return Object.keys(weeks).map(weekKey => ({
        weekStart: weekKey,
        ...weeks[weekKey],
    }));
};
