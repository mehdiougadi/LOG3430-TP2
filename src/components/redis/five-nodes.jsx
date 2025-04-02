import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  ScatterChart, Scatter, ZAxis, ComposedChart, Line, PieChart, Pie, Cell
} from 'recharts';

const RedisFiveNodesDiagrams = () => {
  // Node data from redis_metrics.csv
  const nodeData = [
    { node: 'redis-node1', memory: 3007992, clients: 1, commands: 111150, hits: 97127, misses: 2615 },
    { node: 'redis-node2', memory: 3144952, clients: 1, commands: 170697, hits: 109668, misses: 0 },
    { node: 'redis-node3', memory: 3003696, clients: 1, commands: 121937, hits: 110020, misses: 0 },
    { node: 'redis-node4', memory: 2942968, clients: 1, commands: 105998, hits: 95668, misses: 0 },
    { node: 'redis-node5', memory: 2963320, clients: 1, commands: 108662, hits: 97687, misses: 0 }
  ];
  
  // Memory usage data in MB for better readability
  const memoryData = nodeData.map(node => ({
    node: node.node,
    memory: (node.memory / 1024 / 1024).toFixed(2)
  }));

  // Command distribution data
  const commandData = nodeData.map(node => ({
    node: node.node,
    commands: node.commands
  }));

  // Hit/Miss ratio data
  const hitMissData = [
    { name: 'Hits', value: nodeData.reduce((sum, node) => sum + node.hits, 0) },
    { name: 'Misses', value: nodeData.reduce((sum, node) => sum + node.misses, 0) }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  // Parse YCSB data from redis_ycsb_summary.csv
  const throughputData = [
    { workload: 'Workload B (load)', throughput: 1811.59 },
    { workload: 'Workload B (run)', throughput: 2680.97 },
    { workload: 'Workload C (load)', throughput: 1934.24 },
    { workload: 'Workload C (run)', throughput: 802.57 },
    { workload: 'Workload D (load)', throughput: 1879.70 },
    { workload: 'Workload D (run)', throughput: 2597.40 },
    { workload: 'Workload E (load)', throughput: 1751.31 },
    { workload: 'Workload E (run)', throughput: 163.00 }
  ];

  // Latency data from redis_ycsb_summary.csv
  const latencyData = [
    { workload: 'B', phase: 'load', operation: 'INSERT', avg: 346.84, p95: 519, p99: 869 },
    { workload: 'B', phase: 'run', operation: 'READ', avg: 167.51, p95: 229, p99: 359 },
    { workload: 'B', phase: 'run', operation: 'UPDATE', avg: 235.43, p95: 385, p99: 1258 },
    { workload: 'C', phase: 'load', operation: 'INSERT', avg: 317.69, p95: 468, p99: 833 },
    { workload: 'C', phase: 'run', operation: 'READ', avg: 179.65, p95: 258, p99: 377 },
    { workload: 'D', phase: 'load', operation: 'INSERT', avg: 333.67, p95: 478, p99: 740 },
    { workload: 'D', phase: 'run', operation: 'INSERT', avg: 507.61, p95: 640, p99: 1031 },
    { workload: 'D', phase: 'run', operation: 'READ', avg: 165.95, p95: 221, p99: 390 },
    { workload: 'E', phase: 'load', operation: 'INSERT', avg: 348.89, p95: 529, p99: 892 },
    { workload: 'E', phase: 'run', operation: 'INSERT', avg: 608.40, p95: 836, p99: 1690 }
  ];

  // Min/Max Latency data from redis_ycsb_summary.csv
  const minMaxLatencyData = [
    { workload: 'B', operation: 'INSERT (load)', min: 232, max: 6775 },
    { workload: 'B', operation: 'READ (run)', min: 110, max: 7487 },
    { workload: 'B', operation: 'UPDATE (run)', min: 167, max: 1258 },
    { workload: 'C', operation: 'INSERT (load)', min: 220, max: 7239 },
    { workload: 'C', operation: 'READ (run)', min: 115, max: 7559 },
    { workload: 'D', operation: 'INSERT (load)', min: 215, max: 6835 },
    { workload: 'D', operation: 'INSERT (run)', min: 295, max: 2825 },
    { workload: 'D', operation: 'READ (run)', min: 112, max: 7739 },
    { workload: 'E', operation: 'INSERT (load)', min: 227, max: 10071 },
    { workload: 'E', operation: 'INSERT (run)', min: 314, max: 1690 }
  ];

  // Operation performance comparison data - focused on workloads with both READ and UPDATE
  const operationData = [
    { workload: 'B', readAvgLatency: 167.51, updateAvgLatency: 235.43 },
    { workload: 'D', readAvgLatency: 165.95, insertAvgLatency: 507.61 }
  ];

  // Latency vs Throughput data
  const latencyThroughputData = [
    { name: 'B-INSERT-load', throughput: 1811.59, latency: 346.84, workload: 'B' },
    { name: 'B-READ-run', throughput: 2680.97, latency: 167.51, workload: 'B' },
    { name: 'C-INSERT-load', throughput: 1934.24, latency: 317.69, workload: 'C' },
    { name: 'C-READ-run', throughput: 802.57, latency: 179.65, workload: 'C' },
    { name: 'D-INSERT-load', throughput: 1879.70, latency: 333.67, workload: 'D' },
    { name: 'D-READ-run', throughput: 2597.40, latency: 165.95, workload: 'D' },
    { name: 'E-INSERT-load', throughput: 1751.31, latency: 348.89, workload: 'E' },
    { name: 'E-INSERT-run', throughput: 163.00, latency: 608.40, workload: 'E' }
  ];

  // Hits per node data
  const hitsPerNodeData = nodeData.map(node => ({
    node: node.node,
    hits: node.hits
  }));

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '16px' }}>
      <h1 className="text-2xl font-bold mb-4">Redis Performance Dashboard (5 Nodes)</h1>
      
      {/* 1. Memory Usage Distribution */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Memory Usage Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={memoryData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="node" angle={-45} textAnchor="end" />
            <YAxis label={{ value: 'Memory (MB)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Bar dataKey="memory" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* 2. Hit/Miss Ratio */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Cache Hit/Miss Ratio</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={hitMissData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({name, percent}) => `${name}: ${(percent * 100).toFixed(1)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {hitMissData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* 3. Commands Distribution */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Commands Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={commandData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="node" />
            <YAxis label={{ value: 'Command Count', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Bar dataKey="commands" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 4. Hits Distribution */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Cache Hits Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={hitsPerNodeData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="node" />
            <YAxis label={{ value: 'Hit Count', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Bar dataKey="hits" fill="#ff7300" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* 5. Workload Throughput Comparison */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Workload Throughput Comparison</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={throughputData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="workload" angle={-45} textAnchor="end" height={100} />
            <YAxis label={{ value: 'Throughput (ops/sec)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Bar dataKey="throughput" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* 6. Latency Distribution - Workload B */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Latency Distribution - Workload B</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart 
            data={latencyData.filter(item => item.workload === 'B')} 
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
      
      {/* 7. Operation Performance Comparison */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Operation Performance Comparison</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={operationData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="workload" />
            <YAxis label={{ value: 'Average Latency (μs)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="readAvgLatency" name="READ" fill="#8884d8" />
            <Bar dataKey="updateAvgLatency" name="UPDATE" fill="#82ca9d" />
            <Bar dataKey="insertAvgLatency" name="INSERT" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* 8. Latency vs Throughput Scatter Plot */}
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
      
      {/* 9. Min/Max Latency Range */}
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

export default RedisFiveNodesDiagrams;