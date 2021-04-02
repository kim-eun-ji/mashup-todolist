# [My First TodoList](https://mashup-todolist.web.app/)

This project is my first project with react + typescript.

[벨로퍼트와 함께하는 모던 리액트](https://react.vlpt.us/) 3장 실습 내용이 담긴 프로젝트입니다.

기존 예제 + typescript + firebase

## 라이브러리

---

정리예정,.

## 컴포넌트

---

### `TodoTemplate`

투두리스트의 레이아웃을 설정하는 컴포넌트입니다.

### `TodoHead`

투두리스트 상단 부분을 표현합니다.  
오늘 날짜, 요일 및 남은 todo의 개수를 표현합니다.

### `TodoList`

todo 정보가 들어있는 todos 배열을 내장함수 `map`을 사용하여 여러개의 todoItem 컴포넌트를 렌더링합니다.

### `TodoItem`

각 todo에 대한 정보를 렌더랑 하는 컴포넌트입니다.  
좌측 원형의 체크박스 클릭시 완료 여부를 toggle합니다.  
완료시 css에 변화가 생기고, 마우스 오버시 삭제 아이콘이 나타납니다.

### `TodoCreate`

새 todo를 등록하는 컴포넌트입니다.  
`TodoTemplate`의 하단부에 초록색 원 버튼을 렌더링 하며, 클릭 시 입력 폼이 나타납니다.
