// AUTOMATICALLY GENERATED TYPES - DO NOT EDIT

export interface Employees {
  record_id: string;
  createdat: string;
  updatedat: string | null;
  fields: {
    name?: string;
    position?: 'trainee' | 'parttime' | 'manager' | 'employee';
    color?: string;
  };
}

export interface Shifts {
  record_id: string;
  createdat: string;
  updatedat: string | null;
  fields: {
    employee?: string; // applookup -> URL zu 'Employees' Record
    date?: string; // Format: YYYY-MM-DD oder ISO String
    start_time?: string;
    end_time?: string;
    shift_type?: 'morning' | 'afternoon' | 'night';
    notes?: string;
  };
}

export const APP_IDS = {
  EMPLOYEES: '697cbbf1df133cfaaa2f7b93',
  SHIFTS: '697cbbf22f55161fcedddd67',
} as const;

// Helper Types for creating new records
export type CreateEmployees = Employees['fields'];
export type CreateShifts = Shifts['fields'];