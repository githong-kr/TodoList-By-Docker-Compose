import React, { useMemo, useCallback, useState, SyntheticEvent } from 'react';
import Axios from 'axios';
import { useRouter } from 'next/router';
import { useSelector } from '../store';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import palette from '../styles/palette';
import { TodoType } from '../types/todo';
import TrashCanIcon from '../public/static/svg/trash_can.svg';
import CheckMarkIcon from '../public/static/svg/check_mark.svg';
import EditIcon from '../public/static/svg/edit.svg';
import { todoActions } from '../store/todo';

const Container = styled.div`
  width: 100%;

  .todo-num {
    margin-left: 12px;
  }

  .todo-list-header {
    position: sticky;
    height: 8vh;
    top: 52px;
    padding: 12px;
    border-bottom: 1px solid ${palette.gray};

    .todo-list-last-todo {
      font-size: 14px;
      margin-bottom: 8px;
      span {
        margin-left: 8px;
      }
    }
  }

  .todo-list-header-colors {
    display: flex;
    .todo-list-header-color-num {
      display: flex;
      margin-right: 8px;
      p {
        font-size: 14px;
        line-height: 16px;
        margin: 0;
        margin-left: 6px;
      }
      .todo-list-header-round-color {
        width: 16px;
        height: 16px;
        border-radius: 50%;
      }
    }
  }

  .bg-blue {
    background-color: ${palette.blue};
  }
  .bg-green {
    background-color: ${palette.green};
  }
  .bg-navy {
    background-color: ${palette.navy};
  }
  .bg-orange {
    background-color: ${palette.orange};
  }
  .bg-red {
    background-color: ${palette.red};
  }
  .bg-yellow {
    background-color: ${palette.yellow};
  }
  .bg-black {
    background-color: ${palette.black};
  }

  .todo-list-wrapper {
    overflow: auto;
    height: 67vh;
    .todo-list {
      .todo-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 52px;
        border-bottom: 1px solid ${palette.gray};

        .todo-left-side {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          .todo-color-block {
            width: 12px;
            height: 100%;
          }
          .checked-todo-text {
            color: ${palette.gray};
            text-decoration: line-through;
          }
          .todo-text {
            margin-left: 12px;
            font-size: 16px;
          }
        }

        .todo-right-side {
          display: flex;
          margin-right: 12px;
          svg {
            &:first-child {
              margin-right: 16px;
            }
          }

          .todo-trash-can {
            width: 24px;
            path {
              fill: ${palette.deep_red};
            }
          }
          .todo-check-mark {
            fill: ${palette.deep_green};
          }
          .todo-edit {
            fill: ${palette.deep_green};
          }
        }
      }
    }
  }
`;

type ObjectIndexType = {
  [key: string]: number | undefined;
};

const TodoList: React.FC = () => {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();
  const router = useRouter();

  const checkTodo = async (checkedTodo: TodoType) => {
    try {
      Axios.put('/api/todo/checkTodo', {
        ...checkedTodo,
      });

      const newTodos = todos
        .map((todo) => {
          if (todo.id === checkedTodo.id) {
            return { ...todo, checked: (todo.checked + 1) % 2 };
          }
          return todo;
        })
        .sort((a, b) => {
          if (a.id < b.id) {
            return -1;
          } else {
            return 1;
          }
        })
        .sort((a, b) => {
          if (a.checked < b.checked) {
            return -1;
          } else {
            return 1;
          }
        });

      dispatch(todoActions.setTodo(newTodos));
      console.log('checked');
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const deleteTodo = async (deletedTodoId: TodoType['id']) => {
    try {
      // await todoApi.deleteTodoAPI(deletedTodoId);
      Axios.put('/api/todo/removeTodo', {
        id: deletedTodoId,
      });

      const newTodos = todos.filter((todo) => todo.id !== deletedTodoId);
      dispatch(todoActions.setTodo(newTodos));
      console.log('deleted');
    } catch (e) {
      throw e;
    }
  };

  const todoColorNums = useMemo(() => {
    const colors: ObjectIndexType = {};
    todos
      .filter((todo) => todo.checked === 0)
      .forEach((todo) => {
        const value = colors[todo.color];
        if (!value) {
          colors[`${todo.color}`] = 1;
        } else {
          colors[`${todo.color}`] = value + 1;
        }
      });
    return colors;
  }, [todos]);

  return (
    <Container>
      <div className="todo-list-header">
        <p className="todo-list-last-todo">
          남은 TODO{' '}
          <span>{todos.filter((todo) => todo.checked === 0).length}개</span>
        </p>
        <div className="todo-list-header-colors">
          {Object.keys(todoColorNums).map((color, index) => (
            <div className="todo-list-header-color-num" key={index}>
              <div className={`todo-list-header-round-color bg-${color}`} />
              <p>{todoColorNums[color]}개</p>
            </div>
          ))}
        </div>
      </div>

      <div className="todo-list-wrapper">
        <ul className="todo-list">
          {todos.map((todo) => (
            <li
              className="todo-item"
              key={todo.id}
              onClick={() => {
                checkTodo(todo);
              }}
            >
              <div className="todo-left-side">
                <div className={`todo-color-block bg-${todo.color}`} />
                <p
                  className={`todo-text ${
                    todo.checked === 1 ? 'checked-todo-text' : ''
                  }`}
                >
                  {todo.text}
                </p>
              </div>
              <div className="todo-right-side">
                <EditIcon
                  className="todo-edit"
                  onClick={(e: SyntheticEvent) => {
                    e.stopPropagation();
                    router.push({
                      pathname: '/todo/update',
                      query: {
                        id: todo.id,
                        text: todo.text,
                        color: todo.color,
                      },
                    });
                    //router.replace('/');
                  }}
                />
                {todo.checked === 1 && (
                  <>
                    <TrashCanIcon
                      className="todo-trash-can"
                      onClick={(e: SyntheticEvent) => {
                        e.stopPropagation();
                        deleteTodo(todo.id);
                        //router.replace('/');
                      }}
                    />
                    {/* <CheckMarkIcon
                      className="todo-check-mark"
                      onClick={() => {
                        checkTodo(todo);
                        //router.replace('/');
                      }}
                    /> */}
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default TodoList;
