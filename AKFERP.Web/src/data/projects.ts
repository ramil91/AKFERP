export type Project = {
  id: string;
  projectCode: string;
  projectName: string;
  projectType: string;
  startDate: string;
  endDate: string;
  status: string;
  locationAddress: string;
  city: string;
  province: string;
  country: string;
  budgetAllocated: number;
  donorName: string;
  projectManagerId: string;
  parentProjectId: string;
  description: string;
};

export const PROJECT_TYPE_OPTIONS = ['Healthcare', 'Education', 'Water & Sanitation', 'Disaster Relief', 'Orphan Care', 'Community Development', 'Infrastructure', 'Livelihood', 'Food Security'] as const;
export const PROJECT_STATUS_OPTIONS = ['Planning', 'Active', 'On Hold', 'Completed', 'Cancelled'] as const;
export const PROVINCE_OPTIONS = ['Punjab', 'Sindh', 'KPK', 'Balochistan', 'Gilgit-Baltistan', 'AJK', 'Islamabad'] as const;
export const CITY_OPTIONS = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala', 'Hyderabad', 'Abbottabad', 'Muzaffarabad', 'Gilgit'] as const;

let _nextCode = 21;

const seed: Project[] = Array.from({ length: 20 }, (_, i) => {
  const n = i + 1;
  const names = [
    'Clean Water Initiative', 'Medical Camp Q1', 'Orphan Education Program', 'Flood Relief 2026',
    'Rural Health Clinics', 'School Renovation Lahore', 'Winter Relief Drive', 'Food Distribution Sindh',
    'Vocational Training Youth', 'Disaster Response Unit', 'Eye Care Camp', 'Community Kitchen',
    'Scholarship Program', 'Infrastructure Rebuild KPK', 'Mobile Health Van', 'Ration Drive Ramadan',
    'IT Skills Academy', 'Women Empowerment Hub', 'Blood Bank Project', 'Solar Power Schools',
  ];
  const types = PROJECT_TYPE_OPTIONS;
  const cities = CITY_OPTIONS;
  const provinces = PROVINCE_OPTIONS;
  const donors = ['USAID', 'UNICEF', 'WHO', 'Private Donor', 'AKF International', 'Government of Pakistan', 'Islamic Development Bank', 'Local Fundraising'];
  const statuses: string[] = ['Active', 'Active', 'Planning', 'Completed', 'Active', 'On Hold', 'Active', 'Completed', 'Active', 'Planning', 'Active', 'Active', 'Planning', 'Active', 'Completed', 'Active', 'Active', 'Planning', 'Active', 'Active'];

  return {
    id: crypto.randomUUID(),
    projectCode: `PRJ-${String(n).padStart(4, '0')}`,
    projectName: names[i],
    projectType: types[n % types.length] as string,
    startDate: `2025-${String((n % 12) + 1).padStart(2, '0')}-01`,
    endDate: `2026-${String((n % 12) + 1).padStart(2, '0')}-28`,
    status: statuses[i],
    locationAddress: `${n * 5} Main Road, Sector ${String.fromCharCode(65 + (n % 8))}`,
    city: cities[n % cities.length] as string,
    province: provinces[n % provinces.length] as string,
    country: 'Pakistan',
    budgetAllocated: 500000 + n * 250000,
    donorName: donors[n % donors.length],
    projectManagerId: '',
    parentProjectId: '',
    description: `${names[i]} — a project under Alkhidmat Foundation focused on ${(types[n % types.length] as string).toLowerCase()} services.`,
  };
});

let _store = [...seed];

export const projectStore = {
  getAll: () => [..._store],
  getById: (id: string) => _store.find((p) => p.id === id) ?? null,
  add: (data: Omit<Project, 'id' | 'projectCode'>): Project => {
    const proj: Project = {
      ...data,
      id: crypto.randomUUID(),
      projectCode: `PRJ-${String(_nextCode++).padStart(4, '0')}`,
    };
    _store = [proj, ..._store];
    return proj;
  },
  update: (id: string, data: Partial<Omit<Project, 'id' | 'projectCode'>>): Project | null => {
    const idx = _store.findIndex((p) => p.id === id);
    if (idx < 0) return null;
    _store[idx] = { ..._store[idx], ...data };
    return _store[idx];
  },
  remove: (id: string): boolean => {
    const len = _store.length;
    _store = _store.filter((p) => p.id !== id);
    return _store.length < len;
  },
};
