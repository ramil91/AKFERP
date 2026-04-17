export type Party = {
  id: string;
  partyNumber: number;
  partyType: string;
  displayName: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  isActive: boolean;
};

export const PARTY_TYPE_OPTIONS = ['Person', 'Organization'] as const;
export const PARTY_CITY_OPTIONS = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala', 'Hyderabad', 'Abbottabad', 'Muzaffarabad', 'Gilgit'] as const;

let _nextNumber = 1021;

const personNames = [
  'Muhammad Aslam', 'Fatima Bibi', 'Abdul Rehman', 'Khadija Noor', 'Irfan Ahmed',
  'Sadia Parveen', 'Tariq Mehmood', 'Nazia Akhtar', 'Zahid Hussain', 'Amina Shah',
];
const orgNames = [
  'Nadeem Foundation', 'Green Crescent Trust', 'Punjab Welfare Society', 'Sindh Relief Fund',
  'KPK Development Trust', 'Islamabad Aid Network', 'Balochistan Support Group', 'Pakistan Red Crescent',
  'Human Appeal International', 'Islamic Relief Pakistan',
];

const seed: Party[] = Array.from({ length: 20 }, (_, i) => {
  const n = i + 1;
  const isPerson = i < 10;
  const cities = PARTY_CITY_OPTIONS;

  return {
    id: crypto.randomUUID(),
    partyNumber: 1000 + n,
    partyType: isPerson ? 'Person' : 'Organization',
    displayName: isPerson ? personNames[i] : orgNames[i - 10],
    phone: `+92 3${String(10 + n).slice(0, 2)} ${3000000 + n * 1111}`,
    email: isPerson
      ? `${personNames[i].toLowerCase().replace(/\s/g, '.')}@email.com`
      : `info@${orgNames[i - 10].toLowerCase().replace(/\s/g, '')}.org`,
    country: 'Pakistan',
    city: cities[n % cities.length] as string,
    isActive: n % 7 !== 0,
  };
});

let _store = [...seed];

export const partyStore = {
  getAll: () => [..._store],
  getById: (id: string) => _store.find((p) => p.id === id) ?? null,
  add: (data: Omit<Party, 'id' | 'partyNumber'>): Party => {
    const party: Party = {
      ...data,
      id: crypto.randomUUID(),
      partyNumber: _nextNumber++,
    };
    _store = [party, ..._store];
    return party;
  },
  update: (id: string, data: Partial<Omit<Party, 'id' | 'partyNumber'>>): Party | null => {
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
