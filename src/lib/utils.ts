import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string | null): string {
  if (!date) return ""
  
  const d = new Date(date)
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function formatDateTime(date: Date | string | null): string {
  if (!date) return ""
  
  const d = new Date(date)
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case "URGENT":
      return "bg-red-100 text-red-800 border-red-200"
    case "HIGH":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "MEDIUM":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "LOW":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "COMPLETED":
      return "bg-green-100 text-green-800 border-green-200"
    case "IN_PROGRESS":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "TODO":
      return "bg-gray-100 text-gray-800 border-gray-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}