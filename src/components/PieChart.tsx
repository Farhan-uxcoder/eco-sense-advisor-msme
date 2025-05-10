
import React from 'react';
import { PieChart as RechartsChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface PieChartProps {
  value: number;
  size?: number;
  thickness?: number;
  title: string;
  subtitle?: string;
  color?: string;
}

const PieChart = ({ 
  value, 
  size = 120, 
  thickness = 12, 
  title, 
  subtitle,
  color = "hsl(var(--primary))" 
}: PieChartProps) => {
  // Create data for the chart - one segment for the value, one for remaining
  const data = [
    { name: 'Value', value: value },
    { name: 'Remainder', value: 100 - value },
  ];

  // Colors for the pie segments
  const COLORS = [color, 'hsl(var(--secondary))'];

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
        <div className="w-full" style={{ height: `${size}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={size / 2 - thickness}
                outerRadius={size / 2}
                startAngle={90}
                endAngle={-270}
                paddingAngle={0}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Progress']} 
                contentStyle={{ 
                  background: 'hsl(var(--card))', 
                  borderColor: 'hsl(var(--border))',
                  borderRadius: '0.5rem'
                }}
                itemStyle={{
                  color: 'hsl(var(--card-foreground))'
                }}
              />
            </RechartsChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center mt-2">
          <div className="text-2xl font-bold">{value}%</div>
          <div className="text-sm font-medium">{title}</div>
          {subtitle && <div className="text-xs text-muted-foreground">{subtitle}</div>}
        </div>
      </div>
    </div>
  );
};

export default PieChart;
