import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import {
  setTimePreset,
  setCustomRange,
  setSalesperson,
  setUser,
  setSalesView,
} from "@features/filtersSlice";
export default function Filters({ mode }: { mode: "sales" | "engagement" }) {
  const f = useSelector((s: RootState) => s.filters);
  const dispatch = useDispatch();

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        flexWrap: "wrap",
        alignItems: "center",
        marginBottom: 12,
      }}
    >
      <div>
        <label>Range: </label>
        <select
          value={f.timePreset}
          onChange={(e) => dispatch(setTimePreset(e.target.value as any))}
        >
          <option value='last7'>Last 7 days</option>
          <option value='last30'>Last 30 days</option>
          <option value='custom'>Custom</option>
        </select>
      </div>
      {f.timePreset === "custom" && (
        <>
          <div>
            <label>From:</label>
            <input
              type='date'
              value={f.customRange.from ?? ""}
              onChange={(e) =>
                dispatch(
                  setCustomRange({
                    from: e.target.value || null,
                    to: f.customRange.to,
                  })
                )
              }
            />
          </div>
          <div>
            <label>To:</label>
            <input
              type='date'
              value={f.customRange.to ?? ""}
              onChange={(e) =>
                dispatch(
                  setCustomRange({
                    from: f.customRange.from,
                    to: e.target.value || null,
                  })
                )
              }
            />
          </div>
        </>
      )}
      {mode === "sales" && (
        <>
          <div>
            <label>Salesperson:</label>
            <select
              value={f.salesperson}
              onChange={(e) => dispatch(setSalesperson(e.target.value as any))}
            >
              <option>All</option>
              <option>Alice</option>
              <option>Bob</option>
              <option>Charlie</option>
            </select>
          </div>
          <div>
            <label>View:</label>
            <select
              value={f.salesView}
              onChange={(e) => dispatch(setSalesView(e.target.value as any))}
            >
              <option value='total'>Total</option>
              <option value='perSalesperson'>Per Salesperson</option>
            </select>
          </div>
        </>
      )}
      {mode === "engagement" && (
        <div>
          <label>User:</label>
          <select
            value={f.user}
            onChange={(e) => dispatch(setUser(e.target.value as any))}
          >
            <option>All</option>
            <option>User1</option>
            <option>User2</option>
            <option>User3</option>
          </select>
        </div>
      )}
    </div>
  );
}
