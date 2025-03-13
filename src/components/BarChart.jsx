import { Bar, BarChart as ReBarChart, Line, LineChart as ReLineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, RadialBar, RadialBarChart } from 'recharts';

export function BarChart() {
  const data = [
    { day: "Monday", visits: 400 },
    { day: "Tuesday", visits: 600 },
    { day: "Wednesday", visits: 800 },
    { day: "Thursday", visits: 700 },
    { day: "Friday", visits: 900 },
    { day: "Saturday", visits: 1100 },
    { day: "Sunday", visits: 1000 }
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <ReBarChart data={data}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="visits" fill="#3b82f6" />
      </ReBarChart>
    </ResponsiveContainer>
  );
}

export function LineChart() {
  const data = [
    { time: "10 AM", engagement: 20 },
    { time: "11 AM", engagement: 35 },
    { time: "12 PM", engagement: 25 },
    { time: "1 PM", engagement: 40 },
    { time: "2 PM", engagement: 30 }
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <ReLineChart data={data}>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="engagement" stroke="#3b82f6" />
      </ReLineChart>
    </ResponsiveContainer>
  );
}

export function GaugeChart({ value }) {
  const data = [{ value }];

  return (
    <ResponsiveContainer width="100%" height={150}>
      <RadialBarChart innerRadius="80%" outerRadius="100%" barSize={20} data={data}>
        <RadialBar minAngle={15} background dataKey="value" fill="#3b82f6" />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}
