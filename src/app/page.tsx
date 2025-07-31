"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { TaskList } from "@/components/task-list"
import { TaskForm } from "@/components/task-form"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Plus, LogOut, User } from "lucide-react"

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

export default function Home() {
  const { data: session, status } = useSession()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (session?.user) {
      fetchTasks()
    }
  }, [session])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/tasks")
      
      if (!response.ok) {
        throw new Error("Failed to fetch tasks")
      }
      
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      setError("Failed to load tasks. Please try again.")
      console.error("Error fetching tasks:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async (taskData: Partial<Task>) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      })

      if (!response.ok) {
        throw new Error("Failed to create task")
      }

      const newTask = await response.json()
      setTasks([newTask, ...tasks])
      setShowTaskForm(false)
    } catch (error) {
      setError("Failed to create task. Please try again.")
      console.error("Error creating task:", error)
    }
  }

  const handleUpdateTask = async (id: string, taskData: Partial<Task>) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      })

      if (!response.ok) {
        throw new Error("Failed to update task")
      }

      const updatedTask = await response.json()
      setTasks(tasks.map(task => task.id === id ? updatedTask : task))
      setEditingTask(null)
    } catch (error) {
      setError("Failed to update task. Please try again.")
      console.error("Error updating task:", error)
    }
  }

  const handleDeleteTask = async (id: string) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete task")
      }

      setTasks(tasks.filter(task => task.id !== id))
    } catch (error) {
      setError("Failed to delete task. Please try again.")
      console.error("Error deleting task:", error)
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Task Manager
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to manage your tasks
            </p>
          </div>
          <div className="space-y-4">
            <Button
              onClick={() => signIn("google")}
              className="w-full"
              variant="outline"
            >
              Sign in with Google
            </Button>
            <Button
              onClick={() => signIn("github")}
              className="w-full"
              variant="outline"
            >
              Sign in with GitHub
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-700">{session.user?.name}</span>
              </div>
              <Button
                onClick={() => signOut()}
                variant="outline"
                size="sm"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
            <Button
              onClick={() => setError(null)}
              variant="ghost"
              size="sm"
              className="mt-2"
            >
              Dismiss
            </Button>
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Your Tasks</h2>
          <Button
            onClick={() => setShowTaskForm(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Task</span>
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onEdit={setEditingTask}
            onDelete={handleDeleteTask}
            onUpdateStatus={handleUpdateTask}
          />
        )}

        {showTaskForm && (
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setShowTaskForm(false)}
          />
        )}

        {editingTask && (
          <TaskForm
            task={editingTask}
            onSubmit={(data) => handleUpdateTask(editingTask.id, data)}
            onCancel={() => setEditingTask(null)}
          />
        )}
      </main>
    </div>
  )
}