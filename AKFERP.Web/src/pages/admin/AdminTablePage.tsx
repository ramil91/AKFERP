import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CPagination,
  CPaginationItem,
  CFormSelect,
  CBadge,
  CButton,
  CInputGroup,
  CFormInput,
  CInputGroupText,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPlus, cilSearch } from '@coreui/icons';

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

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader className="d-flex flex-wrap align-items-center justify-content-between gap-2">
            <strong>Records</strong>
            <CButton color="primary" size="sm" as={Link} to="/admin/records/new">
              <CIcon icon={cilPlus} className="me-1" />
              Add Record
            </CButton>
          </CCardHeader>
          <CCardBody>
            {/* Toolbar */}
            <CRow className="mb-3 g-2 align-items-end">
              <CCol sm={4} lg={3}>
                <CInputGroup size="sm">
                  <CInputGroupText><CIcon icon={cilSearch} /></CInputGroupText>
                  <CFormInput
                    placeholder="Search…"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  />
                </CInputGroup>
              </CCol>
              <CCol sm="auto">
                <div className="d-flex align-items-center gap-2">
                  <small className="text-body-secondary text-nowrap">Rows per page</small>
                  <CFormSelect
                    size="sm"
                    style={{ width: 70 }}
                    value={pageSize}
                    onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
                  >
                    {PAGE_SIZES.map((n) => <option key={n} value={n}>{n}</option>)}
                  </CFormSelect>
                </div>
              </CCol>
              <CCol className="text-end">
                <small className="text-body-secondary">
                  Showing {from}–{to} of {total}
                </small>
              </CCol>
            </CRow>

            {/* Table */}
            <CTable align="middle" hover responsive bordered className="mb-0">
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Updated</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {rows.map((r) => (
                  <CTableRow key={r.id}>
                    <CTableDataCell className="font-monospace">{r.id}</CTableDataCell>
                    <CTableDataCell>{r.name}</CTableDataCell>
                    <CTableDataCell>{r.category}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={r.status === 'Active' ? 'success' : 'secondary'}>
                        {r.status}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>{r.updated}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>

            {/* Pagination */}
            <div className="d-flex justify-content-end mt-3">
              <CPagination aria-label="Table pagination" size="sm">
                <CPaginationItem disabled={safePage <= 1} onClick={() => go(1)}>First</CPaginationItem>
                <CPaginationItem disabled={safePage <= 1} onClick={() => go(safePage - 1)}>‹</CPaginationItem>
                {Array.from({ length: Math.min(pageCount, 5) }, (_, i) => {
                  const start = Math.max(1, Math.min(safePage - 2, pageCount - 4));
                  const p = start + i;
                  return p <= pageCount ? (
                    <CPaginationItem key={p} active={p === safePage} onClick={() => go(p)}>
                      {p}
                    </CPaginationItem>
                  ) : null;
                })}
                <CPaginationItem disabled={safePage >= pageCount} onClick={() => go(safePage + 1)}>›</CPaginationItem>
                <CPaginationItem disabled={safePage >= pageCount} onClick={() => go(pageCount)}>Last</CPaginationItem>
              </CPagination>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}
