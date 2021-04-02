import React, {
  useReducer,
  createContext,
  Dispatch,
  useContext,
  useState,
} from "react";
import { useEffect } from "react";
import { firestore } from "./firebase";

const TODO_COLLECTION_ID = "todo";

let initialTodos: Todo[] = [];

type Action =
  | { type: "CREATE"; todo: Todo }
  | { type: "TOGGLE"; todo?: Todo[] }
  | { type: "REMOVE"; id: string }
  | { type: "GET_TODO"; todo?: Todo[] }
  | { type: "fetchError"; error: any }
  | { type: "UPDATE"; todo?: Todo[] };

//useReducer는 기본적으로 '비동기 로직'을 포함하는 '비동기 액션'을 dispatch 하지않음
//대신, 비동기 함수를 dispatch 이전에 호출해서 비동기 로직을 실행하고, 그 결과 값을 dispatch함
const todoReducer = (state: Todo[], action: Action) => {
  switch (action.type) {
    case "CREATE":
      // firestore
      //   .collection("todo")
      //   .add({ // 데이터 추가
      //     id: action.todo.id,
      //     done: action.todo.done,
      //     text: action.todo.text,
      //   })
      //   .then((res) => { // 추가된 데이터와 관련된 정보가 전달됨

      //   })

      return state.concat(action.todo);
    case "TOGGLE":
      return state;
    // return state.map((todo) =>
    //   todo.id === action.todo.id ? { ...todo, done: !todo.done } : todo
    // );
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id);
    case "UPDATE":
      if (action.todo) state = action.todo;
      return state;
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
};

const TodoStateContext = createContext<Todo[]>([
  { id: "", done: false, text: "" },
]);
const TodoDispatchContext = createContext<Dispatch<Action>>(() => null);

export async function getTodos() {
  try {
    const data = await firestore.collection(TODO_COLLECTION_ID).get();
    const todos: Todo[] = await data.docs.map((doc) => {
      return {
        id: doc.id,
        done: doc.data().done,
        text: doc.data().text,
      };
    });
    return { isError: false, todo: todos };
  } catch (error) {
    return { isError: true, error: error };
  }
}

export async function updateTodo(id: string, done: boolean) {
  try {
    await firestore
      .collection(TODO_COLLECTION_ID)
      .doc(id)
      .update({ done: !done });
    return await getTodos();
  } catch (error) {
    return { isError: true, error: error };
  }
}

export async function deleteTodo(id: string) {
  try {
    await firestore.collection(TODO_COLLECTION_ID).doc(id).delete();
    return await getTodos();
  } catch (error) {
    return { isError: true, error: error };
  }
}

export async function createTodo({ done, text }: Todo) {
  try {
    await firestore.collection(TODO_COLLECTION_ID).add({
      // 데이터 추가
      done: done,
      text: text,
    });
    return await getTodos();
  } catch (error) {
    return { isError: true, error: error };
  }
}

export const TodoProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  // const nextId = useRef<number>(state.length + 1);
  useEffect(() => {
    getTodos().then((todoData) => {
      dispatch({ type: "UPDATE", todo: todoData.todo });
    });
  }, []);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};

// 컴포넌트에서 useContext 를 직접 사용하는 대신, useContext를 사용하는 커스텀 Hook를 만들어 내보냄
// 커스텀hook(useTodoState)을 사용하기 위해선 이 컴포넌트가 TodoProvider 내부에 렌더링 되어있어야 함. 따라서 감싸져 있지 않다면 에러 발생시킨다.
export const useTodoState = () => {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return useContext(TodoStateContext);
};

export const useTodoDispatch = () => {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
};
