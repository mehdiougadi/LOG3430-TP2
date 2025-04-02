import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  ScatterChart, Scatter, ZAxis, ComposedChart, Line
} from 'recharts';

const ThreeNodesDiagrams = () => {
  // Node load data from cassandra_metrics.csv
  const loadData = [
    { node: 'cassandra-node1', load: 264.34 },
    { node: 'cassandra-node2', load: 233.15 },
    { node: 'cassandra-node3', load: 243.52 }
  ];

  // Workload throughput data from cassandra_ycsb_summary.csv
  const throughputData = [
    { workload: 'Workload A', loadPhase: 69.20, runPhase: 109.72 },
    { workload: 'Workload B', loadPhase: 163.67, runPhase: 140.17 },
    { workload: 'Workload C', loadPhase: 159.54, runPhase: 184.50 },
    { workload: 'Workload D', loadPhase: 226.55, runPhase: 219.39 },
    { workload: 'Workload E', loadPhase: 231.00, runPhase: 102.09 }
  ];

  // Latency data by operation from cassandra_ycsb_summary.csv
  const latencyData = [
    { workload: 'A', phase: 'load', operation: 'INSERT', avg: 9888.79, p95: 77311, p99: 84031 },
    { workload: 'A', phase: 'run', operation: 'READ', avg: 6108.76, p95: 50559, p99: 73919 },
    { workload: 'A', phase: 'run', operation: 'UPDATE', avg: 6223.51, p95: 56063, p99: 80127 },
    { workload: 'B', phase: 'load', operation: 'INSERT', avg: 3144.41, p95: 1940, p99: 72575 },
    { workload: 'B', phase: 'run', operation: 'READ', avg: 4495.90, p95: 3307, p99: 70463 },
    { workload: 'B', phase: 'run', operation: 'UPDATE', avg: 3628.29, p95: 6959, p99: 10903 },
    { workload: 'C', phase: 'load', operation: 'INSERT', avg: 1733.51, p95: 1665, p99: 28767 },
    { workload: 'C', phase: 'run', operation: 'READ', avg: 2526.77, p95: 2303, p99: 39871 },
    { workload: 'D', phase: 'load', operation: 'INSERT', avg: 1509.77, p95: 1695, p99: 24943 },
    { workload: 'D', phase: 'run', operation: 'INSERT', avg: 1371.89, p95: 1839, p99: 1946 },
    { workload: 'D', phase: 'run', operation: 'READ', avg: 1696.64, p95: 2040, p99: 5859 },
    { workload: 'E', phase: 'load', operation: 'INSERT', avg: 1456.21, p95: 1565, p99: 22495 },
    { workload: 'E', phase: 'run', operation: 'INSERT', avg: 3872.02, p95: 2653, p99: 59487 }
  ];

  // Min/Max Latency data from cassandra_ycsb_summary.csv
  const minMaxLatencyData = [
    { workload: 'A', operation: 'INSERT (load)', min: 1297, max: 165503 },
    { workload: 'A', operation: 'READ (run)', min: 1084, max: 83391 },
    { workload: 'A', operation: 'UPDATE (run)', min: 1141, max: 87167 },
    { workload: 'B', operation: 'INSERT (load)', min: 636, max: 80063 },
    { workload: 'B', operation: 'READ (run)', min: 1046, max: 79743 },
    { workload: 'B', operation: 'UPDATE (run)', min: 868, max: 75007 },
    { workload: 'C', operation: 'INSERT (load)', min: 602, max: 74175 },
    { workload: 'C', operation: 'READ (run)', min: 587, max: 72895 },
    { workload: 'D', operation: 'INSERT (load)', min: 574, max: 46527 },
    { workload: 'D', operation: 'INSERT (run)', min: 761, max: 7939 },
    { workload: 'D', operation: 'READ (run)', min: 620, max: 67007 },
    { workload: 'E', operation: 'INSERT (load)', min: 489, max: 36415 },
    { workload: 'E', operation: 'INSERT (run)', min: 888, max: 71807 }
  ];

  // Operation performance comparison data
  const operationData = [
    { workload: 'A', readAvgLatency: 6108.76, updateAvgLatency: 6223.51 },
    { workload: 'B', readAvgLatency: 4495.90, updateAvgLatency: 3628.29 },
    { workload: 'C', readAvgLatency: 2526.77, updateAvgLatency: null },
    { workload: 'D', readAvgLatency: 1696.64, updateAvgLatency: null }
  ];

  // Latency vs Throughput data
  const latencyThroughputData = [
    { name: 'A-INSERT-load', throughput: 69.20, latency: 9888.79, workload: 'A' },
    { name: 'A-READ-run', throughput: 109.72, latency: 6108.76, workload: 'A' },
    { name: 'B-INSERT-load', throughput: 163.67, latency: 3144.41, workload: 'B' },
    { name: 'B-READ-run', throughput: 140.17, latency: 4495.90, workload: 'B' },
    { name: 'C-INSERT-load', throughput: 159.54, latency: 1733.51, workload: 'C' },
    { name: 'C-READ-run', throughput: 184.50, latency: 2526.77, workload: 'C' },
    { name: 'D-INSERT-load', throughput: 226.55, latency: 1509.77, workload: 'D' },
    { name: 'D-READ-run', throughput: 219.39, latency: 1696.64, workload: 'D' },
    { name: 'E-INSERT-load', throughput: 231.00, latency: 1456.21, workload: 'E' },
    { name: 'E-INSERT-run', throughput: 102.09, latency: 3872.02, workload: 'E' }
  ];

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '16px' }}>
      <h1 className="text-2xl font-bold mb-4">Cassandra Performance Dashboard (3 Nodes)</h1>
      
      {/* 1. Cluster Load Distribution */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Cluster Load Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={loadData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="node" angle={-45} textAnchor="end" />
            <YAxis label={{ value: 'Load', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Bar dataKey="load" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* 2. Workload Throughput Comparison */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Workload Throughput Comparison</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={throughputData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="workload" />
            <YAxis label={{ value: 'Throughput (ops/sec)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="loadPhase" name="Load Phase" fill="#8884d8" />
            <Bar dataKey="runPhase" name="Run Phase" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* 3. Latency Distribution - Workload A */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Latency Distribution - Workload A</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart 
            data={latencyData.filter(item => item.workload === 'A')} 
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="operation" />
            <YAxis label={{ value: 'Latency (μs)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="avg" name="Average Latency" fill="#8884d8" />
            <Bar dataKey="p95" name="95th Percentile" fill="#82ca9d" />
            <Bar dataKey="p99" name="99th Percentile" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* 4. Operation Performance Comparison */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">READ vs UPDATE Performance (Avg Latency)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={operationData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="workload" />
            <YAxis label={{ value: 'Average Latency (μs)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="readAvgLatency" name="READ" fill="#8884d8" />
            <Bar dataKey="updateAvgLatency" name="UPDATE" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* 5. Latency vs Throughput Scatter Plot */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Latency vs Throughput</h2>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="throughput" 
              name="Throughput" 
              label={{ value: 'Throughput (ops/sec)', position: 'insideBottom', offset: -5 }} 
            />
            <YAxis 
              dataKey="latency" 
              name="Latency" 
              label={{ value: 'Average Latency (μs)', angle: -90, position: 'insideLeft' }} 
            />
            <ZAxis dataKey="workload" range={[60, 400]} name="Workload" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name="Operations" data={latencyThroughputData} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      
      {/* 6. Min/Max Latency Range for Workloads A-C */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Min/Max Latency Range</h2>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart 
            data={minMaxLatencyData.slice(0, 8)} 
            margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="operation" angle={-45} textAnchor="end" height={100} />
            <YAxis label={{ value: 'Latency (μs)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="min" name="Min Latency" fill="#8884d8" />
            <Bar dataKey="max" name="Max Latency" fill="#82ca9d" />
            <Line type="monotone" dataKey="min" stroke="#ff7300" dot={false} activeDot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ThreeNodesDiagrams;