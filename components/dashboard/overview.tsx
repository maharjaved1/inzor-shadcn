"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    containers: 40,
    deployments: 24,
    databases: 10,
  },
  {
    name: "Feb",
    containers: 45,
    deployments: 28,
    databases: 12,
  },
  {
    name: "Mar",
    containers: 55,
    deployments: 32,
    databases: 15,
  },
  {
    name: "Apr",
    containers: 60,
    deployments: 36,
    databases: 18,
  },
  {
    name: "May",
    containers: 75,
    deployments: 40,
    databases: 20,
  },
  {
    name: "Jun",
    containers: 85,
    deployments: 45,
    databases: 22,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="name" className="text-xs" stroke="#888888" tickLine={false} axisLine={false} />
        <YAxis
          className="text-xs"
          stroke="#888888"
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="containers" fill="#adfa1d" radius={[4, 4, 0, 0]} />
        <Bar dataKey="deployments" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
        <Bar dataKey="databases" fill="#f43f5e" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
