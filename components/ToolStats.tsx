"use client"

import { useEffect, useState } from "react"

export function ToolStats({ toolId }: { toolId: string }) {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    fetch(`https://api.tinks.app/tools/${toolId}/usage`)
      .then((res) => res.json())
      .then((data) => setCount(data.usage))
      .catch(() => setCount(null))
  }, [toolId])

  return (
    <div className="fixed bottom-4 right-4 bg-muted text-sm px-3 py-2 rounded shadow">
      {count !== null ? `Used ${count} times` : "Loading..."}
    </div>
  )
}

