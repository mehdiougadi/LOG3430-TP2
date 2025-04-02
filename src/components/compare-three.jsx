import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  ScatterChart, Scatter, ZAxis, ComposedChart, Line, PieChart, Pie, Cell
} from 'recharts';

const DatabaseComparison3Nodes = () => {
  // Colors for consistent theming
  const COLORS = {
    redis: '#ff4757',
    mongo: '#2ed573',
    cassandra: '#1e90ff',
    workloadA: '#8884d8',
    workloadB: '#82ca9d',
    workloadC: '#ffc658',
    workloadD: '#ff8042',
    workloadE: '#a4de6c'
  };

  // Throughput comparison data
  const throughputComparisonData = [
    { 
      workload: 'Workload A', 
      redisLoad: 1788.91, redisRun: 2597.40,
      mongoLoad: 243.43, mongoRun: 416.49,
      cassandraLoad: 69.20, cassandraRun: 109.72
    },
    { 
      workload: 'Workload B', 
      redisLoad: 1941.75, redisRun: 2680.97,
      mongoLoad: 201.01, mongoRun: 853.24,
      cassandraLoad: 163.67, cassandraRun: 140.17
    },
    { 
      workload: 'Workload C', 
      redisLoad: 1949.32, redisRun: 2673.80,
      mongoLoad: 193.65, mongoRun: 1001.00,
      cassandraLoad: 159.54, cassandraRun: 184.50
    },
    { 
      workload: 'Workload D', 
      redisLoad: 1858.74, redisRun: 2645.50,
      mongoLoad: 216.54, mongoRun: 755.29,
      cassandraLoad: 226.55, cassandraRun: 219.39
    },
    { 
      workload: 'Workload E', 
      redisLoad: 1915.71, redisRun: 171.26,
      mongoLoad: 225.38, mongoRun: 564.02,
      cassandraLoad: 231.00, cassandraRun: 102.09
    }
  ];

  // Memory/Resource usage comparison
  const resourceUsageData = [
    { 
      metric: 'Memory Usage (MB)', 
      redis: 3.1,  // Average of the 3 nodes
      mongo: 347,  // All nodes same in sample
      cassandra: 0  // Not available in sample
    },
    { 
      metric: 'Connections', 
      redis: 1,    // Average of the 3 nodes
      mongo: 25,   // All nodes same in sample
      cassandra: 0  // Not available in sample
    },
    { 
      metric: 'Operations (millions)', 
      redis: 205.9,  // Average of the 3 nodes
      mongo: 4365005.667,  // All nodes same in sample
      cassandra: 0  // Not available in sample
    }
  ];

  // Average latency comparison for READ operations
  const readLatencyComparison = [
    { workload: 'A', redis: 170.16, mongo: 656.01, cassandra: 6108.76 },
    { workload: 'B', redis: 164.34, mongo: 568.74, cassandra: 4495.90 },
    { workload: 'C', redis: 167.04, mongo: 561.50, cassandra: 2526.77 },
    { workload: 'D', redis: 160.17, mongo: 656.21, cassandra: 1696.64 }
  ];

  // Average latency comparison for INSERT operations (load phase)
  const insertLatencyComparison = [
    { workload: 'A', redis: 337.14, mongo: 3660.64, cassandra: 9888.79 },
    { workload: 'B', redis: 314.07, mongo: 3789.67, cassandra: 3144.41 },
    { workload: 'C', redis: 317.09, mongo: 3969.21, cassandra: 1733.51 },
    { workload: 'D', redis: 335.32, mongo: 4143.53, cassandra: 1509.77 },
    { workload: 'E', redis: 322.77, mongo: 3965.67, cassandra: 1456.21 }
  ];

  // Throughput vs Latency scatter data
  const throughputLatencyScatterData = [
    // Redis data points
    { name: 'Redis-A-INSERT-load', throughput: 1788.91, latency: 337.144, db: 'redis', workload: 'A' },
    { name: 'Redis-A-READ-run', throughput: 2597.40, latency: 170.16, db: 'redis', workload: 'A' },
    { name: 'Redis-B-INSERT-load', throughput: 1941.75, latency: 314.071, db: 'redis', workload: 'B' },
    { name: 'Redis-B-READ-run', throughput: 2680.97, latency: 164.34, db: 'redis', workload: 'B' },
    { name: 'Redis-C-INSERT-load', throughput: 1949.32, latency: 317.088, db: 'redis', workload: 'C' },
    { name: 'Redis-C-READ-run', throughput: 2673.80, latency: 167.042, db: 'redis', workload: 'C' },
    
    // MongoDB data points
    { name: 'Mongo-A-INSERT-load', throughput: 243.43, latency: 3660.64, db: 'mongo', workload: 'A' },
    { name: 'Mongo-A-READ-run', throughput: 416.49, latency: 656.01, db: 'mongo', workload: 'A' },
    { name: 'Mongo-B-INSERT-load', throughput: 201.01, latency: 3789.67, db: 'mongo', workload: 'B' },
    { name: 'Mongo-B-READ-run', throughput: 853.24, latency: 568.74, db: 'mongo', workload: 'B' },
    { name: 'Mongo-C-INSERT-load', throughput: 193.65, latency: 3969.21, db: 'mongo', workload: 'C' },
    { name: 'Mongo-C-READ-run', throughput: 1001.00, latency: 561.50, db: 'mongo', workload: 'C' },
    
    // Cassandra data points
    { name: 'Cassandra-A-INSERT-load', throughput: 69.20, latency: 9888.79, db: 'cassandra', workload: 'A' },
    { name: 'Cassandra-A-READ-run', throughput: 109.72, latency: 6108.76, db: 'cassandra', workload: 'A' },
    { name: 'Cassandra-B-INSERT-load', throughput: 163.67, latency: 3144.41, db: 'cassandra', workload: 'B' },
    { name: 'Cassandra-B-READ-run', throughput: 140.17, latency: 4495.90, db: 'cassandra', workload: 'B' },
    { name: 'Cassandra-C-INSERT-load', throughput: 159.54, latency: 1733.51, db: 'cassandra', workload: 'C' },
    { name: 'Cassandra-C-READ-run', throughput: 184.50, latency: 2526.77, db: 'cassandra', workload: 'C' }
  ];

  // Custom shape for scatter plot to distinguish databases
  const renderCustomizedScatterShape = ({ cx, cy, payload }) => {
    let shape;
    switch(payload.db) {
      case 'redis':
        shape = <circle cx={cx} cy={cy} r={8} fill={COLORS.redis} />;
        break;
      case 'mongo':
        shape = <rect x={cx - 6} y={cy - 6} width={12} height={12} fill={COLORS.mongo} />;
        break;
      case 'cassandra':
        shape = <polygon points={`${cx-8},${cy+8} ${cx},${cy-8} ${cx+8},${cy+8}`} fill={COLORS.cassandra} />;
        break;
      default:
        shape = <circle cx={cx} cy={cy} r={6} fill="#8884d8" />;
    }
    return shape;
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
      <h1 className="text-3xl font-bold mb-6 text-center">Database Performance Comparison (3 Nodes)</h1>
      
      {/* 1. Throughput Comparison - Load Phase */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Throughput Comparison - Load Phase (ops/sec)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart 
            data={throughputComparisonData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="workload" />
            <YAxis label={{ value: 'Throughput (ops/sec)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="redisLoad" name="Redis" fill={COLORS.redis} />
            <Bar dataKey="mongoLoad" name="MongoDB" fill={COLORS.mongo} />
            <Bar dataKey="cassandraLoad" name="Cassandra" fill={COLORS.cassandra} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* 2. Throughput Comparison - Run Phase */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Throughput Comparison - Run Phase (ops/sec)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart 
            data={throughputComparisonData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="workload" />
            <YAxis label={{ value: 'Throughput (ops/sec)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="redisRun" name="Redis" fill={COLORS.redis} />
            <Bar dataKey="mongoRun" name="MongoDB" fill={COLORS.mongo} />
            <Bar dataKey="cassandraRun" name="Cassandra" fill={COLORS.cassandra} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* 3. Resource Usage Comparison */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Resource Usage Comparison</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart 
            data={resourceUsageData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="metric" type="category" width={150} />
            <Tooltip />
            <Legend />
            <Bar dataKey="redis" name="Redis" fill={COLORS.redis} />
            <Bar dataKey="mongo" name="MongoDB" fill={COLORS.mongo} />
            <Bar dataKey="cassandra" name="Cassandra" fill={COLORS.cassandra} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* 4. READ Operation Latency Comparison */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">READ Operation Latency Comparison (μs)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart 
            data={readLatencyComparison} 
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="workload" />
            <YAxis label={{ value: 'Latency (μs)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="redis" name="Redis" fill={COLORS.redis} />
            <Bar dataKey="mongo" name="MongoDB" fill={COLORS.mongo} />
            <Bar dataKey="cassandra" name="Cassandra" fill={COLORS.cassandra} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* 5. INSERT Operation Latency Comparison (Load Phase) */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">INSERT Operation Latency Comparison - Load Phase (μs)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart 
            data={insertLatencyComparison} 
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="workload" />
            <YAxis label={{ value: 'Latency (μs)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="redis" name="Redis" fill={COLORS.redis} />
            <Bar dataKey="mongo" name="MongoDB" fill={COLORS.mongo} />
            <Bar dataKey="cassandra" name="Cassandra" fill={COLORS.cassandra} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* 6. Throughput vs Latency Scatter Plot */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Throughput vs Latency Comparison</h2>
        <ResponsiveContainer width="100%" height={500}>
          <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number" 
              dataKey="throughput" 
              name="Throughput" 
              label={{ value: 'Throughput (ops/sec)', position: 'insideBottom', offset: -5 }} 
            />
            <YAxis 
              type="number" 
              dataKey="latency" 
              name="Latency" 
              label={{ value: 'Average Latency (μs)', angle: -90, position: 'insideLeft' }} 
            />
            <ZAxis dataKey="workload" name="Workload" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter 
              name="Redis" 
              data={throughputLatencyScatterData.filter(d => d.db === 'redis')} 
              fill={COLORS.redis}
              shape={renderCustomizedScatterShape}
            />
            <Scatter 
              name="MongoDB" 
              data={throughputLatencyScatterData.filter(d => d.db === 'mongo')} 
              fill={COLORS.mongo}
              shape={renderCustomizedScatterShape}
            />
            <Scatter 
              name="Cassandra" 
              data={throughputLatencyScatterData.filter(d => d.db === 'cassandra')} 
              fill={COLORS.cassandra}
              shape={renderCustomizedScatterShape}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      
      {/* 7. Performance Summary */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Performance Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border p-4 rounded">
            <h3 className="font-bold text-lg mb-2" style={{ color: COLORS.redis }}>Redis</h3>
            <ul className="list-disc pl-5">
              <li>Highest throughput across all workloads</li>
              <li>Lowest latency for all operations</li>
              <li>Minimal memory usage compared to others</li>
              <li>Best for high-speed caching scenarios</li>
            </ul>
          </div>
          <div className="border p-4 rounded">
            <h3 className="font-bold text-lg mb-2" style={{ color: COLORS.mongo }}>MongoDB</h3>
            <ul className="list-disc pl-5">
              <li>Moderate throughput, significantly lower than Redis</li>
              <li>Higher latency but more consistent across workloads</li>
              <li>Higher memory usage</li>
              <li>Good for document-oriented data with complex queries</li>
            </ul>
          </div>
          <div className="border p-4 rounded">
            <h3 className="font-bold text-lg mb-2" style={{ color: COLORS.cassandra }}>Cassandra</h3>
            <ul className="list-disc pl-5">
              <li>Lowest throughput among the three</li>
              <li>Highest latency, especially for initial loads</li>
              <li>Performance improves for read-heavy workloads</li>
              <li>Best for write-heavy, distributed scenarios</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseComparison3Nodes;