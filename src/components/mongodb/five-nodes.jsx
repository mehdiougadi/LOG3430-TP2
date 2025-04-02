import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  ScatterChart, Scatter, ZAxis, ComposedChart, Line, PieChart, Pie, Cell
} from 'recharts';

const MongoDBFiveNodesDiagrams = () => {
  // Node data from mongodb_metrics.csv (using all 5 nodes)
  const nodeData = [
    { node: 'mongo-node1:27021', state: 'PRIMARY', uptime: 727, memory: 346, connections: 41, operations: 4365105665882 },
    { node: 'mongo-node2:27022', state: 'SECONDARY', uptime: 721, memory: 346, connections: 41, operations: 4365105665882 },
    { node: 'mongo-node3:27023', state: 'SECONDARY', uptime: 721, memory: 346, connections: 41, operations: 4365105665882 },
    { node: 'mongo-node4:27024', state: 'SECONDARY', uptime: 721, memory: 346, connections: 41, operations: 4365105665882 },
    { node: 'mongo-node5:27025', state: 'SECONDARY', uptime: 721, memory: 346, connections: 41, operations: 4365105665882 }
  ];
  
  // Node uptime data
  const uptimeData = [
    { node: 'mongo-node1:27021', uptime: 727 },
    { node: 'mongo-node2:27022', uptime: 721 },
    { node: 'mongo-node3:27023', uptime: 721 },
    { node: 'mongo-node4:27024', uptime: 721 },
    { node: 'mongo-node5:27025', uptime: 721 }
  ];

  // Node state data for pie chart
  const nodeStateData = [
    { name: 'PRIMARY', value: 1 },
    { name: 'SECONDARY', value: 4 }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  // Workload throughput data from mongodb_ycsb_summary.csv
  const throughputData = [
    { workload: 'Workload A', loadPhase: 159.03, runPhase: 384.17 },
    { workload: 'Workload B', loadPhase: 221.73, runPhase: 831.26 },
    { workload: 'Workload C', loadPhase: 213.08, runPhase: 844.59 },
    { workload: 'Workload D', loadPhase: 212.45, runPhase: 781.25 },
    { workload: 'Workload E', loadPhase: 198.81, runPhase: 587.89 }
  ];

  // Latency data by operation from mongodb_ycsb_summary.csv
  const latencyData = [
    { workload: 'A', phase: 'load', operation: 'INSERT', avg: 5827.47, p95: 11015, p99: 12999 },
    { workload: 'A', phase: 'run', operation: 'READ', avg: 737.35, p95: 1151, p99: 1575 },
    { workload: 'A', phase: 'run', operation: 'UPDATE', avg: 3559.33, p95: 4563, p99: 5795 },
    { workload: 'B', phase: 'load', operation: 'INSERT', avg: 4028.95, p95: 5375, p99: 7011 },
    { workload: 'B', phase: 'run', operation: 'READ', avg: 598.54, p95: 984, p99: 1271 },
    { workload: 'B', phase: 'run', operation: 'UPDATE', avg: 3616.58, p95: 4415, p99: 9783 },
    { workload: 'C', phase: 'load', operation: 'INSERT', avg: 4193.64, p95: 5783, p99: 6979 },
    { workload: 'C', phase: 'run', operation: 'READ', avg: 723.38, p95: 1246, p99: 2047 },
    { workload: 'D', phase: 'load', operation: 'INSERT', avg: 4248.81, p95: 5307, p99: 9775 },
    { workload: 'D', phase: 'run', operation: 'INSERT', avg: 4252.68, p95: 4943, p99: 11079 },
    { workload: 'D', phase: 'run', operation: 'READ', avg: 617.01, p95: 971, p99: 1461 },
    { workload: 'E', phase: 'load', operation: 'INSERT', avg: 4499.36, p95: 5859, p99: 8455 },
    { workload: 'E', phase: 'run', operation: 'INSERT', avg: 4218.34, p95: 6019, p99: 12639 }
  ];

  // Min/Max Latency data from mongodb_ycsb_summary.csv
  const minMaxLatencyData = [
    { workload: 'A', operation: 'INSERT (load)', min: 2516, max: 104127 },
    { workload: 'A', operation: 'READ (run)', min: 334, max: 9799 },
    { workload: 'A', operation: 'UPDATE (run)', min: 2508, max: 63167 },
    { workload: 'B', operation: 'INSERT (load)', min: 2580, max: 79743 },
    { workload: 'B', operation: 'READ (run)', min: 300, max: 62111 },
    { workload: 'B', operation: 'UPDATE (run)', min: 2896, max: 9783 },
    { workload: 'C', operation: 'INSERT (load)', min: 2582, max: 86015 },
    { workload: 'C', operation: 'READ (run)', min: 339, max: 65183 },
    { workload: 'D', operation: 'INSERT (load)', min: 2738, max: 81407 },
    { workload: 'D', operation: 'INSERT (run)', min: 2994, max: 12359 },
    { workload: 'D', operation: 'READ (run)', min: 281, max: 64255 },
    { workload: 'E', operation: 'INSERT (load)', min: 2662, max: 202367 },
    { workload: 'E', operation: 'INSERT (run)', min: 3054, max: 12639 }
  ];

  // Operation performance comparison data
  const operationData = [
    { workload: 'A', readAvgLatency: 737.35, updateAvgLatency: 3559.33 },
    { workload: 'B', readAvgLatency: 598.54, updateAvgLatency: 3616.58 },
    { workload: 'C', readAvgLatency: 723.38, updateAvgLatency: null },
    { workload: 'D', readAvgLatency: 617.01, updateAvgLatency: null }
  ];

  // Latency vs Throughput data
  const latencyThroughputData = [
    { name: 'A-INSERT-load', throughput: 159.03, latency: 5827.47, workload: 'A' },
    { name: 'A-READ-run', throughput: 384.17, latency: 737.35, workload: 'A' },
    { name: 'B-INSERT-load', throughput: 221.73, latency: 4028.95, workload: 'B' },
    { name: 'B-READ-run', throughput: 831.26, latency: 598.54, workload: 'B' },
    { name: 'C-INSERT-load', throughput: 213.08, latency: 4193.64, workload: 'C' },
    { name: 'C-READ-run', throughput: 844.59, latency: 723.38, workload: 'C' },
    { name: 'D-INSERT-load', throughput: 212.45, latency: 4248.81, workload: 'D' },
    { name: 'D-READ-run', throughput: 781.25, latency: 617.01, workload: 'D' },
    { name: 'E-INSERT-load', throughput: 198.81, latency: 4499.36, workload: 'E' },
    { name: 'E-INSERT-run', throughput: 587.89, latency: 4218.34, workload: 'E' }
  ];

  // Memory and connections data
  const resourceData = nodeData.map(node => ({
    node: node.node.split(':')[0],
    memory: node.memory,
    connections: node.connections
  }));

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '16px' }}>
      <h1 className="text-2xl font-bold mb-4">MongoDB Performance Dashboard (5 Nodes)</h1>
      
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
      
      {/* 3. Resource Usage Comparison */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Node Resource Usage</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={resourceData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="node" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="memory" name="Memory (MB)" fill="#8884d8" />
            <Bar dataKey="connections" name="Connections" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* 4. Workload Throughput Comparison */}
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
      
      {/* 5. Latency Distribution - Workload A */}
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
      
      {/* 6. Operation Performance Comparison */}
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
      
      {/* 7. Latency vs Throughput Scatter Plot */}
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
      
      {/* 8. Min/Max Latency Range for Workloads A-C */}
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
      
      {/* 9. P99 Latency Comparison Across Workloads */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">P99 Latency Comparison</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart 
            data={latencyData.filter(item => item.phase === 'run')} 
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="operation" />
            <YAxis label={{ value: 'P99 Latency (μs)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="p99" name="P99 Latency" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MongoDBFiveNodesDiagrams;