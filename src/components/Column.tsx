"use client";

import React from "react";
import { Column as ColumnType } from "@/types/task";

interface ColumnProps {
  column: ColumnType;
  taskCount: number;
  children: React.ReactNode;
  onAddTask?: () => void;
}

const Column: React.FC<ColumnProps> = ({
  column,
  taskCount,
  children,
  onAddTask,
}) => {
  return (
    <div className="flex w-80 flex-col rounded-2xl bg-gray-100 p-4 shadow-sm">
      
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          
          {/* Color Dot */}
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: column.color }}
          />

          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-800">
            {column.title}
          </h2>

          {/* Count Badge */}
          <span className="rounded-full bg-gray-300 px-2 py-0.5 text-xs font-medium text-gray-700">
            {taskCount}
          </span>
        </div>
      </div>

      {/* Task Area */}
      <div className="flex-1 space-y-3 overflow-y-auto">
        {children}
      </div>

      {/* Footer */}
      <button
        onClick={onAddTask}
        className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-white py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
      >
        <span className="text-lg">+</span>
        Add Task
      </button>
    </div>
  );
};

export default Column;