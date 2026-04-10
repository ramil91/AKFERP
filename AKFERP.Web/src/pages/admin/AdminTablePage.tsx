import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconPlus, IconSearch } from '@tabler/icons-react';

type Row = { id: string; name: string; category: string; status: string; updated: string };

const MOCK_ROWS: Row[] = Array.from({ length: 47 }, (_, i) => {
  const n = i + 1;
  return {
    id: `R-${String(n).padStart(4, '0')}`,
    name: `Sample item ${n}`,
    category: ['Programs', 'Services', 'Support'][n % 3],
    status: n % 5 === 0 ? 'Archived' : 'Active',
    updated: `2026-04-${String((n % 28) + 1).padStart(2, '0')}`,
  };
});

const PAGE_SIZES = [5, 10, 25] as const;

export function AdminTablePage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () =>
      search
        ? MOCK_ROWS.filter(
            (r) =>
              r.name.toLowerCase().includes(search.toLowerCase()) ||
              r.id.toLowerCase().includes(search.toLowerCase()),
          )
        : MOCK_ROWS,
    [search],
  );

  const total = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, pageCount);

  const rows = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [safePage, pageSize, filtered]);

  const from = total === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const to = Math.min(safePage * pageSize, total);

  function go(p: number) {
    setPage(Math.min(Math.max(1, p), pageCount));
  }

  const pageNumbers = useMemo(() => {
    const start = Math.max(1, Math.min(safePage - 2, pageCount - 4));
    return Array.from({ length: Math.min(pageCount, 5) }, (_, i) => start + i).filter((n) => n <= pageCount);
  }, [safePage, pageCount]);

  return (
    <div className="card">
      <div className="card-header d-flex flex-wrap align-items-center justify-content-between gap-2">
        <h3 className="card-title">Records</h3>
        <Link to="/admin/records/new" className="btn btn-primary btn-sm">
          <IconPlus size={16} className="me-1" />
          Add Record
        </Link>
      </div>
      <div className="card-body border-bottom py-3">
        <div className="d-flex flex-wrap gap-2 align-items-center">
          <div className="input-group input-group-sm" style={{ maxWidth: 240 }}>
            <span className="input-group-text"><IconSearch size={16} /></span>
            <input
              type="text"
              className="form-control"
              placeholder="Search\u2026"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <div className="d-flex align-items-center gap-2 ms-auto">
            <small className="text-muted text-nowrap">Rows per page</small>
            <select
              className="form-select form-select-sm"
              style={{ width: 70 }}
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
            >
              {PAGE_SIZES.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
            <small className="text-muted">Showing {from}\u2013{to} of {total}</small>
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-vcenter card-table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="font-monospace">{r.id}</td>
                <td>{r.name}</td>
                <td>{r.category}</td>
                <td><span className={`badge ${r.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>{r.status}</span></td>
                <td>{r.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
  );
}
