"use client"
import React, { createContext, useContext, useState, useRef } from "react"

type Notification = {
  id: number;
  message: string;
  type: string;
  read: boolean;
}

type NotificationContextType = {
  notifications: Notification[];
  addNotification: (message: string, type?: string) => void;
  closeNotification: (id: number) => void;
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const notificationId = useRef(0)

  const addNotification = (message: string, type = "activity") => {
    notificationId.current += 1
    setNotifications((prev) => [
      { id: notificationId.current, message, type, read: false },
      ...prev,
    ])
  }

  const closeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, closeNotification, showNotifications, setShowNotifications }}>
      {children}
      {/* Notification Dropdown UI (if used globally) */}
      <div className="fixed bottom-6 right-6 z-[9999] space-y-2">
        {notifications.slice(0, 3).map((n) => (
          <div
            key={n.id}
            className={`px-6 py-4 rounded-xl shadow-xl flex items-center gap-4 min-w-[220px] max-w-xs
              ${n.type === 'success' ? 'bg-green-600 text-white' : n.type === 'error' || n.type === 'destructive' ? 'bg-red-600 text-white' : 'bg-gray-900 text-white'}`}
          >
            <span className="flex-1">{n.message}</span>
            <button onClick={() => closeNotification(n.id)} className="ml-2 text-white/80 hover:text-white font-bold">×</button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error("useNotification must be used within a NotificationProvider")
  return ctx
} 