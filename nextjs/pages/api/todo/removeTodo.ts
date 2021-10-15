import { NextApiRequest, NextApiResponse } from 'next';
import todoApi from '../../../lib/api/todo';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.body;
    await todoApi.deleteTodoAPI(id);
    res.statusCode = 200;
    return res.end();
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.end(e);
  }
};
