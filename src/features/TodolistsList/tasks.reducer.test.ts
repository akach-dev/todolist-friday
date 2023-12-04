import {
  tasksActions,
  tasksReducer,
  TasksStateType,
  tasksThunks,
  UpdateDomainTaskModelType,
} from "features/TodolistsList/tasks.reducer";
import { TaskPriorities, TaskStatuses, TaskType, TodolistType } from "api/todolists-api";
import { todolistsActions, todoListThunks } from "features/TodolistsList/todolists.reducer";

export type AddTodoListActionType = {
  type: string;
  payload: {
    todolist: TodolistType;
  };
};

export type RemoveTodoListActionType = {
  type: string;
  payload: {
    id: string;
  };
};

let startState: TasksStateType = {};
beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        todoListId: "todolistId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatuses.New,
        todoListId: "todolistId2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "2",
        title: "milk",
        status: TaskStatuses.Completed,
        todoListId: "todolistId2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatuses.New,
        todoListId: "todolistId2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
  };
});

test("correct task should be deleted from correct array", () => {
  type RemoveTasksActionType = {
    type: string;
    payload: {
      taskId: string;
      todolistId: string;
    };
  };

  const action: RemoveTasksActionType = {
    type: tasksThunks.removeTask.typePrefix,
    payload: {
      todolistId: "todolistId2",
      taskId: "2",
    },
  };

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(2);
  expect(endState["todolistId2"].every((t) => t.id !== "2")).toBeTruthy();
});
test("correct task should be added to correct array", () => {
  type AddTasksActionType = {
    type: string;
    payload: {
      task: TaskType;
    };
  };

  const action: AddTasksActionType = {
    type: tasksThunks.addTask.fulfilled.type,
    payload: {
      task: {
        todoListId: "todolistId2",
        title: "juce",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: 0,
        startDate: "",
        id: "id exists",
      },
    },
  };

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("juce");
  expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});
test("status of specified task should be changed", () => {
  type UpdateTasksActionType = {
    type: string;
    payload: {
      taskId: string;
      model: UpdateDomainTaskModelType;
      todolistId: string;
    };
  };

  const action: UpdateTasksActionType = {
    type: tasksThunks.updateTask.typePrefix,
    payload: {
      taskId: "2",
      model: { status: TaskStatuses.New },
      todolistId: "todolistId2",
    },
  };

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
  expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
});
test("title of specified task should be changed", () => {
  type UpdateTasksActionType = {
    type: string;
    payload: {
      taskId: string;
      model: UpdateDomainTaskModelType;
      todolistId: string;
    };
  };

  const action: UpdateTasksActionType = {
    type: tasksThunks.updateTask.typePrefix,
    payload: {
      taskId: "2",
      model: { title: "yogurt" },
      todolistId: "todolistId2",
    },
  };

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"][1].title).toBe("JS");
  expect(endState["todolistId2"][1].title).toBe("yogurt");
  expect(endState["todolistId2"][0].title).toBe("bread");
});
test("new array should be added when new todolist is added", () => {
  const action: AddTodoListActionType = {
    type: todoListThunks.addTodolist.typePrefix,
    payload: {
      todolist: {
        id: "blabla",
        title: "new todolist",
        order: 0,
        addedDate: "",
      },
    },
  };

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k != "todolistId1" && k != "todolistId2");
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});
test("propertry with todolistId should be deleted", () => {
  const action: RemoveTodoListActionType = {
    type: todoListThunks.removeTodolist.typePrefix,
    payload: {
      id: "todolistId2",
    },
  };

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});
test("empty arrays should be added when we set todolists", () => {
  type FetchToddListsActionType = {
    type: string;
    payload: {
      todolists: TodolistType[];
    };
  };

  const action: FetchToddListsActionType = {
    type: todoListThunks.fetchTodolists.typePrefix,
    payload: {
      todolists: [
        { id: "1", title: "title 1", order: 0, addedDate: "" },
        { id: "2", title: "title 2", order: 0, addedDate: "" },
      ],
    },
  };

  const endState = tasksReducer({}, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(2);
  expect(endState["1"]).toBeDefined();
  expect(endState["2"]).toBeDefined();
});
test("tasks should be added for todolist", () => {
  type FetchTasksActionType = {
    type: string;
    payload: {
      tasks: TaskType[];
      todolistId: string;
    };
  };

  const action: FetchTasksActionType = {
    type: tasksThunks.fetchTasks.fulfilled.type,
    payload: {
      tasks: startState["todolistId1"],
      todolistId: "todolistId1",
    },
  };

  const endState = tasksReducer(
    {
      todolistId2: [],
      todolistId1: [],
    },
    action
  );

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(0);
});
