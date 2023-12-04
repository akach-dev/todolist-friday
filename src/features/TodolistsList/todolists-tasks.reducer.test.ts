import { TodolistDomainType, todolistsReducer, todoListThunks } from "features/TodolistsList/todolists.reducer";
import { tasksReducer, TasksStateType } from "features/TodolistsList/tasks.reducer";
import { TodolistType } from "api/todolists-api";
import { AddTodoListActionType } from "features/TodolistsList/tasks.reducer.test";

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistDomainType> = [];

  let todolist: TodolistType = {
    title: "new todolist",
    id: "any id",
    addedDate: "",
    order: 0,
  };

  const action: AddTodoListActionType = {
    type: todoListThunks.addTodolist.typePrefix,
    payload: {
      todolist,
    },
  };

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});
