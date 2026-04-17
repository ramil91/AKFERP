import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  IconPlus, IconSearch, IconDotsVertical,
  IconPencil, IconTrash, IconDownload,
} from '@tabler/icons-react';
import { userStore, type User } from '@/data/users';

const PAGE_SIZES = [10, 20, 50, 100] as const;

const statusClass = (s: User['status']) =>
  s === 'Active' ? 'status-green' : s === 'Inactive' ? 'status-yellow' : 'status-red';

const roleColor = (r: User['role']) => {
  const colors: Record<string, string> = {
    Admin: 'bg-red-lt', Manager: 'bg-blue-lt', User: 'bg-green-lt', Viewer: 'bg-cyan-lt',
  };
  return colors[r] ?? 'bg-secondary-lt';
};

export function UserListPage() {
  const [data, setData] = useState(() => userStore.getAll());
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
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
          r.id.toLowerCase().includes(q),
      );
    }
    if (roleFilter) rows = rows.filter((r) => r.role === roleFilter);
    if (statusFilter) rows = rows.filter((r) => r.status === statusFilter);
    return rows;
  }, [data, search, roleFilter, statusFilter]);

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
    userStore.remove(deleteTarget.id);
    setData(userStore.getAll());
    setDeleteTarget(null);
  }, [deleteTarget]);

  const pageNumbers = useMemo(() => {
    const start = Math.max(1, Math.min(safePage - 2, pageCount - 4));
    return Array.from({ length: Math.min(pageCount, 5) }, (_, i) => start + i).filter((n) => n <= pageCount);
  }, [safePage, pageCount]);

  return (
    <>
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col">
              <div className="page-pretitle">Management</div>
              <h2 className="page-title">Users</h2>
            </div>
            <div className="col-auto ms-auto d-print-none">
              <div className="d-flex gap-2">
                <button className="btn btn-outline-secondary d-none d-sm-inline-block" title="Export CSV">
                  <IconDownload size={16} className="me-1" />
                  Export
                </button>
                <Link to="/admin/users/new" className="btn btn-primary">
                  <IconPlus size={16} className="me-1" />
                  Add User
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="container-xl">
          <div className="card">
            {/* Filters */}
            <div className="card-body border-bottom py-3">
              <div className="d-flex flex-wrap gap-2 align-items-center">
                <div className="input-group input-group-sm" style={{ maxWidth: 300 }}>
                  <span className="input-group-text"><IconSearch size={16} /></span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search name, email, ID…"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  />
                </div>
                <select
                  className="form-select form-select-sm"
                  style={{ width: 120 }}
                  value={roleFilter}
                  onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
                >
                  <option value="">All Roles</option>
                  <option>Admin</option>
                  <option>Manager</option>
                  <option>User</option>
                  <option>Viewer</option>
                </select>
                <select
                  className="form-select form-select-sm"
                  style={{ width: 130 }}
                  value={statusFilter}
                  onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                >
                  <option value="">All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Suspended</option>
                </select>
                <div className="ms-auto text-muted small">
                  {from}–{to} of {total} users
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="table-responsive">
              <table className="table table-vcenter card-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th className="d-none d-md-table-cell">Department</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th className="d-none d-xl-table-cell">Last Login</th>
                    <th className="w-1"></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length === 0 && (
                    <tr>
                      <td colSpan={6}>
                        <div className="empty">
                          <p className="empty-title">No users found</p>
                          <p className="empty-subtitle text-muted">Try adjusting your search or filters.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                  {rows.map((r) => (
                    <tr key={r.id}>
                      <td>
                        <div className="d-flex align-items-center py-1">
                          <span className="avatar avatar-sm bg-primary-lt me-2">
                            {r.firstName[0]}{r.lastName[0]}
                          </span>
                          <div className="flex-fill">
                            <div className="font-weight-medium">{r.firstName} {r.lastName}</div>
                            <div className="text-muted small">{r.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="d-none d-md-table-cell text-muted">{r.department}</td>
                      <td>
                        <span className={`badge ${roleColor(r.role)}`}>{r.role}</span>
                      </td>
                      <td>
                        <span className={`status ${statusClass(r.status)}`}>
                          <span className="status-dot"></span>
                          {r.status}
                        </span>
                      </td>
                      <td className="d-none d-xl-table-cell text-muted">
                        {r.lastLogin || <span className="text-muted">Never</span>}
                      </td>
                      <td>
                        <div className={`dropdown${openActions === r.id ? ' show' : ''}`}>
                          <button
                            className="btn btn-ghost-secondary btn-sm btn-icon"
                            onClick={() => setOpenActions(openActions === r.id ? null : r.id)}
                          >
                            <IconDotsVertical size={16} />
                          </button>
                          <div className={`dropdown-menu dropdown-menu-end${openActions === r.id ? ' show' : ''}`}>
                            <Link to={`/admin/users/${r.id}/edit`} className="dropdown-item" onClick={() => setOpenActions(null)}>
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
            <div className="card-footer d-flex align-items-center">
              <div className="d-flex align-items-center gap-2">
                <select
                  className="form-select form-select-sm"
                  style={{ width: 80 }}
                  value={pageSize}
                  onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
                >
                  {PAGE_SIZES.map((n) => <option key={n} value={n}>{n} rows</option>)}
                </select>
              </div>
              <ul className="pagination pagination-sm m-0 ms-auto">
                <li className={`page-item${safePage <= 1 ? ' disabled' : ''}`}>
                  <button className="page-link" onClick={() => go(1)} tabIndex={-1}>First</button>
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
        </div>
      </div>

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div className="modal modal-blur show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0,0,0,.5)' }}>
          <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
            <div className="modal-content">
              <button type="button" className="btn-close" onClick={() => setDeleteTarget(null)} aria-label="Close" />
              <div className="modal-status bg-danger"></div>
              <div className="modal-body text-center py-4">
                <IconTrash size={40} className="text-danger mb-2" />
                <h3>Are you sure?</h3>
                <div className="text-muted">
                  Do you really want to delete <strong>{deleteTarget.firstName} {deleteTarget.lastName}</strong> ({deleteTarget.id})?
                  This action cannot be undone.
                </div>
              </div>
              <div className="modal-footer">
                <div className="w-100">
                  <div className="row">
                    <div className="col">
                      <button className="btn w-100" onClick={() => setDeleteTarget(null)}>Cancel</button>
                    </div>
                    <div className="col">
                      <button className="btn btn-danger w-100" onClick={confirmDelete}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
