import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function MetricsChart() {
  const [metrics, setMetrics] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMetrics = async () => {
      const res = await fetch('http://localhost:5000/api/metrics', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setMetrics(data);
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000); // Refresh every 30s

    return () => clearInterval(interval);
  }, [token]);

  return (
    <div>
      <h3>Simulated DevOps Metrics</h3>
      <LineChart width={800} height={300} data={metrics}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="timestamp" tickFormatter={str => new Date(str).toLocaleTimeString()} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="uptime" stroke="#82ca9d" name="Uptime (%)" />
        <Line type="monotone" dataKey="errors" stroke="#ff4d4f" name="Errors" />
        <Line type="monotone" dataKey="latency" stroke="#8884d8" name="Latency (ms)" />
      </LineChart>
    </div>
  );
}
