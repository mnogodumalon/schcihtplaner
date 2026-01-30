export interface Employee {
  record_id: string;
  createdat: string;
  updatedat: string | null;
  fields: {
    name: string;
    position: 'manager' | 'employee' | 'trainee' | 'parttime';
    color: string | null;
  };
}

export interface Shift {
  record_id: string;
  createdat: string;
  updatedat: string | null;
  fields: {
    employee: string | null; // applookup URL or null
    date: string; // YYYY-MM-DD
    start_time: string; // HH:MM
    end_time: string; // HH:MM
    shift_type: 'morning' | 'afternoon' | 'night';
    notes: string | null;
  };
}

export type ShiftType = 'morning' | 'afternoon' | 'night';
export type PositionType = 'manager' | 'employee' | 'trainee' | 'parttime';

export const SHIFT_TYPE_LABELS: Record<ShiftType, string> = {
  morning: 'Frühschicht',
  afternoon: 'Spätschicht',
  night: 'Nachtschicht',
};

export const POSITION_LABELS: Record<PositionType, string> = {
  manager: 'Manager',
  employee: 'Mitarbeiter',
  trainee: 'Auszubildender',
  parttime: 'Teilzeit',
};

export const SHIFT_COLORS: Record<ShiftType, string> = {
  morning: 'bg-amber-100 border-amber-300 text-amber-800',
  afternoon: 'bg-blue-100 border-blue-300 text-blue-800',
  night: 'bg-indigo-100 border-indigo-300 text-indigo-800',
};
