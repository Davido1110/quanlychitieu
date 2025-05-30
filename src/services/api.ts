import axios from 'axios';

const API_BASE_URL = 'https://hook.eu2.make.com/jl4q8tf9mfk3jea8ed5rn9l7wjq5imld';

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
      validateStatus: () => true,
    });
    console.log('AXIOS FULL RESPONSE:', response);
    return response.data;
  } catch (error: any) {
    console.error('AXIOS ERROR:', error);
    if (error.response && typeof error.response.data === 'string') {
      return error.response.data;
    }
    throw error;
  }
};

export const getExpenseReport = async (month: string) => {
  try {
    const response = await axios.get('/api/get-report', {
      params: { month },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching expense report:', error);
    throw error;
  }
}; 