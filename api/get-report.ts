import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const MAKE_WEBHOOK_REPORT_URL = 'https://hook.eu2.make.com/jl4q8tf9mfk3jea8ed5rn9l7wjq5imld/report';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { month } = req.query;
  try {
    const response = await axios.get(MAKE_WEBHOOK_REPORT_URL, {
      params: { month },
    });
    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
} 