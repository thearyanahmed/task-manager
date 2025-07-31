"use client"

import { Button } from "@/components/ui/button"
import { getPriorityColor, getStatusColor, formatDate } from "@/lib/utils"
import { Edit, Trash2, Calendar, Clock } from "lucide-react"

type Task = {
  id: string
  title: string
  description?: string
  status: "TODO" | "IN_PROGRESS" | "COMPLETED"
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT"
  dueDate?: string
  createdAt: string
  updatedAt: string
}

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onUpdateStatus: (id: string, data: Partial<Task>) => void
}

export function TaskCard({ task, onEdit, onDelete, onUpdateStatus }: TaskCardProps) {
  const handleStatusChange = (newStatus: Task['status']) => {
    onUpdateStatus(task.id, { status: newStatus })
  }

  const getNextStatus = (currentStatus: Task['status']): Task['status'] | null => {
    switch (currentStatus) {
      case "TODO":
        return "IN_PROGRESS"
      case "IN_PROGRESS":
        return "COMPLETED"
      case "COMPLETED":
        return "TODO"
      default:
        return null
    }
  }

  const nextStatus = getNextStatus(task.status)
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "COMPLETED"

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-medium text-gray-900 line-clamp-2">{task.title}</h4>
        <div className="flex space-x-1 ml-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => onEdit(task)}
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-red-500 hover:text-red-700"
            onClick={() => onDelete(task.id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">{task.description}</p>
      )}

      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
          {task.status.replace("_", " ")}
        </span>
      </div>

      {task.dueDate && (
        <div className={`flex items-center text-xs mb-3 ${isOverdue ? 'text-red-600' : 'text-gray-500'}`}>
          <Calendar className="h-3 w-3 mr-1" />
          <span>Due: {formatDate(task.dueDate)}</span>
          {isOverdue && <span className="ml-1 font-medium">(Overdue)</span>}
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          <span>Created {formatDate(task.createdAt)}</span>
        </div>
      </div>

      {nextStatus && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => handleStatusChange(nextStatus)}
          >
            Mark as {nextStatus.replace("_", " ")}
          </Button>
        </div>
      )}
    </div>
  )
}