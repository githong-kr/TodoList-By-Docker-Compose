import { NextApiRequest, NextApiResponse } from 'next';
import todoApi from '../../../lib/api/todo';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const { data } = await todoApi.getTodosAPI();
      res.statusCode = 200;
      return res.end(data);
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      res.end(e);
    }
  }
};
