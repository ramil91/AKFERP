export type Employee = {
  id: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  cnic: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  bloodGroup: string;
  personalEmail: string;
  phone: string;
  address: string;
  department: string;
  designation: string;
  employmentType: string;
  hireDate: string;
  confirmationDate: string;
  reportingManagerId: string;
  status: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  bankName: string;
  bankAccountNo: string;
  salaryPaymentMethod: string;
};

export const GENDER_OPTIONS = ['Male', 'Female', 'Other'] as const;
export const MARITAL_STATUS_OPTIONS = ['Single', 'Married', 'Widowed', 'Divorced'] as const;
export const BLOOD_GROUP_OPTIONS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const;
export const DEPARTMENT_OPTIONS = ['Administration', 'Programs', 'Finance', 'HR', 'IT', 'Operations', 'Field Office', 'Medical', 'Education', 'Logistics'] as const;
export const DESIGNATION_OPTIONS = ['Director', 'Manager', 'Senior Officer', 'Officer', 'Coordinator', 'Assistant', 'Intern', 'Consultant', 'Supervisor', 'Analyst'] as const;
export const EMPLOYMENT_TYPE_OPTIONS = ['Full-Time', 'Part-Time', 'Contract', 'Intern', 'Probation'] as const;
export const STATUS_OPTIONS = ['Active', 'On Leave', 'Resigned', 'Terminated', 'Retired'] as const;
export const BANK_OPTIONS = ['HBL', 'UBL', 'MCB', 'Allied Bank', 'Askari Bank', 'Bank Alfalah', 'Meezan Bank', 'Faysal Bank', 'JS Bank', 'Standard Chartered', 'Bank Al Habib', 'NBP'] as const;
export const SALARY_PAYMENT_OPTIONS = ['Bank Transfer', 'Cash', 'Cheque'] as const;

let _nextCode = 26;

const seed: Employee[] = Array.from({ length: 25 }, (_, i) => {
  const n = i + 1;
  const firstNames = ['Ahmed', 'Fatima', 'Usman', 'Ayesha', 'Hassan', 'Zainab', 'Ali', 'Sara', 'Omar', 'Hira',
    'Bilal', 'Maryam', 'Tariq', 'Nida', 'Kamran', 'Sana', 'Faisal', 'Amna', 'Junaid', 'Rabia',
    'Waqar', 'Iqra', 'Naeem', 'Asma', 'Shahid'];
  const lastNames = ['Khan', 'Ahmed', 'Malik', 'Hussain', 'Shah', 'Qureshi', 'Raza', 'Bukhari', 'Siddiqui', 'Javed',
    'Akhtar', 'Rizvi', 'Baig', 'Chaudhry', 'Mirza', 'Aslam', 'Gill', 'Sheikh', 'Abbasi', 'Hashmi',
    'Awan', 'Farooqi', 'Dar', 'Ansari', 'Bhatti'];
  const gender = n % 2 === 0 ? 'Female' : 'Male';
  return {
    id: crypto.randomUUID(),
    employeeCode: `EMP-${String(n).padStart(4, '0')}`,
    firstName: firstNames[i],
    lastName: lastNames[i],
    cnic: `35${String(100 + n)}-${String(1000000 + n * 111)}-${n % 2}`,
    dateOfBirth: `199${n % 10}-${String((n % 12) + 1).padStart(2, '0')}-${String((n % 28) + 1).padStart(2, '0')}`,
    gender,
    maritalStatus: n % 3 === 0 ? 'Married' : 'Single',
    bloodGroup: BLOOD_GROUP_OPTIONS[n % BLOOD_GROUP_OPTIONS.length],
    personalEmail: `${firstNames[i].toLowerCase()}.${lastNames[i].toLowerCase()}@email.com`,
    phone: `+92 3${String(100 + n).slice(0, 2)} ${1000000 + n * 1111}`,
    address: `${n * 10} Street ${n}, Block ${String.fromCharCode(65 + (n % 8))}`,
    department: DEPARTMENT_OPTIONS[n % DEPARTMENT_OPTIONS.length] as string,
    designation: DESIGNATION_OPTIONS[n % DESIGNATION_OPTIONS.length] as string,
    employmentType: n % 5 === 0 ? 'Contract' : n % 7 === 0 ? 'Part-Time' : 'Full-Time',
    hireDate: `202${3 + (n % 4)}-${String((n % 12) + 1).padStart(2, '0')}-${String((n % 28) + 1).padStart(2, '0')}`,
    confirmationDate: n % 3 === 0 ? `202${4 + (n % 3)}-${String((n % 12) + 1).padStart(2, '0')}-15` : '',
    reportingManagerId: '',
    status: n % 7 === 0 ? 'On Leave' : n % 11 === 0 ? 'Resigned' : 'Active',
    basicSalary: 40000 + n * 5000,
    allowances: 5000 + n * 1000,
    deductions: 2000 + n * 500,
    bankName: BANK_OPTIONS[n % BANK_OPTIONS.length] as string,
    bankAccountNo: `PK${30 + n}MEZN00${String(10000000 + n * 111111)}`,
    salaryPaymentMethod: n % 4 === 0 ? 'Cash' : 'Bank Transfer',
  };
});

let _store = [...seed];

export const employeeStore = {
  getAll: () => [..._store],
  getById: (id: string) => _store.find((e) => e.id === id) ?? null,
  add: (data: Omit<Employee, 'id' | 'employeeCode'>): Employee => {
    const emp: Employee = {
      ...data,
      id: crypto.randomUUID(),
      employeeCode: `EMP-${String(_nextCode++).padStart(4, '0')}`,
    };
    _store = [emp, ..._store];
    return emp;
  },
  update: (id: string, data: Partial<Omit<Employee, 'id' | 'employeeCode'>>): Employee | null => {
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
