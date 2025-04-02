import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  ScatterChart, Scatter, ZAxis, ComposedChart, Line, PieChart, Pie, Cell
} from 'recharts';

const MongoDBThreeNodesDiagrams = () => {
  // Node data from mongodb_metrics.csv (using only 3 nodes)
  const nodeData = [
    { node: 'mongo-node1:27021', state: 'PRIMARY', uptime: 730, memory: 347, connections: 25, operations: 4365005667280 },
    { node: 'mongo-node2:27022', state: 'SECONDARY', uptime: 712, memory: 347, connections: 25, operations: 4365005667280 },
    { node: 'mongo-node3:27023', state: 'SECONDARY', uptime: 720, memory: 347, connections: 25, operations: 4365005667280 }
  ];
  
  // Node uptime data
  const uptimeData = [
    { node: 'mongo-node1:27021', uptime: 730 },
    { node: 'mongo-node2:27022', uptime: 712 },
    { node: 'mongo-node3:27023', uptime: 720 }
  ];

  // Node state data for pie chart
  const nodeStateData = [
    { name: 'PRIMARY', value: 1 },
    { name: 'SECONDARY', value: 2 }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  // Workload throughput data from mongodb_ycsb_summary.csv
  const throughputData = [
    { workload: 'Workload A', loadPhase: 243.43, runPhase: 416.49 },
    { workload: 'Workload B', loadPhase: 201.01, runPhase: 853.24 },
    { workload: 'Workload C', loadPhase: 193.65, runPhase: 1001.00 },
    { workload: 'Workload D', loadPhase: 216.54, runPhase: 755.29 },
    { workload: 'Workload E', loadPhase: 225.38, runPhase: 564.02 }
  ];

  // Latency data by operation from mongodb_ycsb_summary.csv
  const latencyData = [
    { workload: 'A', phase: 'load', operation: 'INSERT', avg: 3660.64, p95: 5139, p99: 5927 },
    { workload: 'A', phase: 'run', operation: 'READ', avg: 656.01, p95: 1061, p99: 1438 },
    { workload: 'A', phase: 'run', operation: 'UPDATE', avg: 3288.17, p95: 4743, p99: 5399 },
    { workload: 'B', phase: 'load', operation: 'INSERT', avg: 3789.67, p95: 5207, p99: 5907 },
    { workload: 'B', phase: 'run', operation: 'READ', avg: 568.74, p95: 924, p99: 1351 },
    { workload: 'B', phase: 'run', operation: 'UPDATE', avg: 3483.69, p95: 5339, p99: 5995 },
    { workload: 'C', phase: 'load', operation: 'INSERT', avg: 3969.21, p95: 5451, p99: 6231 },
    { workload: 'C', phase: 'run', operation: 'READ', avg: 561.50, p95: 884, p99: 1207 },
    { workload: 'D', phase: 'load', operation: 'INSERT', avg: 4143.53, p95: 5715, p99: 7155 },
    { workload: 'D', phase: 'run', operation: 'INSERT', avg: 4390.11, p95: 6443, p99: 6743 },
    { workload: 'D', phase: 'run', operation: 'READ', avg: 656.21, p95: 1201, p99: 1531 },
    { workload: 'E', phase: 'load', operation: 'INSERT', avg: 3965.67, p95: 5651, p99: 6723 },
    { workload: 'E', phase: 'run', operation: 'INSERT', avg: 5450.43, p95: 6187, p99: 67903 }
  ];

  // Min/Max Latency data from mongodb_ycsb_summary.csv
  const minMaxLatencyData = [
    { workload: 'A', operation: 'INSERT (load)', min: 2328, max: 75647 },
    { workload: 'A', operation: 'READ (run)', min: 324, max: 8855 },
    { workload: 'A', operation: 'UPDATE (run)', min: 2376, max: 73343 },
    { workload: 'B', operation: 'INSERT (load)', min: 2424, max: 79359 },
    { workload: 'B', operation: 'READ (run)', min: 296, max: 62047 },
    { workload: 'B', operation: 'UPDATE (run)', min: 2708, max: 10199 },
    { workload: 'C', operation: 'INSERT (load)', min: 2454, max: 75967 },
    { workload: 'C', operation: 'READ (run)', min: 335, max: 61503 },
    { workload: 'D', operation: 'INSERT (load)', min: 2522, max: 84607 },
    { workload: 'D', operation: 'INSERT (run)', min: 2792, max: 12471 },
    { workload: 'D', operation: 'READ (run)', min: 301, max: 66559 },
    { workload: 'E', operation: 'INSERT (load)', min: 2436, max: 83135 },
    { workload: 'E', operation: 'INSERT (run)', min: 2910, max: 67903 }
  ];

  // Operation performance comparison data
  const operationData = [
    { workload: 'A', readAvgLatency: 656.01, updateAvgLatency: 3288.17 },
    { workload: 'B', readAvgLatency: 568.74, updateAvgLatency: 3483.69 },
    { workload: 'C', readAvgLatency: 561.50, updateAvgLatency: null },
    { workload: 'D', readAvgLatency: 656.21, updateAvgLatency: null }
  ];

  // Latency vs Throughput data
  const latencyThroughputData = [
    { name: 'A-INSERT-load', throughput: 243.43, latency: 3660.64, workload: 'A' },
    { name: 'A-READ-run', throughput: 416.49, latency: 656.01, workload: 'A' },
    { name: 'B-INSERT-load', throughput: 201.01, latency: 3789.67, workload: 'B' },
    { name: 'B-READ-run', throughput: 853.24, latency: 568.74, workload: 'B' },
    { name: 'C-INSERT-load', throughput: 193.65, latency: 3969.21, workload: 'C' },
    { name: 'C-READ-run', throughput: 1001.00, latency: 561.50, workload: 'C' },
    { name: 'D-INSERT-load', throughput: 216.54, latency: 4143.53, workload: 'D' },
    { name: 'D-READ-run', throughput: 755.29, latency: 656.21, workload: 'D' },
    { name: 'E-INSERT-load', throughput: 225.38, latency: 3965.67, workload: 'E' },
    { name: 'E-INSERT-run', throughput: 564.02, latency: 5450.43, workload: 'E' }
  ];

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '16px' }}>
      <h1 className="text-2xl font-bold mb-4">MongoDB Performance Dashboard (3 Nodes)</h1>
      
      {/* 1. Cluster Uptime Distribution */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Cluster Uptime Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={uptimeData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="node" angle={-45} textAnchor="end" />
            <YAxis label={{ value: 'Uptime (hours)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Bar dataKey="uptime" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* 2. Node State Distribution */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Node State Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={nodeStateData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {nodeStateData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* 3. Workload Throughput Comparison */}
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
      
      {/* 4. Latency Distribution - Workload A */}
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
      
      {/* 5. Operation Performance Comparison */}
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
      
      {/* 6. Latency vs Throughput Scatter Plot */}
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
      
      {/* 7. Min/Max Latency Range for Workloads A-C */}
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

export default MongoDBThreeNodesDiagrams;