import React, { ChangeEvent, useCallback } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { EditableSpan } from "common/components";
import { TaskStatuses } from "common/enums";
import { TaskType } from "features/todolists-List/api/tasks/tasksApi.types";
import { useActions } from "common/hooks";
import { tasksThunks } from "features/todolists-List/model/tasks/tasksSlice";
import s from ".//Task.module.css";

type Props = {
  task: TaskType;
  todolistId: string;
  changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void;
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
};

export const Task = React.memo(({ task, changeTaskTitle, changeTaskStatus, todolistId }: Props) => {
  const { removeTask } = useActions(tasksThunks);

  const removeTaskHandler = useCallback(
    () => removeTask({ taskId: task.id, todolistId: todolistId }),
    [task.id, todolistId],
  );

  const changeTaskHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked;
      changeTaskStatus(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId);
    },
    [task.id, todolistId],
  );

  const changeTaskTitleHandler = useCallback(
    (newValue: string) => {
      changeTaskTitle(task.id, newValue, todolistId);
    },
    [task.id, todolistId],
  );

  return (
    <div key={task.id} className={task.status === TaskStatuses.Completed ? s.isDone : ""}>
      <Checkbox checked={task.status === TaskStatuses.Completed} color="primary" onChange={changeTaskHandler} />

      <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});
