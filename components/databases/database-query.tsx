"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Play } from "lucide-react"

export function DatabaseQuery() {
  const [query, setQuery] = useState("SELECT * FROM users LIMIT 10;")
  const [results, setResults] = useState<any[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const executeQuery = () => {
    setIsLoading(true)
    setError(null)

    // Simulate query execution
    setTimeout(() => {
      setIsLoading(false)

      if (query.toLowerCase().includes("select")) {
        // Mock results for SELECT queries
        setResults([
          { id: 1, name: "John Doe", email: "john@example.com", created_at: "2023-01-15" },
          { id: 2, name: "Jane Smith", email: "jane@example.com", created_at: "2023-02-20" },
          { id: 3, name: "Bob Johnson", email: "bob@example.com", created_at: "2023-03-10" },
          { id: 4, name: "Alice Brown", email: "alice@example.com", created_at: "2023-04-05" },
          { id: 5, name: "Charlie Davis", email: "charlie@example.com", created_at: "2023-05-01" },
        ])
      } else if (
        query.toLowerCase().includes("insert") ||
        query.toLowerCase().includes("update") ||
        query.toLowerCase().includes("delete")
      ) {
        // Mock results for modification queries
        setResults(null)
        setError("Write operations are not allowed in the demo")
      } else {
        // Mock error for other queries
        setResults(null)
        setError("Invalid query or operation not supported")
      }
    }, 1000)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="font-mono min-h-[100px]"
          placeholder="Enter SQL query..."
        />
        <Button onClick={executeQuery} disabled={isLoading} className="w-full">
          {isLoading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Executing...
            </span>
          ) : (
            <span className="flex items-center">
              <Play className="mr-2 h-4 w-4" />
              Execute Query
            </span>
          )}
        </Button>
      </div>

      {error && (
        <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
          <p className="font-medium">Error</p>
          <p>{error}</p>
        </div>
      )}

      {results && (
        <div className="border rounded-md">
          <ScrollArea className="h-[300px]">
            <div className="p-1">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    {Object.keys(results[0]).map((key) => (
                      <th key={key} className="p-2 text-left font-medium">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, i) => (
                    <tr key={i} className="border-t">
                      {Object.values(row).map((value, j) => (
                        <td key={j} className="p-2">
                          {value as React.ReactNode}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollArea>
          <div className="bg-muted p-2 text-sm text-muted-foreground">{results.length} rows returned</div>
        </div>
      )}
    </div>
  )
}
