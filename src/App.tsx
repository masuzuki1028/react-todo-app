import React, { useState } from 'react';
import './App.css';
import styled from 'styled-components';

const Scontainer = styled.div`
  text-align: center;
`;

const Stitle = styled.h1`
  text-align: center;
  margin-top: 0;
  font-weight: bold;
`;

const SaddTak = styled.div`
  text-align: center;
  margin: 20px;
`;

const StaskInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 5px;
`;

const StaskButton = styled.button`
  border: 1px solid #ccc;
  padding: 5px;
  background-color: #dcdcdc;
`;

const SearchTitle = styled.div`
  text-align: center;
  margin: 20px;
`;

const StodoArea = styled.div`
  display: flex;
  text-align: center;
  margin: 20px;
  justify-content: center;
`;

const Sthead = styled.thead`
  text-align: center;
  margin: 20px;
`;

const StodoDataTitle = styled.td`
  padding: 10px;
  border: 2px solid #ccc;
  font-weight: bold;
`;

const StodoData = styled.td<{ done: boolean }>`
  padding: 10px;
  border: 2px solid #ccc;
  text-align: center;
  background-color: ${({ done }) => (done ? 'gray' : 'white')};
`;

const StodoButton = styled.button`
  border: 1px solid #ccc;
  padding: 5px;
  background-color: #dcdcdc;
  margin: 5px;
`;


type Todo = {
  text: string;
  description: string;
  done: boolean;
};


function App() {
  const todos: Todo[] = [];
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [incompleteTodos, setIncompleteTodos] = useState<Todo[]>([]);
  const [searchTitle, setSearchTitle] = useState("");


  const onChangeTodoText = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)
  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)
  
  const onClickAdd = () => {
    if(text === "") return;
    const newTodos = {...todos,text: text, description: description, done: false}
    setIncompleteTodos([...incompleteTodos, newTodos])
    setText("")
    setDescription("")
  }

  const onClickComplate = (index: number) => {
    const newTodos = [...incompleteTodos]
    newTodos[index].done = true
    setIncompleteTodos(newTodos)
  }

  const onClickInComplate = (index: number) => {
    const newTodos = [...incompleteTodos]
    newTodos[index].done = false
    setIncompleteTodos(newTodos)
  }

  const onClickDelete = (index: number) => {
    const newTodos = [...incompleteTodos]
    newTodos.splice(index, 1)
    setIncompleteTodos(newTodos)
  }

  const searchTodos = incompleteTodos.filter((todo) => {
    return todo.text.includes(searchTitle)
  })

  return (
    <>
    <Scontainer>
      <Stitle>React Todo App</Stitle>
      <SaddTak>
        <label>タスク名: 
          <StaskInput placeholder='task name' value={text} onChange={onChangeTodoText} />
        </label>
        <label>説明: 
          <StaskInput placeholder='description' value={description} onChange={onChangeDescription}/>
        </label>
        <StaskButton onClick={(event: React.MouseEvent<HTMLButtonElement>) => onClickAdd()}>追加</StaskButton>
      </SaddTak>
      <SearchTitle>
        <label>検索: 
        <StaskInput placeholder='search' value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)}/>
        </label>
      </SearchTitle>
      <StodoArea>
        <table>
        <Sthead>
            <tr>
              <StodoDataTitle>ID</StodoDataTitle>
              <StodoDataTitle>タスク名</StodoDataTitle>
              <StodoDataTitle>詳細</StodoDataTitle>
              <StodoDataTitle>ステータス</StodoDataTitle>
              <StodoDataTitle>操作</StodoDataTitle>
            </tr>
        </Sthead>
        {searchTodos.map((todo, index) => (
          <tr key={index}>
              <StodoData done={todo.done}>{index + 1}</StodoData>
              <StodoData done={todo.done}>{todo.text}</StodoData>
              <StodoData done={todo.done}>{todo.description}</StodoData>
              <StodoData done={todo.done}>{todo.done ? '完了' : '未完了'}</StodoData>
              <StodoData done={todo.done}>
                <StodoButton onClick={() => onClickComplate(index)}>完了</StodoButton>
                <StodoButton onClick={() => onClickInComplate(index)}>戻す</StodoButton>
                <StodoButton onClick={() => onClickDelete(index)}>削除</StodoButton>
              </StodoData>
          </tr>
        ))}
        </table>
      </StodoArea>
      </Scontainer>
    </>
  );
}

export default App;
