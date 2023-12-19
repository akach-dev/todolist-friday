import React, { ChangeEvent, useCallback } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { TaskType } from "features/todolistsList/todolists.api";
import { EditableSpan } from "common/components";
import { TaskStatuses } from "common/enums";

export const Task = React.memo(
  ({
    task,
    removeTask,
    changeTaskTitle,
    changeTaskStatus,
    todolistId,
  }: {
    task: TaskType;
    todolistId: string;
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void;
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
    removeTask: (taskId: string, todolistId: string) => void;
  }) => {
    const onClickHandler = useCallback(() => removeTask(task.id, todolistId), [task.id, todolistId]);

    const onChangeHandler = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId);
      },
      [task.id, todolistId],
    );

    const onTitleChangeHandler = useCallback(
      (newValue: string) => {
        changeTaskTitle(task.id, newValue, todolistId);
      },
      [task.id, todolistId],
    );

    return (
      <div key={task.id} className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
        <Checkbox checked={task.status === TaskStatuses.Completed} color="primary" onChange={onChangeHandler} />

        <EditableSpan value={task.title} onChange={onTitleChangeHandler} />
        <IconButton onClick={onClickHandler}>
          <Delete />
        </IconButton>
      </div>
    );
  },
);
