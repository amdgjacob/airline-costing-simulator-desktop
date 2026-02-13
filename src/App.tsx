import { useState, useMemo } from 'react';
import { INITIAL_ROUTES, OVERHEAD_CATEGORIES } from './data';
import { calculateFinancials, formatCurrency } from './utils';
import type { RouteState, OverheadState } from './utils';
import { RouteManager } from './components/RouteManager';
import { AssumptionsPanel } from './components/AssumptionsPanel';
import { Dashboard } from './components/Dashboard';
import { Sidebar } from './components/Sidebar';


function App() {
  const [routes, setRoutes] = useState<RouteState[]>(
    INITIAL_ROUTES.map(r => ({ ...r, isActive: true }))
  );

  const [overheads, setOverheads] = useState<OverheadState[]>(
    OVERHEAD_CATEGORIES.map(c => ({ ...c, currentFixedPct: c.defaultFixedPct }))
  );

  const handleToggleRoute = (id: number) => {
    setRoutes(prev => prev.map(r =>
      r.id === id ? { ...r, isActive: !r.isActive } : r
    ));
  };

  const handleChangeFixity = (id: string, newPct: number) => {
    setOverheads(prev => prev.map(o =>
      o.id === id ? { ...o, currentFixedPct: newPct } : o
    ));
  };

  const handleReset = () => {
    setRoutes(INITIAL_ROUTES.map(r => ({ ...r, isActive: true })));
    setOverheads(OVERHEAD_CATEGORIES.map(c => ({ ...c, currentFixedPct: c.defaultFixedPct })));
  };

  const financials = useMemo(() =>
    calculateFinancials(routes, overheads, INITIAL_ROUTES),
    [routes, overheads]);

  // Calculate baseline with all routes active for comparison
  const baselineFinancials = useMemo(() => {
    const allRoutesActive = INITIAL_ROUTES.map(r => ({ ...r, isActive: true }));
    return calculateFinancials(allRoutesActive, overheads, INITIAL_ROUTES);
  }, [overheads]);

  // Calculate % change from baseline
  const revenuePctChange = baselineFinancials.totalRevenue > 0
    ? Math.round(((financials.totalRevenue - baselineFinancials.totalRevenue) / baselineFinancials.totalRevenue) * 100)
    : 0;

  const variableDirectPctChange = baselineFinancials.totalVariableDirect > 0
    ? Math.round(((financials.totalVariableDirect - baselineFinancials.totalVariableDirect) / baselineFinancials.totalVariableDirect) * 100)
    : 0;

  const overheadPctChange = baselineFinancials.totalOverhead > 0
    ? Math.round(((financials.totalOverhead - baselineFinancials.totalOverhead) / baselineFinancials.totalOverhead) * 100)
    : 0;


  const profitMarginPct = financials.totalRevenue > 0
    ? Math.round((financials.netIncome / financials.totalRevenue) * 100)
    : 0;

  return (
    <div className="min-h-screen" style={{ background: 'var(--page-bg)' }}>
      <Sidebar activeItem="dashboard" />

      <div className="main-wrapper">
        {/* Header */}
        <header className="header">
          <div className="flex items-center">
            <h1 className="header-title">Airline Costing Simulator</h1>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="https://www.linkedin.com/in/jacob-george/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium"
              style={{ color: '#000000', textDecoration: 'none', transition: 'color 0.2s', marginRight: '12px' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#2563eb')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#000000')}
            >
              Contact: Jacob George
            </a>
            <button className="btn btn--primary" onClick={handleReset}>
              Reset
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="content">
          {/* Stats Row */}
          <div className="grid grid-cols-5 gap-4 mb-3">
            <div className="stat-card">
              <div className="stat-label">Total Revenue</div>
              <div className="stat-value">{formatCurrency(financials.totalRevenue)}</div>
              <div className="stat-meta">
                {revenuePctChange !== 0 ? (
                  <span className={revenuePctChange < 0 ? 'stat-change stat-change--negative' : 'stat-change stat-change--positive'}>
                    {revenuePctChange > 0 ? '▲' : '▼'} {Math.abs(revenuePctChange)}%
                  </span>
                ) : (
                  'All active routes'
                )}
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-label">Variable Direct Costs</div>
              <div className="stat-value">{formatCurrency(financials.totalVariableDirect)}</div>
              <div className="stat-meta">
                {variableDirectPctChange !== 0 ? (
                  <span className={variableDirectPctChange < 0 ? 'stat-change stat-change--down' : 'stat-change stat-change--up'}>
                    {variableDirectPctChange > 0 ? '▲' : '▼'} {Math.abs(variableDirectPctChange)}%
                  </span>
                ) : (
                  'Fuel, crew, handling'
                )}
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-label">Overhead Costs</div>
              <div className="stat-value">{formatCurrency(financials.totalOverhead)}</div>
              <div className="stat-meta">
                {overheadPctChange !== 0 ? (
                  <span className={overheadPctChange < 0 ? 'stat-change stat-change--down' : 'stat-change stat-change--up'}>
                    {overheadPctChange > 0 ? '▲' : '▼'} {Math.abs(overheadPctChange)}%
                  </span>
                ) : (
                  'Fixed + Variable Indirect Costs'
                )}
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-label">Net Income</div>
              <div className={`stat-value ${financials.netIncome >= 0 ? 'stat-value--positive' : 'stat-value--negative'}`}>
                {formatCurrency(financials.netIncome)}
              </div>
              <div className="stat-meta">Revenue − Variable Direct − Overhead</div>
            </div>

            <div className="stat-card">
              <div className="stat-label">Profit Margin</div>
              <div className={`stat-value ${profitMarginPct >= 0 ? 'stat-value--positive' : 'stat-value--negative'}`}>
                {profitMarginPct}%
              </div>
              <div className="stat-meta">Net / Revenue</div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-12 gap-5">
            {/* Route Control */}
            <div className="col-span-5 card" style={{ minHeight: '460px' }}>
              <RouteManager routes={routes} onToggleRoute={handleToggleRoute} />
            </div>

            {/* Chart */}
            <div className="col-span-7 card">
              <div className="card-header">
                <div>
                  <div className="card-title">Route Performance</div>
                  <div className="card-subtitle">Revenue, costs, and profitability by route</div>
                </div>
              </div>
              <div className="card-body" style={{ height: '380px' }}>
                <Dashboard financials={financials} />
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-12 gap-5 mt-5">
            {/* Cost Behavior */}
            <div className="col-span-12 card">
              <AssumptionsPanel overheads={overheads} onChangeFixity={handleChangeFixity} />
            </div>
          </div>

          {/* Info Banner */}
          <div
            style={{
              marginTop: '16px',
              padding: '12px 16px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)',
              border: '1px solid #dbeafe',
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#475569'
            }}
          >
            <strong style={{ color: '#1e40af' }}>The Death Spiral: </strong>
            Fixed costs remain constant even when routes are dropped. Remaining routes absorb more overhead, potentially making them appear unprofitable too.
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
