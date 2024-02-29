import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({ todo, setTodos }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const handleSave = (value: string) => {
    setTodos((todos) =>
      todos.map((x) => {
        if (todo.id === x.id) {
          return { ...todo, todo: value };
        }
        return x;
      })
    );
    setIsEditing(false);
  };

  const handleDone = () => {
    setTodos((todos) =>
      todos.map((x) => {
        if (todo.id === x.id) {
          return { ...todo, isdone: !x.isdone };
        }
        return x;
      })
    );
  };

  return (
    <div className="todos_single">
      {todo.isdone ? (
        <s className="todos_single--text">{todo.todo}</s>
      ) : isEditing ? (
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter")
              handleSave((e.target as HTMLInputElement).value);
          }}
          defaultValue={todo.todo}
          onBlur={(e) => handleSave(e.target.value)}
          className="todos_single--text"
          ref={inputRef}
        />
      ) : (
        <span className="todos_single--text">{todo.todo}</span>
      )}

      <div>
        <button
          type="button"
          className="icon"
          onClick={() => setIsEditing(true)}
          disabled={todo.isdone}
          style={{ cursor: !todo.isdone ? "pointer" : "default" }}
        >
          <AiFillEdit />
        </button>
        <button
          className="icon"
          onClick={() =>
            setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id))
          }
          style={{ cursor: !todo.isdone ? "pointer" : "default" }}
        >
          <AiFillDelete />
        </button>
        <button className="icon" onClick={handleDone}>
          <MdDone />
        </button>
      </div>
    </div>
    // </form>
  );
};

export default SingleTodo;
