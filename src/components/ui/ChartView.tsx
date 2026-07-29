'use client';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

interface ChartViewProps {
  data: { name: string; value: number; unit?: string }[];
  title?: string;
}

const COLORS = ['#00FF99', '#00E5FF', '#FF007A', '#7928CA', '#FFB800'];

export default function ChartView({ data, title = 'Visual Metrics Breakdown' }: ChartViewProps) {
  if (!data || data.length === 0) return null;

  return (
    <div className="mt-6 p-5 glass-panel rounded-2xl border border-white/20 dark:border-emerald-900/30">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-400 mb-4">
        {title}
      </h4>
      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
            <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(5, 20, 12, 0.9)',
                borderColor: '#00FF99',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
