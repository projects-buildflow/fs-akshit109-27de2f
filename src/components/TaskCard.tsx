import Image from "next/image";
import PriorityBadge from "@/components/PriorityBadge";
import { Task } from "@/types/task";

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      {/* Priority */}
      <div className="mb-3">
        <PriorityBadge priority={task.priority} />
      </div>

      {/* Title */}
      <h2 className="text-lg font-bold text-gray-900">
        {task.title}
      </h2>

      {/* Description */}
      {task.description && (
        <p className="mt-2 line-clamp-2 text-sm text-gray-600">
          {task.description}
        </p>
      )}

      {/* Footer */}
      {task.assignee && (
        <div className="mt-5 flex items-center gap-3">
          {task.assignee.avatar ? (
            <Image
              src={task.assignee.avatar}
              alt={task.assignee.name}
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
              {task.assignee.name.charAt(0)}
            </div>
          )}

          <span className="text-sm font-medium text-gray-700">
            {task.assignee.name}
          </span>
        </div>
      )}
    </div>
  );
};

export default TaskCard;