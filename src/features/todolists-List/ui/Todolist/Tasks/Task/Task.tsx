import React, { ChangeEvent, useCallback } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { EditableSpan } from "common/components";
import { TaskStatuses } from "common/enums";
import { TaskType } from "features/todolists-List/api/tasks/tasksApi.types";
import { useActions } from "common/hooks";
import { tasksThunks } from "features/todolists-List/model/tasks/tasksSlice";
import s from "features/todolists-List/ui/Todolist/Tasks/Task/Task.module.css";

type Props = {
  task: TaskType;
  todolistId: string;
};

export const Task = React.memo(({ task, todolistId }: Props) => {
  const { removeTask, updateTask } = useActions(tasksThunks);

  const removeTaskHandler = useCallback(
    () => removeTask({ taskId: task.id, todolistId: todolistId }),
    [task.id, todolistId],
  );

  const changeTaskHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
      updateTask({
        taskId: task.id,
        todolistId,
        domainModel: { status },
      });
    },
    [task.id, todolistId],
  );

  const changeTaskTitleHandler = useCallback(
    (newValue: string) => {
      updateTask({ taskId: task.id, todolistId, domainModel: { title: newValue } });
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
