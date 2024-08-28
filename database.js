import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('expenses.db');

const initializeDatabase = async () => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT,
        amount REAL,
        date TEXT
      );
    `);
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS revenues (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT,
        amount REAL,
        date TEXT
      );
    `);
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export const createTable = initializeDatabase;

export const addExpense = async (category, amount, date = new Date()) => {
  try {
      await db.runAsync(`
          INSERT INTO expenses (category, amount, date)
          VALUES (?, ?, ?);
      `, [category, amount, date.toISOString()]); 
  } catch (error) {
      console.error('Error adding expense:', error);
  }
};

export const addRevenue = async (category, amount, date = new Date()) => {
  try {
      await db.runAsync(`
          INSERT INTO revenues (category, amount, date)
          VALUES (?, ?, ?);
      `, [category, amount, date.toISOString()]);
  } catch (error) {
      console.error('Error adding revenue:', error);
  }
};

export const deleteExpense = async (id) => {
  try {
    await db.runAsync('DELETE FROM expenses WHERE id = ?;', [id]);
  }
  catch (error) {
    console.error('Error deleting expense:', error);
  } 
};

export const deleteRevenue = async (id) => {
  try {
    await db.runAsync('DELETE FROM revenues WHERE id = ?;', [id]);
  }
  catch (error) {
    console.error('Error deleting revenue:', error);
  }
};

export const updateExpense = async (id, category, amount, date) => {
  try {
    await db.runAsync('UPDATE expenses SET category = ?, amount = ?, date = ? WHERE id = ?;', [category, amount, date, id]);
  } catch (error) {
    console.error('Error updating expense:', error);
  }
};

export const updateRevenue = async (id, category, amount, date) => {
  try {
    await db.runAsync('UPDATE revenues SET category = ?, amount = ?, date = ? WHERE id = ?;', [category, amount, date, id]);
  } catch (error) {
    console.error('Error updating revenue:', error);
  }
};

export const getExpenses = async () => {
  try {
    const result = await db.getAllAsync('SELECT * FROM expenses;', []);
    console.log('Result from getExpenses:', result); 
    return result;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return [];
  }
};

export const getRevenues = async () => {
  try {
    const result = await db.getAllAsync('SELECT * FROM revenues;', []);
    console.log('Result from getRevenues:', result);
    return result;
  } catch (error) {
    console.error('Error fetching revenues:', error);
    return [];
  }
};

export const getExpensesByDate = async (startDate, endDate) => {
  try {
      const result = await db.getAllAsync(`
          SELECT * FROM expenses
          WHERE date >= ? AND date < ?;
      `, [startDate.toISOString(), endDate.toISOString()]);
      return result;
  } catch (error) {
      console.error('Error fetching expenses by date:', error);
      return [];
  }
};

export const getRevenuesByDate = async (startDate, endDate) => {
  try {
      const result = await db.getAllAsync(`
          SELECT * FROM revenues
          WHERE date >= ? AND date < ?;
      `, [startDate.toISOString(), endDate.toISOString()]);
      return result;
  } catch (error) {
      console.error('Error fetching revenues by date:', error);
      return [];
  }
};



