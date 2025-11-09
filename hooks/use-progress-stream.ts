"use client"

import { useEffect, useState } from "react"

export interface ProgressData {
  applied: number
  pending: number
  successfulResponses: number
  timestamp: Date
}

export function useProgressStream() {
  const [progress, setProgress] = useState<ProgressData | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let eventSource: EventSource | null = null

    const connect = () => {
      try {
        eventSource = new EventSource("/api/progress/stream")

        eventSource.onopen = () => {
          setIsConnected(true)
          setError(null)
        }

        eventSource.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            setProgress({
              ...data,
              timestamp: new Date(data.timestamp),
            })
          } catch (err) {
            console.error("Failed to parse progress data:", err)
          }
        }

        eventSource.onerror = () => {
          setIsConnected(false)
          setError("Connection lost")
          if (eventSource) {
            eventSource.close()
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to connect")
        setIsConnected(false)
      }
    }

    connect()

    return () => {
      if (eventSource) {
        eventSource.close()
      }
    }
  }, [])

  return { progress, isConnected, error }
}
