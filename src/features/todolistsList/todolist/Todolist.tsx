import React, { useCallback, useEffect } from "react";
import { Delete } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { Task } from "./task/Task";
import { FilterValuesType, TodolistDomainType } from "features/todolistsList/todolists.reducer";
import { tasksThunks } from "features/todolistsList/tasks.reducer";
import { TaskType } from "features/todolistsList/todolists.api";
import { TaskStatuses } from "common/enums";
import { useAppDispatch } from "common/hooks";
import { AddItemForm, EditableSpan } from "common/components";

export const Todolist = React.memo(function ({
  todolist,
  removeTodolist,
  removeTask,
  addTask,
  tasks,
  changeTaskTitle,
  changeTaskStatus,
  changeTodolistTitle,
  changeFilter,
}: {
  todolist: TodolistDomainType;
  tasks: TaskType[];
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void;
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
  removeTask: (taskId: string, todolistId: string) => void;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(tasksThunks.fetchTasks(todolist.id));
  }, []);

  const addTaskHandler = useCallback(
    (title: string) => {
      addTask(title, todolist.id);
    },
    [addTask, todolist.id],
  );

  const removeTodolistHandler = () => {
    removeTodolist(todolist.id);
  };

  const changeTodolistTitleHandler = useCallback(
    (title: string) => {
      changeTodolistTitle(todolist.id, title);
    },
    [todolist.id, changeTodolistTitle],
  );

  const onAllClickHandler = useCallback(() => changeFilter("all", todolist.id), [todolist.id, changeFilter]);
  const onActiveClickHandler = useCallback(() => changeFilter("active", todolist.id), [todolist.id, changeFilter]);
  const onCompletedClickHandler = useCallback(
    () => changeFilter("completed", todolist.id),
    [todolist.id, changeFilter],
  );

  let tasksForTodolist = tasks;

  if (todolist.filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <div>
      <h3>
        <EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler} />
        <IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskHandler} disabled={todolist.entityStatus === "loading"} />
      <div>
        {tasksForTodolist.map((t) => (
          <Task
            key={t.id}
            task={t}
            todolistId={todolist.id}
            removeTask={removeTask}
            changeTaskTitle={changeTaskTitle}
            changeTaskStatus={changeTaskStatus}
          />
        ))}
      </div>
      <div style={{ paddingTop: "10px" }}>
        <Button variant={todolist.filter === "all" ? "outlined" : "text"} onClick={onAllClickHandler} color={"inherit"}>
          All
        </Button>
        <Button
          variant={todolist.filter === "active" ? "outlined" : "text"}
          onClick={onActiveClickHandler}
          color={"primary"}
        >
          Active
        </Button>
        <Button
          variant={todolist.filter === "completed" ? "outlined" : "text"}
          onClick={onCompletedClickHandler}
          color={"secondary"}
        >
          Completed
        </Button>
      </div>
    </div>
  );
});
