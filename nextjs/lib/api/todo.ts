import axios from './index';
import { TodoType } from '../../types/todo';

const todoApi = {
  getTodosAPI: async () => {
    return axios.get<TodoType[]>('todo');
  },
  checkTodoAPI: async (todo: TodoType) => {
    await axios.put('todo', {
      procDvcd: '2',
      id: todo.id,
      text: todo.text,
      color: todo.color,
      checked: todo.checked,
    });
  },
  addTodoAPI: async ({ text, color }: TodoType) => {
    await axios.post('todo', {
      text,
      color,
    });
  },
  deleteTodoAPI: async (id: number) => {
    await axios.delete('todo', {
      data: { id },
    });
  },
  updateTodoAPI: async (todo: TodoType) => {
    await axios.put('todo', {
      procDvcd: '1',
      id: todo.id,
      text: todo.text,
      color: todo.color,
    });
  },
};

export default todoApi;
