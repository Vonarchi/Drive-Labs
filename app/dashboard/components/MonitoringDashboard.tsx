"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface LogEntry {
  timestamp: string
  level: string
  message: string
  endpoint?: string
  clientIP?: string
  duration?: number
  success?: boolean
  error?: string
}

interface SecurityEvent {
  timestamp: string
  event: string
  ip: string
  details: any
}

export function MonitoringDashboard() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Mock data for demonstration
  useEffect(() => {
    const mockLogs: LogEntry[] = [
      {
        timestamp: new Date().toISOString(),
        level: "info",
        message: "API call completed",
        endpoint: "/api/build",
        clientIP: "192.168.1.1",
        duration: 1250,
        success: true
      },
      {
        timestamp: new Date(Date.now() - 30000).toISOString(),
        level: "info",
        message: "Vercel preview request received",
        endpoint: "/api/preview/vercel",
        clientIP: "192.168.1.2",
        duration: 2100,
        success: true
      },
      {
        timestamp: new Date(Date.now() - 60000).toISOString(),
        level: "error",
        message: "Error occurred",
        endpoint: "/api/build",
        clientIP: "192.168.1.3",
        error: "Safety validation failed"
      }
    ]

    const mockSecurityEvents: SecurityEvent[] = [
      {
        timestamp: new Date(Date.now() - 120000).toISOString(),
        event: "rate_limit_exceeded",
        ip: "192.168.1.4",
        details: { endpoint: "/api/build", limit: 5 }
      },
      {
        timestamp: new Date(Date.now() - 180000).toISOString(),
        event: "suspicious_content_detected",
        ip: "192.168.1.5",
        details: { filename: "malicious.js", pattern: "eval" }
      }
    ]

    setLogs(mockLogs)
    setSecurityEvents(mockSecurityEvents)
  }, [])

  const getLevelColor = (level: string) => {
    switch (level) {
      case "error": return "destructive"
      case "warn": return "secondary"
      case "info": return "default"
      default: return "outline"
    }
  }

  const getEventSeverity = (event: string) => {
    if (event.includes("rate_limit") || event.includes("suspicious")) return "destructive"
    if (event.includes("validation_failed")) return "secondary"
    return "outline"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Monitoring</CardTitle>
          <CardDescription>
            Real-time logs and security events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {logs.filter(l => l.success).length}
              </div>
              <div className="text-sm text-gray-600">Successful Requests</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {logs.filter(l => l.level === "error").length}
              </div>
              <div className="text-sm text-gray-600">Errors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {securityEvents.length}
              </div>
              <div className="text-sm text-gray-600">Security Events</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Logs */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Recent Logs</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {logs.map((log, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={getLevelColor(log.level)}>
                        {log.level.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="text-sm font-medium">{log.message}</div>
                    {log.endpoint && (
                      <div className="text-xs text-gray-600 mt-1">
                        {log.endpoint} • {log.clientIP}
                        {log.duration && ` • ${log.duration}ms`}
                      </div>
                    )}
                    {log.error && (
                      <div className="text-xs text-red-600 mt-1">{log.error}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Security Events */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Security Events</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {securityEvents.map((event, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={getEventSeverity(event.event)}>
                        {event.event.replace(/_/g, ' ').toUpperCase()}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="text-sm font-medium">
                      IP: {event.ip}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {JSON.stringify(event.details, null, 2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <Button 
              onClick={() => setIsLoading(true)}
              disabled={isLoading}
              variant="outline"
              size="sm"
            >
              {isLoading ? "Refreshing..." : "Refresh"}
            </Button>
            <Button variant="outline" size="sm">
              Export Logs
            </Button>
            <Button variant="outline" size="sm">
              View Full Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
