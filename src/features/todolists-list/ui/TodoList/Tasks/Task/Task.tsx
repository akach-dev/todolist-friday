import React, { ChangeEvent } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { EditableSpan } from "common/components";
import { TaskStatuses } from "common/enums";
import { TaskType } from "features/todolists-list/api/tasks/tasksApi.types";
import { useActions } from "common/hooks";
import { tasksThunks } from "features/todolists-list/model/tasks/tasksSlice";
import s from "features/todolists-list/ui/TodoList/Tasks/Task/Task.module.css";

export const Task = React.memo(({ task, todolistId }: { task: TaskType; todolistId: string }) => {
  const { removeTask, updateTask } = useActions(tasksThunks);

  const removeTaskHandler = () => removeTask({ taskId: task.id, todolistId });

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
    updateTask({ taskId: task.id, todolistId, domainModel: { status } });
  };

  const changeTaskTitleHandler = (title: string) => updateTask({ taskId: task.id, todolistId, domainModel: { title } });

  return (
    <div key={task.id} className={task.status === TaskStatuses.Completed ? s.isDone : ""}>
      <Checkbox checked={task.status === TaskStatuses.Completed} color="primary" onChange={changeTaskStatusHandler} />

      <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});
