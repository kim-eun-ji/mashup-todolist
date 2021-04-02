import React from "react";
import styled, { css } from "styled-components";
import { MdDone, MdDelete } from "react-icons/md";
import { useTodoDispatch } from "../TodoContext";

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div<{ done: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

// <{ done: boolean }> 이게 최선인지.. 이렇게 하면 만약 Todo안의 done을 다른 타입으로 바꾸면 여기도 별도로 찾아서 바꿔줘야함
const Text = styled.div<{ done: boolean }>`
  flex: 1;
  font-size: 21px;
  color: ${(props) => {
    return props.done ? "#495057" : "#ced4da";
  }};
`;

const TodoItem: React.FC<Todo> = ({ id, done, text }) => {
  const dispatch = useTodoDispatch();
  const onToggle = () => dispatch({ type: "TOGGLE", id: id });
  const onRemove = () => dispatch({ type: "REMOVE", id: id });
  return (
    <TodoItemBlock onClick={onToggle}>
      <CheckCircle done={done}>{done && <MdDone />}</CheckCircle>
      <Text done={done}>{text}</Text>
      <Remove onClick={onRemove}>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
};

// memo를 사용하여 다른 항목이 업데이트 될 때, 불필요한 리렌더링을 방지하게 되어 성능을 최적화 가능
export default React.memo(TodoItem);
