import React, { useState, useEffect } from 'react';


const INITIAL_METRICS = [
  { timestamp: '00:05', throughput: 34, errorRate: 2 },
  { timestamp: '00:04', throughput: 52, errorRate: 1 },
  { timestamp: '00:03', throughput: 45, errorRate: 4 },
  { timestamp: '00:02', throughput: 78, errorRate: 12 },
  { timestamp: '00:01', throughput: 61, errorRate: 3 }
];

function App() {
  
  const [metrics, setMetrics] = useState(INITIAL_METRICS);
  const [isStreaming, setIsStreaming] = useState(true);
  const [metricTarget, setMetricTarget] = useState('throughput'); 
  const [throughputThreshold, setThroughputThreshold] = useState(80);

 
  useEffect(() => {
    if (!isStreaming) return;

    const streamInterval = setInterval(() => {
      setMetrics(prevMetrics => {
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        
       
        const randomThroughput = Math.floor(Math.random() * 60) + 25; 
        const randomErrorRate = Math.floor(Math.random() * 15) + (randomThroughput > 75 ? 8 : 1);

        const nextNode = {
          timestamp: currentTime,
          throughput: randomThroughput,
          errorRate: randomErrorRate
        };

        
        const truncatedQueue = [nextNode, ...prevMetrics];
        if (truncatedQueue.length > 10) {
          truncatedQueue.pop();
        }
        return truncatedQueue;
      });
    }, 1000);

    return () => clearInterval(streamInterval);
  }, [isStreaming]);


  const handleInjectSurge = () => {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const surgeNode = {
      timestamp: currentTime,
      throughput: 98, 
      errorRate: 22
    };
    setMetrics(prev => [surgeNode, ...prev.slice(0, 9)]);
  };

  const graphWidth = 500;
  const graphHeight = 180;
  const padding = 25;

  
  const targetPoints = [...metrics].reverse();
  const coordinatePointsString = targetPoints.map((metric, index) => {
    if (targetPoints.length <= 1) return '0,0';
    
  
    const x = padding + (index * (graphWidth - padding * 2)) / (targetPoints.length - 1);
    
    
    const activeValue = metric[metricTarget];
    const y = graphHeight - padding - (activeValue * (graphHeight - padding * 2)) / 100;
    
    return `${x},${y}`;
  }).join(' ');

  
  const operationalPeakValue = metrics.length > 0 ? Math.max(...metrics.map(m => m[metricTarget])) : 0;
  const thresholdAnomalyTriggered = metrics.length > 0 && metrics[0].throughput >= throughputThreshold;

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 24px', fontFamily: 'monospace', backgroundColor: '#070a13', color: '#f8fafc', minHeight: '90vh' }}>
      
      
      <header style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '25px', marginBottom: '35px', gap: '20px' }}>
        <div>
          <h1 style={{ margin: '0', fontSize: '24px', fontWeight: 'bold', color: '#06b6d4', letterSpacing: '-0.5px' }}> DevStream Telemetry Profiler</h1>
          <p style={{ margin: '4px 0 0 0', color: '#475569', fontSize: '12px' }}>Time-series data processor calculating mathematical vector pathways inside a responsive layout canvas.</p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => setIsStreaming(!isStreaming)}
            style={{ padding: '10px 18px', backgroundColor: '#1e293b', border: '1px solid #334155', color: isStreaming ? '#34d399' : '#f43f5e', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}
          >
            {isStreaming ? '🟢 Live Data Active' : '🛑 Stream Interrupted'}
          </button>
          <button 
            onClick={handleInjectSurge}
            disabled={!isStreaming}
            style={{ padding: '10px 18px', backgroundColor: '#06b6d4', color: '#070a13', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: !isStreaming ? 'not-allowed' : 'pointer', fontSize: '12px', opacity: isStreaming ? 1 : 0.4 }}
          >
             Force Traffic Surge
          </button>
        </div>
      </header>

     
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '30px', marginBottom: '40px' }}>
        
        
        <section style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '25px', borderRadius: '16px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '13px', color: '#475569', textTransform: 'uppercase', margin: '0' }}>Dynamic Vector Line Visualization</h3>
            <div style={{ display: 'flex', gap: '4px' }}>
              {['throughput', 'errorRate'].map(m => (
                <button
                  key={m}
                  onClick={() => setMetricTarget(m)}
                  style={{ border: 'none', padding: '4px 10px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: metricTarget === m ? '#06b6d4' : '#1e293b', color: metricTarget === m ? '#070a13' : '#94a3b8' }}
                >
                  {m === 'throughput' ? 'Network Throughput' : 'Failure Errors'}
                </button>
              ))}
            </div>
          </div>

         
          <div style={{ backgroundColor: '#070a13', border: '1px dashed #334155', borderRadius: '14px', padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox={`0 0 ${graphWidth} ${graphHeight}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
             
              <line x1={padding} y1={padding} x2={graphWidth - padding} y2={padding} stroke="#1e293b" strokeDasharray="4 4" />
              <line x1={padding} y1={graphHeight / 2} x2={graphWidth - padding} y2={graphHeight / 2} stroke="#1e293b" strokeDasharray="4 4" />
              <line x1={padding} y1={graphHeight - padding} x2={graphWidth - padding} y2={graphHeight - padding} stroke="#1e293b" />

              {/*  */}
              {targetPoints.length > 1 && (
                <polyline
                  fill="none"
                  stroke={metricTarget === 'throughput' ? '#06b6d4' : '#f43f5e'}
                  strokeWidth="3"
                  points={coordinatePointsString}
                  style={{ transition: 'points 0.3s ease-in-out' }}
                />
              )}

              {/* */}
              {coordinatePointsString.split(' ').map((point, i) => {
                const [cx, cy] = point.split(',');
                return cx && cy ? (
                  <circle key={i} cx={cx} cy={cy} r="4" fill={metricTarget === 'throughput' ? '#22d3ee' : '#f87171'} />
                ) : null;
              })}
            </svg>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', fontSize: '11px', color: '#475569' }}>
            <span>Timeline Framework Scope: 10 Data Packets Max Window Loop</span>
            <span>Target Peak: {operationalPeakValue}% Max</span>
          </div>
        </section>

        {/*  */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* */}
          <div style={{ 
            backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px',
            borderLeft: `4px solid ${thresholdAnomalyTriggered ? '#ef4444' : '#1e293b'}`
          }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#475569', textTransform: 'uppercase' }}>Anomaly Boundary Diagnostics</h3>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ flex: '1' }}>
                <label style={{ display: 'block', fontSize: '11px', color: '#cbd5e1', marginBottom: '4px' }}>Enforce Alert Margin ({throughputThreshold}%)</label>
                <input type="range" min="50" max="95" value={throughputThreshold} onChange={(e) => setThresholdAnomalyTriggered(Number(e.target.value))} style={{ width: '100%', accentColor: '#06b6d4', cursor: 'pointer' }} />
              </div>
              <div style={{ padding: '8px 14px', borderRadius: '6px', backgroundColor: thresholdAnomalyTriggered ? 'rgba(239, 68, 68, 0.1)' : 'rgba(71, 85, 105, 0.1)', color: thresholdAnomalyTriggered ? '#f43f5e' : '#475569', fontSize: '12px', fontWeight: 'bold' }}>
                {thresholdAnomalyTriggered ? '⚠️ SURGE TRIGGERED' : 'SYSTEM OPTIMAL'}
              </div>
            </div>
          </div>

          {/* TIME-SERIES LOG EVENT TICKER ROWS */}
          <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px', flexGrow: '1' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '13px', color: '#475569', textTransform: 'uppercase' }}>Ingested Metric Packet Index Trace</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
              {metrics.map((metric, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#070a13', padding: '10px 14px', borderRadius: '6px', border: '1px solid #1e293b', fontSize: '12px' }}>
                  <span style={{ color: '#475569' }}>⏰ {metric.timestamp}</span>
                  <div>
                    <span style={{ color: '#06b6d4', marginRight: '15px' }}>Flow: {metric.throughput}kb/s</span>
                    <span style={{ color: '#f43f5e' }}>Failures: {metric.errorRate}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

      </div>

    </div>
  );
}

export default App;