import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CCard, CCardBody, CCardHeader, CCol, CRow,
  CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CPagination, CPaginationItem,
  CFormSelect, CFormInput, CInputGroup, CInputGroupText,
  CBadge, CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
  CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
  cilPlus, cilSearch, cilPencil, cilTrash, cilCloudDownload,
  cilFilter, cilOptions,
} from '@coreui/icons';
import { employeeStore, type Employee } from '@/data/employees';

const PAGE_SIZES = [5, 10, 25, 50] as const;

const statusColor = (s: Employee['status']) =>
  s === 'Active' ? 'success' : s === 'On Leave' ? 'warning' : 'danger';

export function EmployeeListPage() {
  const [data, setData] = useState(() => employeeStore.getAll());
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);

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
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader className="d-flex flex-wrap align-items-center justify-content-between gap-2">
              <div>
                <strong>Employees</strong>
                <small className="text-body-secondary ms-2">({total} total)</small>
              </div>
              <div className="d-flex gap-2">
                <CButton color="light" size="sm" title="Export CSV">
                  <CIcon icon={cilCloudDownload} />
                </CButton>
                <CButton color="primary" size="sm" as={Link} to="/admin/employees/new">
                  <CIcon icon={cilPlus} className="me-1" />
                  Add Employee
                </CButton>
              </div>
            </CCardHeader>
            <CCardBody>
              {/* ——— Filters toolbar ——— */}
              <CRow className="mb-3 g-2 align-items-end">
                <CCol sm={4} lg={3}>
                  <CInputGroup size="sm">
                    <CInputGroupText><CIcon icon={cilSearch} /></CInputGroupText>
                    <CFormInput
                      placeholder="Search name, email, ID…"
                      value={search}
                      onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    />
                  </CInputGroup>
                </CCol>
                <CCol sm={3} lg={2}>
                  <CInputGroup size="sm">
                    <CInputGroupText><CIcon icon={cilFilter} /></CInputGroupText>
                    <CFormSelect
                      value={deptFilter}
                      onChange={(e) => { setDeptFilter(e.target.value); setPage(1); }}
                    >
                      <option value="">All Depts</option>
                      {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                    </CFormSelect>
                  </CInputGroup>
                </CCol>
                <CCol sm={2} lg={2}>
                  <CFormSelect
                    size="sm"
                    value={statusFilter}
                    onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                  >
                    <option value="">All Status</option>
                    <option>Active</option>
                    <option>On Leave</option>
                    <option>Resigned</option>
                  </CFormSelect>
                </CCol>
                <CCol sm="auto">
                  <div className="d-flex align-items-center gap-2">
                    <small className="text-body-secondary text-nowrap">Rows</small>
                    <CFormSelect
                      size="sm"
                      style={{ width: 68 }}
                      value={pageSize}
                      onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
                    >
                      {PAGE_SIZES.map((n) => <option key={n} value={n}>{n}</option>)}
                    </CFormSelect>
                  </div>
                </CCol>
                <CCol className="text-end">
                  <small className="text-body-secondary">
                    {from}–{to} of {total}
                  </small>
                </CCol>
              </CRow>

              {/* ——— Table ——— */}
              <CTable align="middle" hover responsive bordered className="mb-0">
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell className="d-none d-md-table-cell">Email</CTableHeaderCell>
                    <CTableHeaderCell className="d-none d-lg-table-cell">Department</CTableHeaderCell>
                    <CTableHeaderCell className="d-none d-lg-table-cell">Designation</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell className="d-none d-xl-table-cell">Joining</CTableHeaderCell>
                    <CTableHeaderCell className="text-center" style={{ width: 80 }}>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {rows.length === 0 && (
                    <CTableRow>
                      <CTableDataCell colSpan={8} className="text-center text-body-secondary py-4">
                        No employees found.
                      </CTableDataCell>
                    </CTableRow>
                  )}
                  {rows.map((r) => (
                    <CTableRow key={r.id}>
                      <CTableDataCell className="font-monospace">{r.id}</CTableDataCell>
                      <CTableDataCell className="fw-semibold">{r.firstName} {r.lastName}</CTableDataCell>
                      <CTableDataCell className="d-none d-md-table-cell">{r.email}</CTableDataCell>
                      <CTableDataCell className="d-none d-lg-table-cell">{r.department}</CTableDataCell>
                      <CTableDataCell className="d-none d-lg-table-cell">{r.designation}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={statusColor(r.status)}>{r.status}</CBadge>
                      </CTableDataCell>
                      <CTableDataCell className="d-none d-xl-table-cell">{r.joiningDate}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CDropdown variant="btn-group" alignment="end">
                          <CDropdownToggle color="light" size="sm" caret={false}>
                            <CIcon icon={cilOptions} />
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem as={Link} to={`/admin/employees/${r.id}/edit`}>
                              <CIcon icon={cilPencil} className="me-2" />Edit
                            </CDropdownItem>
                            <CDropdownItem className="text-danger" onClick={() => setDeleteTarget(r)}>
                              <CIcon icon={cilTrash} className="me-2" />Delete
                            </CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>

              {/* ——— Pagination ——— */}
              <div className="d-flex justify-content-end mt-3">
                <CPagination aria-label="Employee pagination" size="sm">
                  <CPaginationItem disabled={safePage <= 1} onClick={() => go(1)}>First</CPaginationItem>
                  <CPaginationItem disabled={safePage <= 1} onClick={() => go(safePage - 1)}>‹</CPaginationItem>
                  {pageNumbers.map((p) => (
                    <CPaginationItem key={p} active={p === safePage} onClick={() => go(p)}>{p}</CPaginationItem>
                  ))}
                  <CPaginationItem disabled={safePage >= pageCount} onClick={() => go(safePage + 1)}>›</CPaginationItem>
                  <CPaginationItem disabled={safePage >= pageCount} onClick={() => go(pageCount)}>Last</CPaginationItem>
                </CPagination>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* ——— Delete confirmation modal ——— */}
      <CModal visible={!!deleteTarget} onClose={() => setDeleteTarget(null)} alignment="center">
        <CModalHeader closeButton>
          <CModalTitle>Confirm Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete <strong>{deleteTarget?.firstName} {deleteTarget?.lastName}</strong> ({deleteTarget?.id})?
          This action cannot be undone.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</CButton>
          <CButton color="danger" onClick={confirmDelete}>Delete</CButton>
        </CModalFooter>
      </CModal>
    </>
  );
}
