import Column from "@/components/Column";
import TaskCard from "@/components/TaskCard";
import { Column as ColumnType, Task } from "@/types/task";

const columns: ColumnType[] = [
  {
    id: "todo",
    title: "To Do",
    color: "#6366f1",
    taskIds: [],
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "#f59e0b",
    taskIds: [],
  },
  {
    id: "done",
    title: "Done",
    color: "#22c55e",
    taskIds: [],
  },
];

const sampleTask: Task = {
  id: "1",
  title: "Implement user authentication",
  description: "Add login and registration with JWT tokens",
  priority: "high",
  columnId: "todo",
  assignee: {
    id: "1",
    name: "John Doe",
  },
  createdAt: new Date().toISOString(),
};

const Board = () => {
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-6 p-4">
        
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            taskCount={1}
          >
            <TaskCard task={sampleTask} />
          </Column>
        ))}

      </div>
    </div>
  );
};

export default Board;