import type { Employees, Shifts } from '@/types/app';

export const mockEmployees: Employees[] = [
  {
    record_id: 'emp-1',
    createdat: '2025-01-01T10:00:00Z',
    updatedat: null,
    fields: {
      name: 'Anna Schmidt',
      position: 'manager',
      color: '#f59e0b',
    },
  },
  {
    record_id: 'emp-2',
    createdat: '2025-01-01T10:00:00Z',
    updatedat: null,
    fields: {
      name: 'Max Müller',
      position: 'employee',
      color: '#3b82f6',
    },
  },
  {
    record_id: 'emp-3',
    createdat: '2025-01-01T10:00:00Z',
    updatedat: null,
    fields: {
      name: 'Lisa Weber',
      position: 'employee',
      color: '#10b981',
    },
  },
  {
    record_id: 'emp-4',
    createdat: '2025-01-01T10:00:00Z',
    updatedat: null,
    fields: {
      name: 'Tom Fischer',
      position: 'trainee',
      color: '#8b5cf6',
    },
  },
  {
    record_id: 'emp-5',
    createdat: '2025-01-01T10:00:00Z',
    updatedat: null,
    fields: {
      name: 'Sarah Braun',
      position: 'parttime',
      color: '#ec4899',
    },
  },
];

// Generate shifts for the current week
const getWeekDates = (): string[] => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

  const dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

const weekDates = getWeekDates();

export const mockShifts: Shifts[] = [
  // Monday
  {
    record_id: 'shift-1',
    createdat: '2025-01-27T08:00:00Z',
    updatedat: null,
    fields: {
      employee: 'emp-1',
      date: weekDates[0],
      start_time: '06:00',
      end_time: '14:00',
      shift_type: 'morning',
      notes: undefined,
    },
  },
  {
    record_id: 'shift-2',
    createdat: '2025-01-27T08:00:00Z',
    updatedat: null,
    fields: {
      employee: 'emp-2',
      date: weekDates[0],
      start_time: '14:00',
      end_time: '22:00',
      shift_type: 'afternoon',
      notes: undefined,
    },
  },
  {
    record_id: 'shift-3',
    createdat: '2025-01-27T08:00:00Z',
    updatedat: null,
    fields: {
      employee: 'emp-3',
      date: weekDates[0],
      start_time: '06:00',
      end_time: '14:00',
      shift_type: 'morning',
      notes: undefined,
    },
  },
  // Tuesday
  {
    record_id: 'shift-4',
    createdat: '2025-01-27T08:00:00Z',
    updatedat: null,
    fields: {
      employee: 'emp-1',
      date: weekDates[1],
      start_time: '06:00',
      end_time: '14:00',
      shift_type: 'morning',
      notes: undefined,
    },
  },
  {
    record_id: 'shift-5',
    createdat: '2025-01-27T08:00:00Z',
    updatedat: null,
    fields: {
      employee: 'emp-4',
      date: weekDates[1],
      start_time: '06:00',
      end_time: '14:00',
      shift_type: 'morning',
      notes: 'Einarbeitung',
    },
  },
  {
    record_id: 'shift-6',
    createdat: '2025-01-27T08:00:00Z',
    updatedat: null,
    fields: {
      employee: 'emp-2',
      date: weekDates[1],
      start_time: '14:00',
      end_time: '22:00',
      shift_type: 'afternoon',
      notes: undefined,
    },
  },
  // Wednesday
  {
    record_id: 'shift-7',
    createdat: '2025-01-27T08:00:00Z',
    updatedat: null,
    fields: {
      employee: 'emp-3',
      date: weekDates[2],
      start_time: '06:00',
      end_time: '14:00',
      shift_type: 'morning',
      notes: undefined,
    },
  },
  {
    record_id: 'shift-8',
    createdat: '2025-01-27T08:00:00Z',
    updatedat: null,
    fields: {
      employee: 'emp-5',
      date: weekDates[2],
      start_time: '10:00',
      end_time: '16:00',
      shift_type: 'morning',
      notes: 'Teilzeit',
    },
  },
  {
    record_id: 'shift-9',
    createdat: '2025-01-27T08:00:00Z',
    updatedat: null,
    fields: {
      employee: 'emp-1',
      date: weekDates[2],
      start_time: '14:00',
      end_time: '22:00',
      shift_type: 'afternoon',
      notes: undefined,
    },
  },
  // Thursday
  {
    record_id: 'shift-10',
    createdat: '2025-01-27T08:00:00Z',
    updatedat: null,
    fields: {
      employee: 'emp-2',
      date: weekDates[3],
      start_time: '06:00',
      end_time: '14:00',
      shift_type: 'morning',
      notes: undefined,
    },
  },
  {
    record_id: 'shift-11',
    createdat: '2025-01-27T08:00:00Z',
    updatedat: null,
    fields: {
      employee: 'emp-3',
      date: weekDates[3],
      start_time: '22:00',
      end_time: '06:00',
      shift_type: 'night',
      notes: undefined,
    },
  },
  {
    record_id: 'shift-12',
    createdat: '2025-01-27T08:00:00Z',
    updatedat: null,
    fields: {
      employee: 'emp-4',
      date: weekDates[3],
      start_time: '14:00',
      end_time: '22:00',
      shift_type: 'afternoon',
      notes: undefined,
    },
  },
  // Friday
  {
    record_id: 'shift-13',
    createdat: '2025-01-27T08:00:00Z',
    updatedat: null,
    fields: {
      employee: 'emp-1',
      date: weekDates[4],
      start_time: '06:00',
      end_time: '14:00',
      shift_type: 'morning',
      notes: undefined,
    },
  },
  {
    record_id: 'shift-14',
    createdat: '2025-01-27T08:00:00Z',
    updatedat: null,
    fields: {
      employee: 'emp-5',
      date: weekDates[4],
      start_time: '10:00',
      end_time: '16:00',
      shift_type: 'morning',
      notes: 'Teilzeit',
    },
  },
  {
    record_id: 'shift-15',
    createdat: '2025-01-27T08:00:00Z',
    updatedat: null,
    fields: {
      employee: 'emp-2',
      date: weekDates[4],
      start_time: '14:00',
      end_time: '22:00',
      shift_type: 'afternoon',
      notes: undefined,
    },
  },
  // Saturday
  {
    record_id: 'shift-16',
    createdat: '2025-01-27T08:00:00Z',
    updatedat: null,
    fields: {
      employee: 'emp-3',
      date: weekDates[5],
      start_time: '08:00',
      end_time: '16:00',
      shift_type: 'morning',
      notes: 'Wochenende',
    },
  },
  {
    record_id: 'shift-17',
    createdat: '2025-01-27T08:00:00Z',
    updatedat: null,
    fields: {
      employee: 'emp-4',
      date: weekDates[5],
      start_time: '16:00',
      end_time: '22:00',
      shift_type: 'afternoon',
      notes: undefined,
    },
  },
  // Sunday
  {
    record_id: 'shift-18',
    createdat: '2025-01-27T08:00:00Z',
    updatedat: null,
    fields: {
      employee: 'emp-2',
      date: weekDates[6],
      start_time: '08:00',
      end_time: '16:00',
      shift_type: 'morning',
      notes: undefined,
    },
  },
];
