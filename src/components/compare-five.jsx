import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  ScatterChart, Scatter, ZAxis, ComposedChart, Line, PieChart, Pie, Cell
} from 'recharts';

const DatabaseComparisonFiveNodes = () => {
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

  // Throughput comparison data (load phase)
  const throughputLoadData = [
    { 
      workload: 'Workload A', 
      redis: 1788.91,
      mongo: 159.03,
      cassandra: 65.62
    },
    { 
      workload: 'Workload B', 
      redis: 1941.75,
      mongo: 221.73,
      cassandra: 102.41
    },
    { 
      workload: 'Workload C', 
      redis: 1949.32,
      mongo: 213.08,
      cassandra: 169.58
    },
    { 
      workload: 'Workload D', 
      redis: 1858.74,
      mongo: 212.45,
      cassandra: 203.42
    },
    { 
      workload: 'Workload E', 
      redis: 1915.71,
      mongo: 198.81,
      cassandra: 206.48
    }
  ];

  // Throughput comparison data (run phase)
  const throughputRunData = [
    { 
      workload: 'Workload A', 
      redis: 2597.40,
      mongo: 384.17,
      cassandra: 89.17
    },
    { 
      workload: 'Workload B', 
      redis: 2680.97,
      mongo: 831.26,
      cassandra: 179.50
    },
    { 
      workload: 'Workload C', 
      redis: 2673.80,
      mongo: 844.59,
      cassandra: 208.86
    },
    { 
      workload: 'Workload D', 
      redis: 2645.50,
      mongo: 781.25,
      cassandra: 177.09
    },
    { 
      workload: 'Workload E', 
      redis: 171.26,
      mongo: 587.89,
      cassandra: 83.49
    }
  ];

  // Resource usage comparison
  const resourceUsageData = [
    { 
      metric: 'Memory Usage (MB)', 
      redis: 3.01,  // Average of 5 nodes
      mongo: 346,   // All nodes same in sample
      cassandra: 0  // Not available in sample
    },
    { 
      metric: 'Connections', 
      redis: 1,     // Average of 5 nodes
      mongo: 41,    // All nodes same in sample
      cassandra: 0  // Not available in sample
    },
    { 
      metric: 'Operations (millions)', 
      redis: 123.5,  // Average of 5 nodes
      mongo: 4365105.666,  // All nodes same in sample
      cassandra: 0  // Not available in sample
    }
  ];

  // Average latency comparison for READ operations (run phase)
  const readLatencyComparison = [
    { workload: 'A', redis: 170.16, mongo: 737.35, cassandra: 9626.51 },
    { workload: 'B', redis: 167.51, mongo: 598.54, cassandra: 2591.56 },
    { workload: 'C', redis: 179.65, mongo: 723.38, cassandra: 1882.88 },
    { workload: 'D', redis: 165.95, mongo: 617.01, cassandra: 2659.61 }
  ];

  // Average latency comparison for INSERT operations (load phase)
  const insertLatencyComparison = [
    { workload: 'A', redis: 337.14, mongo: 5827.47, cassandra: 12233.97 },
    { workload: 'B', redis: 346.84, mongo: 4028.95, cassandra: 4986.49 },
    { workload: 'C', redis: 317.69, mongo: 4193.64, cassandra: 2930.62 },
    { workload: 'D', redis: 333.67, mongo: 4248.81, cassandra: 1945.47 },
    { workload: 'E', redis: 348.89, mongo: 4499.36, cassandra: 1873.28 }
  ];

  // Throughput vs Latency scatter data
  const throughputLatencyScatterData = [
    // Redis data points
    { name: 'Redis-A-INSERT-load', throughput: 1788.91, latency: 337.14, db: 'redis', workload: 'A' },
    { name: 'Redis-A-READ-run', throughput: 2597.40, latency: 170.16, db: 'redis', workload: 'A' },
    { name: 'Redis-B-INSERT-load', throughput: 1941.75, latency: 346.84, db: 'redis', workload: 'B' },
    { name: 'Redis-B-READ-run', throughput: 2680.97, latency: 167.51, db: 'redis', workload: 'B' },
    { name: 'Redis-C-INSERT-load', throughput: 1949.32, latency: 317.69, db: 'redis', workload: 'C' },
    { name: 'Redis-C-READ-run', throughput: 2673.80, latency: 179.65, db: 'redis', workload: 'C' },
    
    // MongoDB data points
    { name: 'Mongo-A-INSERT-load', throughput: 159.03, latency: 5827.47, db: 'mongo', workload: 'A' },
    { name: 'Mongo-A-READ-run', throughput: 384.17, latency: 737.35, db: 'mongo', workload: 'A' },
    { name: 'Mongo-B-INSERT-load', throughput: 221.73, latency: 4028.95, db: 'mongo', workload: 'B' },
    { name: 'Mongo-B-READ-run', throughput: 831.26, latency: 598.54, db: 'mongo', workload: 'B' },
    { name: 'Mongo-C-INSERT-load', throughput: 213.08, latency: 4193.64, db: 'mongo', workload: 'C' },
    { name: 'Mongo-C-READ-run', throughput: 844.59, latency: 723.38, db: 'mongo', workload: 'C' },
    
    // Cassandra data points
    { name: 'Cassandra-A-INSERT-load', throughput: 65.62, latency: 12233.97, db: 'cassandra', workload: 'A' },
    { name: 'Cassandra-A-READ-run', throughput: 89.17, latency: 9626.51, db: 'cassandra', workload: 'A' },
    { name: 'Cassandra-B-INSERT-load', throughput: 102.41, latency: 4986.49, db: 'cassandra', workload: 'B' },
    { name: 'Cassandra-B-READ-run', throughput: 179.50, latency: 2591.56, db: 'cassandra', workload: 'B' },
    { name: 'Cassandra-C-INSERT-load', throughput: 169.58, latency: 2930.62, db: 'cassandra', workload: 'C' },
    { name: 'Cassandra-C-READ-run', throughput: 208.86, latency: 1882.88, db: 'cassandra', workload: 'C' }
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

  // P99 latency comparison for READ operations
  const p99ReadLatencyComparison = [
    { workload: 'A', redis: 346, mongo: 1575, cassandra: 81087 },
    { workload: 'B', redis: 359, mongo: 1271, cassandra: 34015 },
    { workload: 'C', redis: 377, mongo: 2047, cassandra: 2929 },
    { workload: 'D', redis: 390, mongo: 1461, cassandra: 53247 }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
      <h1 className="text-3xl font-bold mb-6 text-center">Database Performance Comparison (5 Nodes)</h1>
      
      {/* 1. Throughput Comparison - Load Phase */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Throughput Comparison - Load Phase (ops/sec)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart 
            data={throughputLoadData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="workload" />
            <YAxis 
              label={{ value: 'Throughput (ops/sec)', angle: -90, position: 'insideLeft' }} 
              domain={[0, 2100]}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="redis" name="Redis" fill={COLORS.redis} />
            <Bar dataKey="mongo" name="MongoDB" fill={COLORS.mongo} />
            <Bar dataKey="cassandra" name="Cassandra" fill={COLORS.cassandra} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* 2. Throughput Comparison - Run Phase */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Throughput Comparison - Run Phase (ops/sec)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart 
            data={throughputRunData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="workload" />
            <YAxis 
              label={{ value: 'Throughput (ops/sec)', angle: -90, position: 'insideLeft' }} 
              domain={[0, 2800]}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="redis" name="Redis" fill={COLORS.redis} />
            <Bar dataKey="mongo" name="MongoDB" fill={COLORS.mongo} />
            <Bar dataKey="cassandra" name="Cassandra" fill={COLORS.cassandra} />
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
            <YAxis 
              label={{ value: 'Latency (μs)', angle: -90, position: 'insideLeft' }} 
              domain={[0, 10000]}
            />
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
            <YAxis 
              label={{ value: 'Latency (μs)', angle: -90, position: 'insideLeft' }} 
              domain={[0, 13000]}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="redis" name="Redis" fill={COLORS.redis} />
            <Bar dataKey="mongo" name="MongoDB" fill={COLORS.mongo} />
            <Bar dataKey="cassandra" name="Cassandra" fill={COLORS.cassandra} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* 6. P99 READ Latency Comparison */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">P99 READ Latency Comparison (μs)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart 
            data={p99ReadLatencyComparison} 
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="workload" />
            <YAxis 
              label={{ value: 'P99 Latency (μs)', angle: -90, position: 'insideLeft' }} 
              domain={[0, 90000]}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="redis" name="Redis" fill={COLORS.redis} />
            <Bar dataKey="mongo" name="MongoDB" fill={COLORS.mongo} />
            <Bar dataKey="cassandra" name="Cassandra" fill={COLORS.cassandra} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* 7. Throughput vs Latency Scatter Plot */}
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
              domain={[0, 2800]}
            />
            <YAxis 
              type="number" 
              dataKey="latency" 
              name="Latency" 
              label={{ value: 'Average Latency (μs)', angle: -90, position: 'insideLeft' }} 
              domain={[0, 13000]}
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
      
      {/* 8. Performance Summary */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Performance Summary (5 Nodes)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border p-4 rounded">
            <h3 className="font-bold text-lg mb-2" style={{ color: COLORS.redis }}>Redis</h3>
            <ul className="list-disc pl-5">
              <li>Exceptional throughput (10-100x higher than others)</li>
              <li>Consistently lowest latency across all operations</li>
              <li>Minimal resource usage per node</li>
              <li>Ideal for high-speed caching and low-latency requirements</li>
              <li>Shows excellent horizontal scaling with 5 nodes</li>
            </ul>
          </div>
          <div className="border p-4 rounded">
            <h3 className="font-bold text-lg mb-2" style={{ color: COLORS.mongo }}>MongoDB</h3>
            <ul className="list-disc pl-5">
              <li>Moderate throughput (2-5x higher than Cassandra)</li>
              <li>Higher but more consistent latency than Cassandra</li>
              <li>Higher memory usage per node</li>
              <li>Good for document-oriented workloads with complex queries</li>
              <li>Scales well with 5 nodes for read-heavy workloads</li>
            </ul>
          </div>
          <div className="border p-4 rounded">
            <h3 className="font-bold text-lg mb-2" style={{ color: COLORS.cassandra }}>Cassandra</h3>
            <ul className="list-disc pl-5">
              <li>Lowest throughput among the three</li>
              <li>Highest latency, especially for initial loads</li>
              <li>Performance improves for read-heavy workloads</li>
              <li>Best for write-heavy, distributed scenarios</li>
              <li>Shows better scaling with 5 nodes compared to 3 nodes</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 9. Scaling Comparison */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Scaling Observations (3 vs 5 Nodes)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border p-4 rounded">
            <h3 className="font-bold text-lg mb-2" style={{ color: COLORS.redis }}>Redis Scaling</h3>
            <ul className="list-disc pl-5">
              <li>Throughput remains consistently high</li>
              <li>Latency stays low and stable</li>
              <li>Resource usage per node decreases slightly</li>
              <li>Excellent linear scaling characteristics</li>
            </ul>
          </div>
          <div className="border p-4 rounded">
            <h3 className="font-bold text-lg mb-2" style={{ color: COLORS.mongo }}>MongoDB Scaling</h3>
            <ul className="list-disc pl-5">
              <li>Throughput improves significantly with more nodes</li>
              <li>Latency becomes more consistent</li>
              <li>Better distribution of read operations</li>
              <li>Primary-secondary architecture shows good read scaling</li>
            </ul>
          </div>
          <div className="border p-4 rounded">
            <h3 className="font-bold text-lg mb-2" style={{ color: COLORS.cassandra }}>Cassandra Scaling</h3>
            <ul className="list-disc pl-5">
              <li>Throughput improves but still lowest among the three</li>
              <li>Latency becomes more predictable with more nodes</li>
              <li>Better distribution of both read and write operations</li>
              <li>Shows the most improvement from 3 to 5 nodes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseComparisonFiveNodes;