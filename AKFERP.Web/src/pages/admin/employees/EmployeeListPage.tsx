import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  IconPlus, IconSearch, IconFilter, IconDotsVertical,
  IconPencil, IconTrash, IconDownload,
} from '@tabler/icons-react';
import { employeeStore, type Employee } from '@/data/employees';

const PAGE_SIZES = [5, 10, 25, 50] as const;

const statusBadge = (s: Employee['status']) =>
  s === 'Active' ? 'bg-success' : s === 'On Leave' ? 'bg-warning' : 'bg-danger';

export function EmployeeListPage() {
  const [data, setData] = useState(() => employeeStore.getAll());
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);
  const [openActions, setOpenActions] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let rows = data;
    if (search) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.firstName.toLowerCase().includes(q) ||
          r.lastName.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.id.toLowerCase().includes(q) ||
          r.department.toLowerCase().includes(q),
      );
    }
    if (deptFilter) rows = rows.filter((r) => r.department === deptFilter);
    if (statusFilter) rows = rows.filter((r) => r.status === statusFilter);
    return rows;
  }, [data, search, deptFilter, statusFilter]);

  const departments = useMemo(() => [...new Set(data.map((r) => r.department))].sort(), [data]);
  const total = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, pageCount);
  const from = total === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const to = Math.min(safePage * pageSize, total);

  const rows = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [safePage, pageSize, filtered]);

  const go = useCallback((p: number) => setPage(Math.min(Math.max(1, p), pageCount)), [pageCount]);

  const confirmDelete = useCallback(() => {
    if (!deleteTarget) return;
    employeeStore.remove(deleteTarget.id);
    setData(employeeStore.getAll());
    setDeleteTarget(null);
  }, [deleteTarget]);

  const pageNumbers = useMemo(() => {
    const start = Math.max(1, Math.min(safePage - 2, pageCount - 4));
    return Array.from({ length: Math.min(pageCount, 5) }, (_, i) => start + i).filter((n) => n <= pageCount);
  }, [safePage, pageCount]);

  return (
    <>
      <div className="card">
        <div className="card-header d-flex flex-wrap align-items-center justify-content-between gap-2">
          <div>
            <h3 className="card-title">Employees</h3>
            <small className="text-muted ms-2">({total} total)</small>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary btn-sm" title="Export CSV">
              <IconDownload size={16} />
            </button>
            <Link to="/admin/employees/new" className="btn btn-primary btn-sm">
              <IconPlus size={16} className="me-1" />
              Add Employee
            </Link>
          </div>
        </div>

        {/* Filters toolbar */}
        <div className="card-body border-bottom py-3">
          <div className="row g-2 align-items-end">
            <div className="col-sm-4 col-lg-3">
              <div className="input-group input-group-sm">
                <span className="input-group-text"><IconSearch size={16} /></span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search name, email, ID\u2026"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                />
              </div>
            </div>
            <div className="col-sm-3 col-lg-2">
              <div className="input-group input-group-sm">
                <span className="input-group-text"><IconFilter size={16} /></span>
                <select
                  className="form-select"
                  value={deptFilter}
                  onChange={(e) => { setDeptFilter(e.target.value); setPage(1); }}
                >
                  <option value="">All Depts</option>
                  {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div className="col-sm-2 col-lg-2">
              <select
                className="form-select form-select-sm"
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              >
                <option value="">All Status</option>
                <option>Active</option>
                <option>On Leave</option>
                <option>Resigned</option>
              </select>
            </div>
            <div className="col-sm-auto">
              <div className="d-flex align-items-center gap-2">
                <small className="text-muted text-nowrap">Rows</small>
                <select
                  className="form-select form-select-sm"
                  style={{ width: 68 }}
                  value={pageSize}
                  onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
                >
                  {PAGE_SIZES.map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>
            <div className="col text-end">
              <small className="text-muted">{from}\u2013{to} of {total}</small>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-vcenter card-table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th className="d-none d-md-table-cell">Email</th>
                <th className="d-none d-lg-table-cell">Department</th>
                <th className="d-none d-lg-table-cell">Designation</th>
                <th>Status</th>
                <th className="d-none d-xl-table-cell">Joining</th>
                <th className="text-center" style={{ width: 80 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center text-muted py-4">No employees found.</td>
                </tr>
              )}
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="font-monospace">{r.id}</td>
                  <td className="fw-semibold">{r.firstName} {r.lastName}</td>
                  <td className="d-none d-md-table-cell">{r.email}</td>
                  <td className="d-none d-lg-table-cell">{r.department}</td>
                  <td className="d-none d-lg-table-cell">{r.designation}</td>
                  <td><span className={`badge ${statusBadge(r.status)}`}>{r.status}</span></td>
                  <td className="d-none d-xl-table-cell">{r.joiningDate}</td>
                  <td className="text-center">
                    <div className={`dropdown${openActions === r.id ? ' show' : ''}`}>
                      <button
                        className="btn btn-ghost-secondary btn-sm btn-icon"
                        onClick={() => setOpenActions(openActions === r.id ? null : r.id)}
                      >
                        <IconDotsVertical size={16} />
                      </button>
                      <div className={`dropdown-menu dropdown-menu-end${openActions === r.id ? ' show' : ''}`}>
                        <Link to={`/admin/employees/${r.id}/edit`} className="dropdown-item" onClick={() => setOpenActions(null)}>
                          <IconPencil size={16} className="me-2" />Edit
                        </Link>
                        <button
                          className="dropdown-item text-danger"
                          onClick={() => { setDeleteTarget(r); setOpenActions(null); }}
                        >
                          <IconTrash size={16} className="me-2" />Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="card-footer d-flex align-items-center justify-content-end">
          <ul className="pagination pagination-sm m-0">
            <li className={`page-item${safePage <= 1 ? ' disabled' : ''}`}>
              <button className="page-link" onClick={() => go(1)}>First</button>
            </li>
            <li className={`page-item${safePage <= 1 ? ' disabled' : ''}`}>
              <button className="page-link" onClick={() => go(safePage - 1)}>&lsaquo;</button>
            </li>
            {pageNumbers.map((p) => (
              <li key={p} className={`page-item${p === safePage ? ' active' : ''}`}>
                <button className="page-link" onClick={() => go(p)}>{p}</button>
              </li>
            ))}
            <li className={`page-item${safePage >= pageCount ? ' disabled' : ''}`}>
              <button className="page-link" onClick={() => go(safePage + 1)}>&rsaquo;</button>
            </li>
            <li className={`page-item${safePage >= pageCount ? ' disabled' : ''}`}>
              <button className="page-link" onClick={() => go(pageCount)}>Last</button>
            </li>
          </ul>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div className="modal modal-blur show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0,0,0,.5)' }}>
          <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={() => setDeleteTarget(null)} aria-label="Close" />
              </div>
              <div className="modal-body">
                Are you sure you want to delete <strong>{deleteTarget.firstName} {deleteTarget.lastName}</strong> ({deleteTarget.id})?
                This action cannot be undone.
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-secondary" onClick={() => setDeleteTarget(null)}>Cancel</button>
                <button className="btn btn-danger" onClick={confirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
