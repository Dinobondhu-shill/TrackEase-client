import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import useRoll from '../../../hooks/useRoll';

const fetchStatistics = async (company) => {


  const { data } = await axios.get(`https://track-ease-server.vercel.app/items-statistics/${company}`);
  return data;
};

const PieChartComponent = () => {
  const [role] = useRoll()
  const company = role[2]
  const { data: count = {} } = useQuery({
    queryKey: ['pie-data'],
    queryFn:()=>fetchStatistics(company),
  });

  
 

  const chartData = [
    { name: 'Returnable', value: count.returnable },
    { name: 'Non-Returnable', value: count.nonReturnable }
  ];

  const COLORS = ['#0088FE', '#FF8042'];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div>
      <h2 className="md:text-3xl text-xl font-semibold">Returnable vs Non-Returnable Items:</h2>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChartComponent;
