import React, {
  useReducer,
  createContext,
  Dispatch,
  useContext,
  useRef,
} from "react";

const initialTodos: Todo[] = [
  {
    id: 1,
    text: "프로젝트 생성하기",
    done: true,
  },
  {
    id: 2,
    text: "컴포넌트 스타일링하기",
    done: false,
  },
  {
    id: 3,
    text: "Context 만들기",
    done: false,
  },
  {
    id: 4,
    text: "기능 구현하기",
    done: false,
  },
];

type Action =
  | { type: "CREATE"; todo: Todo }
  | { type: "TOGGLE"; id: number }
  | { type: "REMOVE"; id: number };

const todoReducer = (state: Todo[], action: Action) => {
  switch (action.type) {
    case "CREATE":
      return state.concat(action.todo);
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
};

const TodoStateContext = createContext<Todo[]>([
  { id: -1, done: false, text: "" },
]);
const TodoDispatchContext = createContext<Dispatch<Action>>(() => null);
// ? 맞는지 모르겠음..
const TodoNextIdContext = createContext<React.MutableRefObject<number>>({
  current: 5,
});

export const TodoProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef<number>(5);
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
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

export const useTodoNextId = () => {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
};
