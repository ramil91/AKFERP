import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Filler, Tooltip, Legend,
} from 'chart.js';
import { IconDownload } from '@tabler/icons-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Filler, Tooltip, Legend);

const recentItems = [
  { id: 'R-0001', name: 'Community Program A', status: 'Active', date: '2026-04-01' },
  { id: 'R-0002', name: 'Relief Supply Chain', status: 'Active', date: '2026-04-02' },
  { id: 'R-0003', name: 'Orphan Support Plan', status: 'Pending', date: '2026-04-03' },
  { id: 'R-0004', name: 'Medical Camp Q2', status: 'Completed', date: '2026-04-04' },
  { id: 'R-0005', name: 'Education Fund 2026', status: 'Active', date: '2026-04-05' },
];

const statusBadge = (s: string) =>
  s === 'Active' ? 'bg-success' : s === 'Pending' ? 'bg-warning' : 'bg-secondary';

export function AdminDashboardPage() {
  return (
    <>
      {/* Stat cards */}
      <div className="row row-deck row-cards g-4 mb-4">
        {[
          { title: 'Active Programs', value: '128', color: 'bg-primary' },
          { title: 'Pending Reviews', value: '14', color: 'bg-info' },
          { title: 'Completed', value: '1,024', color: 'bg-warning' },
          { title: 'Scheduled Reports', value: '8', color: 'bg-danger' },
        ].map((stat) => (
          <div key={stat.title} className="col-sm-6 col-xl-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className={`stamp ${stat.color} me-3`}>
                    <span className="h3 text-white mb-0">{stat.value}</span>
                  </div>
                  <div>
                    <div className="subheader text-muted">{stat.title}</div>
                    <div className="h3 mb-0">{stat.value}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="row row-deck row-cards g-4 mb-4">
        <div className="col-md-8">
          <div className="card h-100">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h3 className="card-title">Monthly Activity</h3>
              <span className="badge bg-info">2026</span>
            </div>
            <div className="card-body">
              <div style={{ height: 260 }}>
                <Line
                  data={{
                    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
                    datasets: [
                      {
                        label: 'New records',
                        backgroundColor: 'rgba(75,192,192,0.2)',
                        borderColor: 'rgb(75,192,192)',
                        fill: true,
                        data: [40,60,55,70,80,65,90,85,95,100,110,120],
                      },
                      {
                        label: 'Completed',
                        backgroundColor: 'rgba(54,162,235,0.2)',
                        borderColor: 'rgb(54,162,235)',
                        fill: true,
                        data: [30,45,50,60,70,55,80,75,90,88,100,110],
                      },
                    ],
                  }}
                  options={{ maintainAspectRatio: false, plugins: { legend: { position: 'top' } } }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-header"><h3 className="card-title">Categories</h3></div>
            <div className="card-body d-flex align-items-center">
              <Doughnut
                data={{
                  labels: ['Programs','Services','Support','Other'],
                  datasets: [{ backgroundColor: ['#3b82f6','#10b981','#f59e0b','#6366f1'], data: [40,25,20,15] }],
                }}
                options={{ plugins: { legend: { position: 'bottom' } } }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Progress + recent table */}
      <div className="row row-deck row-cards g-4 mb-4">
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-header"><h3 className="card-title">Progress</h3></div>
            <div className="card-body">
              {[
                { label: 'Programs', pct: 72, color: 'bg-primary' },
                { label: 'Services', pct: 58, color: 'bg-success' },
                { label: 'Support', pct: 85, color: 'bg-warning' },
                { label: 'Reports', pct: 40, color: 'bg-danger' },
              ].map((p) => (
                <div key={p.label} className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <small>{p.label}</small>
                    <small className="text-muted">{p.pct}%</small>
                  </div>
                  <div className="progress progress-sm">
                    <div className={`progress-bar ${p.color}`} style={{ width: `${p.pct}%` }} role="progressbar" aria-valuenow={p.pct} aria-valuemin={0} aria-valuemax={100} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card h-100">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h3 className="card-title">Recent Records</h3>
              <IconDownload size={18} />
            </div>
            <div className="table-responsive">
              <table className="table table-vcenter card-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentItems.map((r) => (
                    <tr key={r.id}>
                      <td className="font-monospace">{r.id}</td>
                      <td>{r.name}</td>
                      <td><span className={`badge ${statusBadge(r.status)}`}>{r.status}</span></td>
                      <td>{r.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
