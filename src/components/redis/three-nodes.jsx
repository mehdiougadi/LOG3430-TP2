import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  ScatterChart, Scatter, ZAxis, ComposedChart, Line, PieChart, Pie, Cell
} from 'recharts';

const RedisThreeNodesDiagrams = () => {
  // Node data from redis_metrics.csv
  const nodeData = [
    { node: 'redis-node1', memory: 3254656, clients: 1, commands: 181822, hits: 157385, misses: 5369 },
    { node: 'redis-node2', memory: 3427536, clients: 1, commands: 261466, hits: 190683, misses: 0 },
    { node: 'redis-node3', memory: 3174568, clients: 1, commands: 174437, hits: 156346, misses: 0 }
  ];
  
  // Memory usage data
  const memoryData = [
    { node: 'redis-node1', memory: 3254656 / 1024 / 1024 },
    { node: 'redis-node2', memory: 3427536 / 1024 / 1024 },
    { node: 'redis-node3', memory: 3174568 / 1024 / 1024 }
  ];

  // Command distribution data
  const commandData = [
    { node: 'redis-node1', commands: 181822 },
    { node: 'redis-node2', commands: 261466 },
    { node: 'redis-node3', commands: 174437 }
  ];

  // Hit/Miss ratio data
  const hitMissData = [
    { name: 'Hits', value: nodeData.reduce((sum, node) => sum + node.hits, 0) },
    { name: 'Misses', value: nodeData.reduce((sum, node) => sum + node.misses, 0) }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  // Workload throughput data from redis_ycsb_summary.csv
  const throughputData = [
    { workload: 'Workload A', loadPhase: 1788.91, runPhase: 2597.40 },
    { workload: 'Workload B', loadPhase: 1941.75, runPhase: 2680.97 },
    { workload: 'Workload C', loadPhase: 1949.32, runPhase: 2673.80 },
    { workload: 'Workload D', loadPhase: 1858.74, runPhase: 2645.50 },
    { workload: 'Workload E', loadPhase: 1915.71, runPhase: 171.26 }
  ];

  // Latency data by operation from redis_ycsb_summary.csv
  const latencyData = [
    { workload: 'A', phase: 'load', operation: 'INSERT', avg: 337.144, p95: 487, p99: 651 },
    { workload: 'A', phase: 'run', operation: 'READ', avg: 170.16, p95: 226, p99: 346 },
    { workload: 'A', phase: 'run', operation: 'UPDATE', avg: 188.65, p95: 265, p99: 408 },
    { workload: 'B', phase: 'load', operation: 'INSERT', avg: 314.071, p95: 454, p99: 665 },
    { workload: 'B', phase: 'run', operation: 'READ', avg: 164.34, p95: 232, p99: 383 },
    { workload: 'B', phase: 'run', operation: 'UPDATE', avg: 211.12, p95: 269, p99: 906 },
    { workload: 'C', phase: 'load', operation: 'INSERT', avg: 317.088, p95: 447, p99: 667 },
    { workload: 'C', phase: 'run', operation: 'READ', avg: 167.042, p95: 231, p99: 327 },
    { workload: 'D', phase: 'load', operation: 'INSERT', avg: 335.317, p95: 500, p99: 748 },
    { workload: 'D', phase: 'run', operation: 'INSERT', avg: 487.67, p95: 607, p99: 823 },
    { workload: 'D', phase: 'run', operation: 'READ', avg: 160.17, p95: 216, p99: 317 },
    { workload: 'E', phase: 'load', operation: 'INSERT', avg: 322.767, p95: 473, p99: 796 },
    { workload: 'E', phase: 'run', operation: 'INSERT', avg: 518.59, p95: 823, p99: 1138 }
  ];

  // Min/Max Latency data from redis_ycsb_summary.csv
  const minMaxLatencyData = [
    { workload: 'A', operation: 'INSERT (load)', min: 250, max: 7283 },
    { workload: 'A', operation: 'READ (run)', min: 115, max: 4335 },
    { workload: 'A', operation: 'UPDATE (run)', min: 141, max: 3733 },
    { workload: 'B', operation: 'INSERT (load)', min: 220, max: 6299 },
    { workload: 'B', operation: 'READ (run)', min: 110, max: 7171 },
    { workload: 'B', operation: 'UPDATE (run)', min: 150, max: 906 },
    { workload: 'C', operation: 'INSERT (load)', min: 227, max: 6307 },
    { workload: 'C', operation: 'READ (run)', min: 116, max: 7579 },
    { workload: 'D', operation: 'INSERT (load)', min: 233, max: 7043 },
    { workload: 'D', operation: 'INSERT (run)', min: 312, max: 2817 },
    { workload: 'D', operation: 'READ (run)', min: 111, max: 8015 },
    { workload: 'E', operation: 'INSERT (load)', min: 234, max: 6223 },
    { workload: 'E', operation: 'INSERT (run)', min: 312, max: 1886 }
  ];

  // Operation performance comparison data
  const operationData = [
    { workload: 'A', readAvgLatency: 170.16, updateAvgLatency: 188.65 },
    { workload: 'B', readAvgLatency: 164.34, updateAvgLatency: 211.12 },
    { workload: 'C', readAvgLatency: 167.04, updateAvgLatency: null },
    { workload: 'D', readAvgLatency: 160.17, updateAvgLatency: null }
  ];

  // Latency vs Throughput data
  const latencyThroughputData = [
    { name: 'A-INSERT-load', throughput: 1788.91, latency: 337.144, workload: 'A' },
    { name: 'A-READ-run', throughput: 2597.40, latency: 170.16, workload: 'A' },
    { name: 'B-INSERT-load', throughput: 1941.75, latency: 314.071, workload: 'B' },
    { name: 'B-READ-run', throughput: 2680.97, latency: 164.34, workload: 'B' },
    { name: 'C-INSERT-load', throughput: 1949.32, latency: 317.088, workload: 'C' },
    { name: 'C-READ-run', throughput: 2673.80, latency: 167.042, workload: 'C' },
    { name: 'D-INSERT-load', throughput: 1858.74, latency: 335.317, workload: 'D' },
    { name: 'D-READ-run', throughput: 2645.50, latency: 160.17, workload: 'D' },
    { name: 'E-INSERT-load', throughput: 1915.71, latency: 322.767, workload: 'E' },
    { name: 'E-INSERT-run', throughput: 171.26, latency: 518.59, workload: 'E' }
  ];

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '16px' }}>
      <h1 className="text-2xl font-bold mb-4">Redis Performance Dashboard (3 Nodes)</h1>
      
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
    </div>
  );
};

export default RedisThreeNodesDiagrams;