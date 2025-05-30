import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'YOUR_WEBHOOK_URL';

export interface ExpenseData {
  message: string;
  type: 'text' | 'voice' | 'image';
  timestamp: string;
}

export const sendExpenseData = async (data: ExpenseData) => {
  try {
    const response = await axios.post(API_BASE_URL, data, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text',
    });
    return response.data;
  } catch (error) {
    console.error('Error sending expense data:', error);
    throw error;
  }
};

export const getExpenseReport = async (month: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/report`, {
      params: { month },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching expense report:', error);
    throw error;
  }
}; 