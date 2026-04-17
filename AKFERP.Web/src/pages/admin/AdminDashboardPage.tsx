import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Filler, Tooltip, Legend,
} from 'chart.js';
import {
  IconBriefcase, IconUsers, IconUserCheck, IconBuildingCommunity,
  IconHeartHandshake, IconTrendingUp, IconTrendingDown, IconDownload,
} from '@tabler/icons-react';
import { employeeStore } from '@/data/employees';
import { projectStore } from '@/data/projects';
import { partyStore } from '@/data/parties';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Filler, Tooltip, Legend);

const entityStats = [
  { title: 'Projects', value: projectStore.getAll().length, change: '+6', trending: 'up' as const, icon: IconBriefcase, color: 'bg-primary' },
  { title: 'Employees', value: employeeStore.getAll().length, change: '+3', trending: 'up' as const, icon: IconUsers, color: 'bg-success' },
  { title: 'Parties', value: partyStore.getAll().length, change: '+12', trending: 'up' as const, icon: IconUserCheck, color: 'bg-info' },
  { title: 'Organizations', value: 38, change: '-2', trending: 'down' as const, icon: IconBuildingCommunity, color: 'bg-warning' },
  { title: 'Contributions', value: 1247, change: '+89', trending: 'up' as const, icon: IconHeartHandshake, color: 'bg-danger' },
];

const recentItems = [
  { id: 'PRJ-0012', entity: 'Project', name: 'Clean Water Initiative', status: 'Active', date: '2026-04-10' },
  { id: 'EMP-0045', entity: 'Employee', name: 'Usman Ali', status: 'Active', date: '2026-04-09' },
  { id: 'PTY-0089', entity: 'Party', name: 'Nadeem Foundation', status: 'Active', date: '2026-04-08' },
  { id: 'CON-0331', entity: 'Contribution', name: 'Zakat Collection Apr', status: 'Pending', date: '2026-04-07' },
  { id: 'ORG-0015', entity: 'Organization', name: 'AKF Lahore Chapter', status: 'Active', date: '2026-04-06' },
  { id: 'PRJ-0011', entity: 'Project', name: 'Medical Camp Q2', status: 'Completed', date: '2026-04-05' },
  { id: 'CON-0330', entity: 'Contribution', name: 'Monthly Donation Drive', status: 'Active', date: '2026-04-04' },
];

const statusBadge = (s: string) =>
  s === 'Active' ? 'bg-success' : s === 'Pending' ? 'bg-warning' : 'bg-secondary';

const entityBadge = (e: string) =>
  e === 'Project' ? 'bg-primary-lt' : e === 'Employee' ? 'bg-success-lt' : e === 'Party' ? 'bg-info-lt' : e === 'Organization' ? 'bg-warning-lt' : 'bg-danger-lt';

export function AdminDashboardPage() {
  return (
    <div className="page-body">
      <div className="container-xl">
        {/* Entity stat cards */}
        <div className="row g-3 mb-4">
          {entityStats.map((stat) => (
            <div key={stat.title} className="col-6 col-lg">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-2">
                    <span className={`avatar avatar-sm ${stat.color} text-white me-3`}>
                      <stat.icon size={20} />
                    </span>
                    <div className="subheader text-muted">{stat.title}</div>
                  </div>
                  <div className="d-flex align-items-baseline">
                    <h2 className="mb-0 me-2">{stat.value.toLocaleString()}</h2>
                    <span className={`d-inline-flex align-items-center lh-1 ${stat.trending === 'up' ? 'text-success' : 'text-danger'}`}>
                      {stat.trending === 'up' ? <IconTrendingUp size={16} /> : <IconTrendingDown size={16} />}
                      <span className="ms-1 small">{stat.change}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="row g-3 mb-4">
          <div className="col-lg-8">
            <div className="card h-100">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="card-title">Monthly Activity</h3>
                <span className="badge bg-info">2026</span>
              </div>
              <div className="card-body">
                <div style={{ height: 280 }}>
                  <Bar
                    data={{
                      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                      datasets: [
                        { label: 'Projects', backgroundColor: 'rgba(59,130,246,0.7)', data: [3, 5, 4, 6, 5, 7, 8, 6, 9, 7, 8, 10] },
                        { label: 'Contributions', backgroundColor: 'rgba(239,68,68,0.7)', data: [80, 95, 110, 125, 100, 140, 130, 150, 160, 145, 170, 190] },
                      ],
                    }}
                    options={{
                      maintainAspectRatio: false,
                      plugins: { legend: { position: 'top' } },
                      scales: { y: { beginAtZero: true } },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card h-100">
              <div className="card-header"><h3 className="card-title">Entity Distribution</h3></div>
              <div className="card-body d-flex align-items-center justify-content-center">
                <Doughnut
                  data={{
                    labels: ['Projects', 'Employees', 'Parties', 'Organizations', 'Contributions'],
                    datasets: [{
                      backgroundColor: ['#3b82f6', '#10b981', '#06b6d4', '#f59e0b', '#ef4444'],
                      data: [projectStore.getAll().length, employeeStore.getAll().length, partyStore.getAll().length, 38, 1247],
                    }],
                  }}
                  options={{ plugins: { legend: { position: 'bottom' } } }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Trend line + recent table */}
        <div className="row g-3 mb-4">
          <div className="col-lg-4">
            <div className="card h-100">
              <div className="card-header"><h3 className="card-title">Contributions Trend</h3></div>
              <div className="card-body">
                <div style={{ height: 220 }}>
                  <Line
                    data={{
                      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                      datasets: [{
                        label: 'Amount (PKR)',
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239,68,68,0.1)',
                        fill: true,
                        tension: 0.4,
                        data: [450000, 520000, 610000, 780000, 690000, 850000],
                      }],
                    }}
                    options={{
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: { callback: (v) => `${Number(v) / 1000}k` },
                        },
                      },
                    }}
                  />
                </div>
                <div className="d-flex justify-content-between mt-3 border-top pt-3">
                  <div className="text-center">
                    <div className="text-muted small">This Month</div>
                    <strong>Rs. 850k</strong>
                  </div>
                  <div className="text-center">
                    <div className="text-muted small">Avg/Month</div>
                    <strong>Rs. 650k</strong>
                  </div>
                  <div className="text-center">
                    <div className="text-muted small">Total</div>
                    <strong>Rs. 3.9M</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card h-100">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="card-title">Recent Records</h3>
                <button className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-1">
                  <IconDownload size={14} /> Export
                </button>
              </div>
              <div className="table-responsive">
                <table className="table table-vcenter card-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Entity</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentItems.map((r) => (
                      <tr key={r.id}>
                        <td className="font-monospace text-muted">{r.id}</td>
                        <td><span className={`badge ${entityBadge(r.entity)}`}>{r.entity}</span></td>
                        <td>{r.name}</td>
                        <td><span className={`badge ${statusBadge(r.status)}`}>{r.status}</span></td>
                        <td className="text-muted">{r.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
