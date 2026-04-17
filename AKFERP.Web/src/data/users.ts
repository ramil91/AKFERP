export type UserRole = 'Admin' | 'Manager' | 'User' | 'Viewer';
export type UserStatus = 'Active' | 'Inactive' | 'Suspended';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  department: string;
  createdAt: string;
  lastLogin: string;
};

const ROLES: UserRole[] = ['Admin', 'Manager', 'User', 'Viewer'];
const STATUSES: UserStatus[] = ['Active', 'Inactive', 'Suspended'];
const DEPARTMENTS = ['Administration', 'Programs', 'Finance', 'HR', 'IT', 'Operations', 'Field Office'];

let _nextId = 21;

const seed: User[] = Array.from({ length: 20 }, (_, i) => {
  const n = i + 1;
  return {
    id: `USR-${String(n).padStart(4, '0')}`,
    firstName: ['Saad', 'Hina', 'Imran', 'Bushra', 'Rizwan', 'Nadia', 'Kashif', 'Sadia', 'Adeel', 'Mehreen',
      'Zubair', 'Farah', 'Naveed', 'Lubna', 'Hamza', 'Rabia', 'Danish', 'Samina', 'Shoaib', 'Uzma'][i],
    lastName: ['Malik', 'Raza', 'Butt', 'Iqbal', 'Qadri', 'Niazi', 'Lodhi', 'Paracha', 'Gul', 'Afridi',
      'Durrani', 'Swati', 'Khattak', 'Yousafzai', 'Mohmand', 'Orakzai', 'Bangash', 'Turi', 'Wazir', 'Masud'][i],
    email: `user${n}@akferp.local`,
    phone: `+92 3${String(200 + n).slice(0, 2)} ${2000000 + n * 1111}`,
    role: ROLES[n % ROLES.length],
    status: n % 8 === 0 ? 'Inactive' : n % 13 === 0 ? 'Suspended' : 'Active',
    department: DEPARTMENTS[n % DEPARTMENTS.length],
    createdAt: `202${4 + (n % 3)}-${String((n % 12) + 1).padStart(2, '0')}-${String((n % 28) + 1).padStart(2, '0')}`,
    lastLogin: n % 3 === 0 ? '' : `2026-04-${String((n % 10) + 1).padStart(2, '0')}`,
  };
});

let _store = [...seed];

export const userStore = {
  getAll: () => [..._store],
  getById: (id: string) => _store.find((u) => u.id === id) ?? null,
  add: (data: Omit<User, 'id'>): User => {
    const user: User = { ...data, id: `USR-${String(_nextId++).padStart(4, '0')}` };
    _store = [user, ..._store];
    return user;
  },
  update: (id: string, data: Partial<Omit<User, 'id'>>): User | null => {
    const idx = _store.findIndex((u) => u.id === id);
    if (idx < 0) return null;
    _store[idx] = { ..._store[idx], ...data };
    return _store[idx];
  },
  remove: (id: string): boolean => {
    const len = _store.length;
    _store = _store.filter((u) => u.id !== id);
    return _store.length < len;
  },
};
