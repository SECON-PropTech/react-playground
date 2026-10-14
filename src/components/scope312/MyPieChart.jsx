
import {
  Pie,
  PieChart,
  Sector,
  Tooltip,
  useActiveTooltipDataPoints,
  useIsTooltipActive,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28BFE",
  "#FF6699",
  "#66CCCC",
  "#99CC33",
];

function getColor(index) {
  return COLORS[index % COLORS.length];
}

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  if (
    cx == null ||
    cy == null ||
    innerRadius == null ||
    outerRadius == null
  ) {
    return null;
  }

  const radius =
    innerRadius + (outerRadius - innerRadius) * 0.5;

  const x =
    Number(cx) +
    radius * Math.cos(-(midAngle ?? 0) * RADIAN);

  const y =
    Number(cy) +
    radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > Number(cx) ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent ?? 0) * 100).toFixed(0)}%`}
    </text>
  );
};

const MyCustomPie = (props) => {
  const activePoints = useActiveTooltipDataPoints();
  const isTooltipActive = useIsTooltipActive();

  const isThisPieActive =
    isTooltipActive && props.payload === activePoints?.[0];

  const fillOpacity =
    isTooltipActive && !isThisPieActive ? 0.5 : 1;

  return (
    <Sector
      {...props}
      fill={getColor(props.index)}
      stroke="none"
      fillOpacity={fillOpacity}
      style={{ transition: "fill-opacity 0.3s ease" }}
    />
  );
};

// Återanvändbar komponent som tar emot data via props.
function MyPieChart({
  data,
  unit = "kg",
  width = 400,
  height = 400,
}) {
  return (
    <PieChart width={width} height={height}>
      <Pie
        data={data}
        nameKey="name"
        dataKey="value"
        labelLine={false}
        label={renderCustomizedLabel}
        shape={MyCustomPie}
      />

      <Tooltip
        formatter={(value, name) => [
          `${value} ${unit}`,
          name,
        ]}
      />
    </PieChart>
  );
}

export default MyPieChart;
