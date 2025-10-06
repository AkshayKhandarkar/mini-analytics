export default function Summary({
  items,
}: {
  items: Array<{ label: string; value: string }>;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
        gap: 12,
        marginBottom: 12,
      }}
    >
      {items.map((it) => (
        <div
          key={it.label}
          style={{
            padding: 10,
            border: "1px solid #eee",
            borderRadius: 6,
            background: "#fff",
          }}
        >
          <div style={{ fontSize: 12, color: "#666" }}>{it.label}</div>
          <div style={{ fontWeight: 600 }}>{it.value}</div>
        </div>
      ))}
    </div>
  );
}
