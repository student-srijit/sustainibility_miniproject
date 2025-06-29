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
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error("useNotification must be used within a NotificationProvider")
  return ctx
} 