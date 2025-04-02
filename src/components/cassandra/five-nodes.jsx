import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  ScatterChart, Scatter, ZAxis, ComposedChart, Line
} from 'recharts';

const FiveNodesDiagrams = () => {
  // Node load data
  const loadData = [
    { node: 'cassandra-node1', load: 262.77 },
    { node: 'cassandra-node2', load: 276.02 },
    { node: 'cassandra-node3', load: 241.33 },
    { node: 'cassandra-node4', load: 295.8 },
    { node: 'cassandra-node5', load: 252.91 }
  ];

  // Workload throughput data
  const throughputData = [
    { workload: 'Workload A', loadPhase: 65.62, runPhase: 89.17 },
    { workload: 'Workload B', loadPhase: 102.41, runPhase: 179.50 },
    { workload: 'Workload C', loadPhase: 169.58, runPhase: 208.86 },
    { workload: 'Workload D', loadPhase: 203.42, runPhase: 177.09 },
    { workload: 'Workload E', loadPhase: 206.48, runPhase: 83.49 }
  ];

  // Latency data by operation
  const latencyData = [
    { workload: 'A', phase: 'load', operation: 'INSERT', avg: 12233.97, p95: 78847, p99: 86015 },
    { workload: 'A', phase: 'run', operation: 'READ', avg: 9626.51, p95: 65855, p99: 81087 },
    { workload: 'A', phase: 'run', operation: 'UPDATE', avg: 6939.28, p95: 59391, p99: 80447 },
    { workload: 'B', phase: 'load', operation: 'INSERT', avg: 4986.49, p95: 24975, p99: 75903 },
    { workload: 'B', phase: 'run', operation: 'READ', avg: 2591.56, p95: 2745, p99: 34015 },
    { workload: 'B', phase: 'run', operation: 'UPDATE', avg: 3114.11, p95: 12247, p99: 19023 },
    { workload: 'C', phase: 'load', operation: 'INSERT', avg: 2930.62, p95: 2011, p99: 67199 },
    { workload: 'C', phase: 'run', operation: 'READ', avg: 1882.88, p95: 2229, p99: 2929 },
    { workload: 'D', phase: 'load', operation: 'INSERT', avg: 1945.47, p95: 1994, p99: 33631 },
    { workload: 'D', phase: 'run', operation: 'INSERT', avg: 3836.29, p95: 8431, p99: 72831 },
    { workload: 'D', phase: 'run', operation: 'READ', avg: 2659.61, p95: 2463, p99: 53247 },
    { workload: 'E', phase: 'load', operation: 'INSERT', avg: 1873.28, p95: 1807, p99: 30703 },
    { workload: 'E', phase: 'run', operation: 'INSERT', avg: 7065.15, p95: 68031, p99: 70591 }
  ];

  // Min/Max Latency data
  const minMaxLatencyData = [
    { workload: 'A', operation: 'INSERT (load)', min: 1678, max: 103039 },
    { workload: 'A', operation: 'READ (run)', min: 2148, max: 183807 },
    { workload: 'A', operation: 'UPDATE (run)', min: 1266, max: 91455 },
    { workload: 'B', operation: 'INSERT (load)', min: 755, max: 88319 },
    { workload: 'B', operation: 'READ (run)', min: 809, max: 56671 },
    { workload: 'B', operation: 'UPDATE (run)', min: 1025, max: 19039 },
    { workload: 'C', operation: 'INSERT (load)', min: 728, max: 81919 },
    { workload: 'C', operation: 'READ (run)', min: 757, max: 41311 },
    { workload: 'D', operation: 'INSERT (load)', min: 517, max: 70399 },
    { workload: 'D', operation: 'INSERT (run)', min: 992, max: 72831 },
    { workload: 'D', operation: 'READ (run)', min: 748, max: 72959 },
    { workload: 'E', operation: 'INSERT (load)', min: 689, max: 72255 },
    { workload: 'E', operation: 'INSERT (run)', min: 1073, max: 70591 }
  ];

  // Operation performance comparison data
  const operationData = [
    { workload: 'A', readAvgLatency: 9626.51, updateAvgLatency: 6939.28 },
    { workload: 'B', readAvgLatency: 2591.56, updateAvgLatency: 3114.11 },
    { workload: 'C', readAvgLatency: 1882.88, updateAvgLatency: null },
    { workload: 'D', readAvgLatency: 2659.61, updateAvgLatency: null }
  ];

  // Latency vs Throughput data
  const latencyThroughputData = [
    { name: 'A-INSERT-load', throughput: 65.62, latency: 12233.97, workload: 'A' },
    { name: 'A-READ-run', throughput: 89.17, latency: 9626.51, workload: 'A' },
    { name: 'B-INSERT-load', throughput: 102.41, latency: 4986.49, workload: 'B' },
    { name: 'B-READ-run', throughput: 179.50, latency: 2591.56, workload: 'B' },
    { name: 'C-INSERT-load', throughput: 169.58, latency: 2930.62, workload: 'C' },
    { name: 'C-READ-run', throughput: 208.86, latency: 1882.88, workload: 'C' },
    { name: 'D-INSERT-load', throughput: 203.42, latency: 1945.47, workload: 'D' },
    { name: 'D-READ-run', throughput: 177.09, latency: 2659.61, workload: 'D' },
    { name: 'E-INSERT-load', throughput: 206.48, latency: 1873.28, workload: 'E' },
    { name: 'E-INSERT-run', throughput: 83.49, latency: 7065.15, workload: 'E' }
  ];

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '16px' }}>
      <h1 className="text-2xl font-bold mb-4">Cassandra Performance Dashboard (5 Nodes)</h1>
      
      {/* 1. Cluster Load Distribution */}
      <div className="bg-white p-4 rounded shadow">
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
      <div className="bg-white p-4 rounded shadow">
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
      <div className="bg-white p-4 rounded shadow">
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
      <div className="bg-white p-4 rounded shadow">
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
      <div className="bg-white p-4 rounded shadow">
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
      <div className="bg-white p-4 rounded shadow">
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

export default FiveNodesDiagrams;