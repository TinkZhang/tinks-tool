"use client"

import { useEffect, useState } from "react"
import { ToolNavigation } from "@/components/ToolNavigation"
import { ToolStats } from "@/components/ToolStats"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function TimePage() {
  const [date, setDate] = useState(new Date())
  const [copied, setCopied] = useState(false)

  // epoch -> time
  const [epochInput, setEpochInput] = useState("")
  const [parsedDate, setParsedDate] = useState<Date | null>(null)

  // 每秒更新时间
  useEffect(() => {
    const timer = setInterval(() => {
      setDate((prev) => new Date(prev.getTime() + 1000))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // 调整时间
  const adjust = (part: string, delta: number) => {
    const newDate = new Date(date)
    switch (part) {
      case "year":
        newDate.setFullYear(date.getFullYear() + delta)
        break
      case "month":
        newDate.setMonth(date.getMonth() + delta)
        break
      case "day":
        newDate.setDate(date.getDate() + delta)
        break
      case "hour":
        newDate.setHours(date.getHours() + delta)
        break
      case "minute":
        newDate.setMinutes(date.getMinutes() + delta)
        break
      case "second":
        newDate.setSeconds(date.getSeconds() + delta)
        break
    }
    setDate(newDate)
  }

  const formatNumber = (num: number, len = 2) => String(num).padStart(len, "0")

  const year = date.getFullYear()
  const month = formatNumber(date.getMonth() + 1)
  const day = formatNumber(date.getDate())
  const hour = formatNumber(date.getHours())
  const minute = formatNumber(date.getMinutes())
  const second = formatNumber(date.getSeconds())

  const formatted = `${year}-${month}-${day} ${hour}:${minute}:${second}`
  const epoch = Math.floor(date.getTime() / 1000)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(epoch.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  // 监听输入变化
  useEffect(() => {
    if (!epochInput) {
      setParsedDate(null)
      return
    }
    const num = Number(epochInput)
    if (!isNaN(num) && num > 0) {
      setParsedDate(new Date(num * 1000))
    } else {
      setParsedDate(null)
    }
  }, [epochInput])

  const formatDate = (d: Date) => {
    const y = d.getFullYear()
    const m = formatNumber(d.getMonth() + 1)
    const da = formatNumber(d.getDate())
    const h = formatNumber(d.getHours())
    const mi = formatNumber(d.getMinutes())
    const s = formatNumber(d.getSeconds())
    return `${y}-${m}-${da} ${h}:${mi}:${s}`
  }

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">⏰ Time</h1>
        <ToolNavigation />
      </header>

      {/* 时间 → Epoch */}
      <Card>
        <CardHeader>
          <CardTitle>🕒 Current Time → Epoch</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          {/* 最上面显示完整时间 */}
          <div className="text-2xl font-mono font-semibold">
            {formatted}
          </div>

          {/* 带按钮的时间调节 */}
          <div className="flex space-x-4 text-xl font-mono">
            <TimePart label="year" value={year} onAdjust={adjust} />
            <TimePart label="month" value={month} onAdjust={adjust} />
            <TimePart label="day" value={day} onAdjust={adjust} />
            <TimePart label="hour" value={hour} onAdjust={adjust} />
            <TimePart label="minute" value={minute} onAdjust={adjust} />
            <TimePart label="second" value={second} onAdjust={adjust} />
          </div>

          {/* Epoch 时间 + 复制 */}
          <div className="flex items-center space-x-4">
            <span className="font-mono text-2xl font-bold">📅 {epoch}</span>
            <Button
              size="lg"
              onClick={copyToClipboard}
              className={copied ? "bg-green-500 text-white" : ""}
            >
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Epoch → 时间 */}
      <Card>
        <CardHeader>
          <CardTitle>🔢 Epoch → Time</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Input
            placeholder="Enter epoch seconds..."
            value={epochInput}
            onChange={(e) => setEpochInput(e.target.value)}
            className="w-64 text-center font-mono"
          />
          {parsedDate ? (
            <div className="text-lg font-mono">
              📆 {formatDate(parsedDate)}
            </div>
          ) : epochInput ? (
            <div className="text-red-500">⚠️ Invalid epoch</div>
          ) : null}
        </CardContent>
      </Card>

      <ToolStats toolId="time" />
    </main>
  )
}

function TimePart({
  label,
  value,
  onAdjust,
}: {
  label: string
  value: string | number
  onAdjust: (part: string, delta: number) => void
}) {
  return (
    <div className="flex flex-col items-center">
      <Button size="sm" variant="outline" onClick={() => onAdjust(label, 1)}>
        +
      </Button>
      <span className="px-2">{value}</span>
      <Button size="sm" variant="outline" onClick={() => onAdjust(label, -1)}>
        -
      </Button>
    </div>
  )
}
