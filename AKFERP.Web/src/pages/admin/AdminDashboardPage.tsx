import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CWidgetStatsA,
  CProgress,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CBadge,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilCloudDownload } from '@coreui/icons';
import { CChartLine, CChartBar, CChartDoughnut } from '@coreui/react-chartjs';

const recentItems = [
  { id: 'R-0001', name: 'Community Program A', status: 'Active', date: '2026-04-01' },
  { id: 'R-0002', name: 'Relief Supply Chain', status: 'Active', date: '2026-04-02' },
  { id: 'R-0003', name: 'Orphan Support Plan', status: 'Pending', date: '2026-04-03' },
  { id: 'R-0004', name: 'Medical Camp Q2', status: 'Completed', date: '2026-04-04' },
  { id: 'R-0005', name: 'Education Fund 2026', status: 'Active', date: '2026-04-05' },
];

const statusColor = (s: string) =>
  s === 'Active' ? 'success' : s === 'Pending' ? 'warning' : 'secondary';

export function AdminDashboardPage() {
  return (
    <>
      {/* ——— Stat widgets ——— */}
      <CRow className="g-4 mb-4">
        <CCol sm={6} xl={3}>
          <CWidgetStatsA
            color="primary"
            value="128"
            title="Active Programs"
            chart={
              <CChartLine
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                  datasets: [
                    {
                      label: 'Programs',
                      backgroundColor: 'transparent',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointBackgroundColor: '#fff',
                      data: [65, 59, 84, 84, 51, 55, 128],
                    },
                  ],
                }}
                options={{ plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } } }}
              />
            }
          />
        </CCol>
        <CCol sm={6} xl={3}>
          <CWidgetStatsA
            color="info"
            value="14"
            title="Pending Reviews"
            chart={
              <CChartBar
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                  datasets: [
                    {
                      label: 'Reviews',
                      backgroundColor: 'rgba(255,255,255,.2)',
                      borderColor: 'rgba(255,255,255,.55)',
                      data: [4, 7, 6, 3, 9, 5, 14],
                      barPercentage: 0.6,
                    },
                  ],
                }}
                options={{ plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } } }}
              />
            }
          />
        </CCol>
        <CCol sm={6} xl={3}>
          <CWidgetStatsA
            color="warning"
            value="1,024"
            title="Completed"
            chart={
              <CChartLine
                className="mt-3"
                style={{ height: '70px' }}
                data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                  datasets: [
                    {
                      label: 'Completed',
                      backgroundColor: 'rgba(255,255,255,.2)',
                      borderColor: 'rgba(255,255,255,.55)',
                      fill: true,
                      data: [90, 120, 180, 220, 250, 310, 1024],
                    },
                  ],
                }}
                options={{ plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } } }}
              />
            }
          />
        </CCol>
        <CCol sm={6} xl={3}>
          <CWidgetStatsA
            color="danger"
            value="8"
            title="Scheduled Reports"
            chart={
              <CChartBar
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                  datasets: [
                    {
                      label: 'Reports',
                      backgroundColor: 'rgba(255,255,255,.2)',
                      borderColor: 'rgba(255,255,255,.55)',
                      data: [1, 2, 1, 3, 2, 3, 8],
                      barPercentage: 0.6,
                    },
                  ],
                }}
                options={{ plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } } }}
              />
            }
          />
        </CCol>
      </CRow>

      {/* ——— Charts row ——— */}
      <CRow className="g-4 mb-4">
        <CCol md={8}>
          <CCard className="h-100">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <strong>Monthly Activity</strong>
              <CBadge color="info">2026</CBadge>
            </CCardHeader>
            <CCardBody>
              <CChartLine
                style={{ height: '260px' }}
                data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                  datasets: [
                    {
                      label: 'New records',
                      backgroundColor: 'rgba(75, 192, 192, 0.2)',
                      borderColor: 'rgb(75, 192, 192)',
                      fill: true,
                      data: [40, 60, 55, 70, 80, 65, 90, 85, 95, 100, 110, 120],
                    },
                    {
                      label: 'Completed',
                      backgroundColor: 'rgba(54, 162, 235, 0.2)',
                      borderColor: 'rgb(54, 162, 235)',
                      fill: true,
                      data: [30, 45, 50, 60, 70, 55, 80, 75, 90, 88, 100, 110],
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: { legend: { position: 'top' } },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={4}>
          <CCard className="h-100">
            <CCardHeader><strong>Categories</strong></CCardHeader>
            <CCardBody className="d-flex align-items-center">
              <CChartDoughnut
                data={{
                  labels: ['Programs', 'Services', 'Support', 'Other'],
                  datasets: [
                    {
                      backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#6366f1'],
                      data: [40, 25, 20, 15],
                    },
                  ],
                }}
                options={{ plugins: { legend: { position: 'bottom' } } }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* ——— Progress + recent table ——— */}
      <CRow className="g-4 mb-4">
        <CCol md={4}>
          <CCard className="h-100">
            <CCardHeader><strong>Progress</strong></CCardHeader>
            <CCardBody>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <small>Programs</small>
                  <small className="text-body-secondary">72%</small>
                </div>
                <CProgress thin color="primary" value={72} />
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <small>Services</small>
                  <small className="text-body-secondary">58%</small>
                </div>
                <CProgress thin color="success" value={58} />
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <small>Support</small>
                  <small className="text-body-secondary">85%</small>
                </div>
                <CProgress thin color="warning" value={85} />
              </div>
              <div>
                <div className="d-flex justify-content-between mb-1">
                  <small>Reports</small>
                  <small className="text-body-secondary">40%</small>
                </div>
                <CProgress thin color="danger" value={40} />
              </div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={8}>
          <CCard className="h-100">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <strong>Recent Records</strong>
              <CIcon icon={cilCloudDownload} />
            </CCardHeader>
            <CCardBody className="p-0">
              <CTable align="middle" hover responsive className="mb-0">
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Date</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {recentItems.map((r) => (
                    <CTableRow key={r.id}>
                      <CTableDataCell className="font-monospace">{r.id}</CTableDataCell>
                      <CTableDataCell>{r.name}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={statusColor(r.status)}>{r.status}</CBadge>
                      </CTableDataCell>
                      <CTableDataCell>{r.date}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}
