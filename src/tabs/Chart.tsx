export default function Chart() {
  const data = [
    { label: "Jan", value: 65 },
    { label: "Feb", value: 59 },
    { label: "Mar", value: 80 },
    { label: "Apr", value: 81 },
    { label: "May", value: 56 },
  ];

  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <svg width="100%" height="300" viewBox="0 0 100 100">
      {data.map((item, index) => (
        <g key={item.label} transform={`translate(${index * 20}, 0)`}>
          <rect
            x="0"
            y={100 - (item.value / maxValue) * 100}
            width="10"
            height={(item.value / maxValue) * 100}
            fill="#007bff"
          />
          <text x="5" y="98" fontSize="4" textAnchor="middle" fill="#fff">
            {item.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
