import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import BrushIcon from '../public/static/svg/brush.svg';
import palette from '../styles/palette';
import { TodoType } from '../types/todo';
import Axios from 'axios';

const Container = styled.div`
  textarea {
    width: 100%;
    border-radius: 5px;
    border-width: medium;
    border-color: ${palette.gray};
    height: 40vh;
    margin-top: 12px;
    resize: both;
    outline: none;
    padding: 12px;
    font-size: 16px;
    overflow: auto;
  }

  .border-blue {
    border-color: ${palette.blue};
  }
  .border-green {
    border-color: ${palette.green};
  }
  .border-navy {
    border-color: ${palette.navy};
  }
  .border-orange {
    border-color: ${palette.orange};
  }
  .border-red {
    border-color: ${palette.red};
  }
  .border-yellow {
    border-color: ${palette.yellow};
  }
  .border-black {
    border-color: ${palette.black};
  }

  .add-todo-colors-wrapper {
    width: 100%;
    margin-top: 16px;
    display: flex;
    justify-content: space-between;

    .add-todo-color-list {
      display: flex;
      button {
        width: 24px;
        height: 24px;
        margin-right: 16px;
        border: 0;
        outline: 0;
        border-radius: 50%;
        &:last-child {
          margin: 0;
        }
      }

      .add-todo-selected-color {
        border: 2px solid black !important;
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

  padding: 16px;

  .add-todo-header-title {
    font-size: 21px;
  }

  .add-todo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .add-todo-submit-button {
      padding: 4px 8px;
      border: 1px solid black;
      border-radius: 5px;
      background-color: white;
      outline: none;
      font-size: 14px;
    }
  }
`;

interface IProps {
  todo: TodoType;
}

const UpdateTodo: React.FC<IProps> = ({ todo }) => {
  const [text, setText] = useState(todo.text);
  const [selectedColor, setSelectedColor] = useState(todo.color);
  const router = useRouter();
  return (
    <Container>
      <div className="add-todo-header">
        <h1 className="add-todo-header-title">Modify Todo</h1>
        <button
          type="button"
          className="add-todo-submit-button"
          onClick={async () => {
            await Axios.put('/api/todo/updateTodo', {
              ...todo,
              text,
              color: selectedColor,
            });
            router.replace('/');
          }}
        >
          수정하기
        </button>
      </div>
      <div className="add-todo-colors-wrapper">
        <div className="add-todo-color-list">
          {['red', 'orange', 'yellow', 'green', 'blue', 'navy'].map(
            (color, index) => (
              <>
                <button
                  key={index}
                  type="button"
                  className={`bg-${color} add-todo-color-button ${
                    color === selectedColor ? 'add-todo-selected-color' : ''
                  }`}
                  onClick={() => {
                    setSelectedColor(color as TodoType['color']);
                  }}
                />
              </>
            )
          )}
        </div>
        <BrushIcon />
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        placeholder="할 일을 입력해주세요."
        className={`border-${selectedColor}`}
      ></textarea>
    </Container>
  );
};

export default UpdateTodo;
