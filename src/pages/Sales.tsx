import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import salesData from "@data/sales.json";
import Filters from "@components/Filters";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { inRange } from "@utils/date";
import Summary from "@components/Summary";

export default function Sales() {
  const f = useSelector((s: RootState) => s.filters);
  const filtered = useMemo(() => {
    let data = salesData as any[];
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
    if (f.salesperson !== "All")
      data = data.filter((d) => d.salesperson === f.salesperson);
    return data;
  }, [f]);

  // grouped data per day
  const byDate = useMemo(() => {
    const map = new Map();
    for (const r of filtered) {
      const row = map.get(r.date) ?? {
        date: r.date,
        Alice: 0,
        Bob: 0,
        Charlie: 0,
        total: 0,
      };
      row[r.salesperson] += r.revenue;
      row.total += r.revenue;
      map.set(r.date, row);
    }
    return Array.from(map.values()).sort((a, b) =>
      a.date.localeCompare(b.date)
    );
  }, [filtered]);

  const totalRevenue = byDate.reduce((s, d) => s + (d.total || 0), 0);

  return (
    <div>
      <h2>Sales Analytics</h2>
      <Filters mode='sales' />
      <Summary
        items={[
          {
            label: "Total Revenue",
            value: totalRevenue,
          },
          { label: "Days", value: byDate.length },
        ]}
      />
      <div style={{ height: 320 }}>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={byDate}>
            <CartesianGrid strokeDasharray='3 3' />{" "}
            {/* optional background grid */}
            <XAxis dataKey='date' /> {/* bottom axis labels */}
            <YAxis /> {/* side axis numbers */}
            <Tooltip /> {/* hover tooltips */}
            <Legend /> {/* label below */}
            {f.salesView === "total" ? (
              <Line
                type='monotone'
                dataKey='total'
                stroke='#8884d8'
                dot={false}
              />
            ) : (
              <>
                <Line
                  type='monotone'
                  dataKey='Alice'
                  stroke='#8884d8'
                  dot={false}
                />
                <Line
                  type='monotone'
                  dataKey='Bob'
                  stroke='#82ca9d'
                  dot={false}
                />
                <Line
                  type='monotone'
                  dataKey='Charlie'
                  stroke='#ffc658'
                  dot={false}
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
