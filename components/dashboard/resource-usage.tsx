"use client"

import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    time: "00:00",
    cpu: 30,
    memory: 40,
    storage: 25,
  },
  {
    time: "04:00",
    cpu: 25,
    memory: 35,
    storage: 25,
  },
  {
    time: "08:00",
    cpu: 45,
    memory: 50,
    storage: 26,
  },
  {
    time: "12:00",
    cpu: 65,
    memory: 60,
    storage: 27,
  },
  {
    time: "16:00",
    cpu: 75,
    memory: 70,
    storage: 28,
  },
  {
    time: "20:00",
    cpu: 60,
    memory: 55,
    storage: 29,
  },
  {
    time: "24:00",
    cpu: 40,
    memory: 45,
    storage: 30,
  },
]

export function ResourceUsage() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="time" className="text-xs" stroke="#888888" tickLine={false} axisLine={false} />
        <YAxis
          className="text-xs"
          stroke="#888888"
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="cpu" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.2} strokeWidth={2} />
        <Area type="monotone" dataKey="memory" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.2} strokeWidth={2} />
        <Area type="monotone" dataKey="storage" stroke="#adfa1d" fill="#adfa1d" fillOpacity={0.2} strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
