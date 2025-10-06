import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import engagementData from "@data/engagement.json";
import Filters from "@components/Filters";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { inRange } from "@utils/date";
import Summary from "@components/Summary";
export default function Engagement() {
  const f = useSelector((s: RootState) => s.filters);

  const filtered = useMemo(() => {
    let data = engagementData as any[];
    const today = new Date().toISOString().slice(0, 10);
    if (f.timePreset === "last7") {
      const from = new Date();
      from.setDate(from.getDate() - 6);
      data = data.filter((d) =>
        inRange(d.date, from.toISOString().slice(0, 10), today)
      );
    } else if (f.timePreset === "last30") {
      const from = new Date();
      from.setDate(from.getDate() - 29);
      data = data.filter((d) =>
        inRange(d.date, from.toISOString().slice(0, 10), today)
      );
    } else if (f.timePreset === "custom") {
      data = data.filter((d) =>
        inRange(d.date, f.customRange.from, f.customRange.to)
      );
    }
    if (f.user !== "All") data = data.filter((d) => d.user === f.user);
    return data;
  }, [f]);

  const byDate = useMemo(() => {
    const map = new Map();
    for (const r of filtered) {
      const row = map.get(r.date) ?? {
        date: r.date,
        User1: 0,
        User2: 0,
        User3: 0,
        total: 0,
      };
      row[r.user] += r.engagement;
      row.total += r.engagement;
      map.set(r.date, row);
    }
    return Array.from(map.values()).sort((a, b) =>
      a.date.localeCompare(b.date)
    );
  }, [filtered]);

  const totalEng = byDate.reduce((s, d) => s + (d.total || 0), 0);

  return (
    <div>
      <h2>User Engagement</h2>
      <Filters mode='engagement' />
      <Summary
        items={[
          { label: "Total Engagement", value: String(totalEng) },
          { label: "Days", value: String(byDate.length) },
        ]}
      />
      <div style={{ height: 320 }}>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={byDate}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='User1' stackId='a' fill='#8884d8' />
            <Bar dataKey='User2' stackId='a' fill='#82ca9d' />
            <Bar dataKey='User3' stackId='a' fill='#ffc658' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
