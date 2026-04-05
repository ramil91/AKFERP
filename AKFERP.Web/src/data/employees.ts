export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  joiningDate: string;
  salary: number;
  status: 'Active' | 'On Leave' | 'Resigned';
  address: string;
  city: string;
};

const DEPARTMENTS = ['Administration', 'Programs', 'Finance', 'HR', 'IT', 'Operations', 'Field Office'];
const DESIGNATIONS = ['Manager', 'Senior Officer', 'Officer', 'Assistant', 'Coordinator', 'Director', 'Intern'];
const CITIES = ['Karachi', 'Lahore', 'Islamabad', 'Peshawar', 'Quetta', 'Multan', 'Faisalabad'];

let _nextId = 26;

const seed: Employee[] = Array.from({ length: 25 }, (_, i) => {
  const n = i + 1;
  return {
    id: `EMP-${String(n).padStart(4, '0')}`,
    firstName: ['Ahmed', 'Fatima', 'Usman', 'Ayesha', 'Hassan', 'Zainab', 'Ali', 'Sara', 'Omar', 'Hira',
      'Bilal', 'Maryam', 'Tariq', 'Nida', 'Kamran', 'Sana', 'Faisal', 'Amna', 'Junaid', 'Rabia',
      'Waqar', 'Iqra', 'Naeem', 'Asma', 'Shahid'][i],
    lastName: ['Khan', 'Ahmed', 'Malik', 'Hussain', 'Shah', 'Qureshi', 'Raza', 'Bukhari', 'Siddiqui', 'Javed',
      'Akhtar', 'Rizvi', 'Baig', 'Chaudhry', 'Mirza', 'Aslam', 'Gill', 'Sheikh', 'Abbasi', 'Hashmi',
      'Awan', 'Farooqi', 'Dar', 'Ansari', 'Bhatti'][i],
    email: `emp${n}@akferp.local`,
    phone: `+92 3${String(100 + n).slice(0, 2)} ${1000000 + n * 1111}`,
    department: DEPARTMENTS[n % DEPARTMENTS.length],
    designation: DESIGNATIONS[n % DESIGNATIONS.length],
    joiningDate: `202${3 + (n % 4)}-${String((n % 12) + 1).padStart(2, '0')}-${String((n % 28) + 1).padStart(2, '0')}`,
    salary: 40000 + n * 5000,
    status: n % 7 === 0 ? 'On Leave' : n % 11 === 0 ? 'Resigned' : 'Active',
    address: `${n * 10} Street ${n}, Block ${String.fromCharCode(65 + (n % 8))}`,
    city: CITIES[n % CITIES.length],
  };
});

let _store = [...seed];

export const employeeStore = {
  getAll: () => [..._store],
  getById: (id: string) => _store.find((e) => e.id === id) ?? null,
  add: (data: Omit<Employee, 'id'>): Employee => {
    const emp: Employee = { ...data, id: `EMP-${String(_nextId++).padStart(4, '0')}` };
    _store = [emp, ..._store];
    return emp;
  },
  update: (id: string, data: Partial<Omit<Employee, 'id'>>): Employee | null => {
    const idx = _store.findIndex((e) => e.id === id);
    if (idx < 0) return null;
    _store[idx] = { ..._store[idx], ...data };
    return _store[idx];
  },
  remove: (id: string): boolean => {
    const len = _store.length;
    _store = _store.filter((e) => e.id !== id);
    return _store.length < len;
  },
};
