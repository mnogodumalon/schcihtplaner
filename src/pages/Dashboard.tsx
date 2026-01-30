import { useState, useMemo } from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { de } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Plus, Pencil, Trash2, Clock, Users, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { mockEmployees, mockShifts } from '@/data/mockData';
import type { Employee, Shift, ShiftType } from '@/types/app';
import { SHIFT_TYPE_LABELS, SHIFT_COLORS } from '@/types/app';

const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

interface ShiftFormData {
  employee: string;
  date: string;
  start_time: string;
  end_time: string;
  shift_type: ShiftType;
  notes: string;
}

const emptyFormData: ShiftFormData = {
  employee: '',
  date: '',
  start_time: '06:00',
  end_time: '14:00',
  shift_type: 'morning',
  notes: '',
};

export default function Dashboard() {
  const [currentWeekStart, setCurrentWeekStart] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [employees] = useState<Employee[]>(mockEmployees);
  const [shifts, setShifts] = useState<Shift[]>(mockShifts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingShift, setEditingShift] = useState<Shift | null>(null);
  const [formData, setFormData] = useState<ShiftFormData>(emptyFormData);

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));
  }, [currentWeekStart]);

  const getShiftsForEmployeeAndDate = (employeeId: string, date: Date): Shift[] => {
    return shifts.filter(
      (s) =>
        s.fields.employee === employeeId &&
        isSameDay(new Date(s.fields.date), date)
    );
  };

  const getEmployeeById = (id: string | null): Employee | undefined => {
    if (!id) return undefined;
    return employees.find((e) => e.record_id === id);
  };

  const handlePreviousWeek = () => {
    setCurrentWeekStart((prev) => addDays(prev, -7));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart((prev) => addDays(prev, 7));
  };

  const handleToday = () => {
    setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));
  };

  const openAddDialog = (employeeId: string, date: Date) => {
    setEditingShift(null);
    setFormData({
      ...emptyFormData,
      employee: employeeId,
      date: format(date, 'yyyy-MM-dd'),
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (shift: Shift) => {
    setEditingShift(shift);
    setFormData({
      employee: shift.fields.employee || '',
      date: shift.fields.date,
      start_time: shift.fields.start_time,
      end_time: shift.fields.end_time,
      shift_type: shift.fields.shift_type,
      notes: shift.fields.notes || '',
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.employee || !formData.date) return;

    if (editingShift) {
      setShifts((prev) =>
        prev.map((s) =>
          s.record_id === editingShift.record_id
            ? {
                ...s,
                updatedat: new Date().toISOString(),
                fields: {
                  employee: formData.employee,
                  date: formData.date,
                  start_time: formData.start_time,
                  end_time: formData.end_time,
                  shift_type: formData.shift_type,
                  notes: formData.notes || null,
                },
              }
            : s
        )
      );
    } else {
      const newShift: Shift = {
        record_id: `shift-${Date.now()}`,
        createdat: new Date().toISOString(),
        updatedat: null,
        fields: {
          employee: formData.employee,
          date: formData.date,
          start_time: formData.start_time,
          end_time: formData.end_time,
          shift_type: formData.shift_type,
          notes: formData.notes || null,
        },
      };
      setShifts((prev) => [...prev, newShift]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    if (!editingShift) return;
    setShifts((prev) => prev.filter((s) => s.record_id !== editingShift.record_id));
    setIsDialogOpen(false);
  };

  const getTodayShifts = () => {
    const today = new Date();
    return shifts.filter((s) => isSameDay(new Date(s.fields.date), today));
  };

  const todayShifts = getTodayShifts();
  const workingToday = new Set(todayShifts.map((s) => s.fields.employee)).size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="mx-auto max-w-7xl p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Schichtplaner</h1>
          <p className="text-slate-600">Wochenansicht und Schichtverwaltung</p>
        </div>

        {/* Stats */}
        <div className="mb-6 grid gap-4 grid-cols-1 sm:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-full bg-blue-100 p-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Mitarbeiter</p>
                <p className="text-2xl font-bold text-slate-900">{employees.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-full bg-green-100 p-3">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Heute im Dienst</p>
                <p className="text-2xl font-bold text-slate-900">{workingToday}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-full bg-amber-100 p-3">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Schichten diese Woche</p>
                <p className="text-2xl font-bold text-slate-900">
                  {shifts.filter((s) =>
                    weekDays.some((d) => isSameDay(new Date(s.fields.date), d))
                  ).length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Week Navigation */}
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-semibold">
              {format(currentWeekStart, "MMMM yyyy", { locale: de })}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleToday}>
                Heute
              </Button>
              <Button variant="outline" size="icon" onClick={handlePreviousWeek}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleNextWeek}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-slate-50">
                    <th className="w-40 border-r p-3 text-left text-sm font-medium text-slate-600">
                      Mitarbeiter
                    </th>
                    {weekDays.map((day, i) => {
                      const isToday = isSameDay(day, new Date());
                      return (
                        <th
                          key={i}
                          className={`min-w-32 border-r p-3 text-center text-sm font-medium last:border-r-0 ${
                            isToday ? 'bg-blue-50 text-blue-700' : 'text-slate-600'
                          }`}
                        >
                          <div>{WEEKDAYS[i]}</div>
                          <div className={`text-lg font-bold ${isToday ? 'text-blue-700' : 'text-slate-900'}`}>
                            {format(day, 'd')}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.record_id} className="border-b last:border-b-0">
                      <td className="border-r p-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: employee.fields.color || '#6b7280' }}
                          />
                          <span className="font-medium text-slate-900">
                            {employee.fields.name}
                          </span>
                        </div>
                      </td>
                      {weekDays.map((day, i) => {
                        const dayShifts = getShiftsForEmployeeAndDate(employee.record_id, day);
                        const isToday = isSameDay(day, new Date());
                        return (
                          <td
                            key={i}
                            className={`border-r p-2 align-top last:border-r-0 ${
                              isToday ? 'bg-blue-50/50' : ''
                            }`}
                          >
                            <div className="min-h-16 space-y-1">
                              {dayShifts.map((shift) => (
                                <button
                                  key={shift.record_id}
                                  onClick={() => openEditDialog(shift)}
                                  className={`w-full rounded border p-2 text-left text-xs transition hover:shadow-md ${
                                    SHIFT_COLORS[shift.fields.shift_type]
                                  }`}
                                >
                                  <div className="font-medium">
                                    {shift.fields.start_time} - {shift.fields.end_time}
                                  </div>
                                  <div className="mt-0.5 opacity-80">
                                    {SHIFT_TYPE_LABELS[shift.fields.shift_type]}
                                  </div>
                                  {shift.fields.notes && (
                                    <div className="mt-1 truncate text-[10px] opacity-70">
                                      {shift.fields.notes}
                                    </div>
                                  )}
                                </button>
                              ))}
                              <button
                                onClick={() => openAddDialog(employee.record_id, day)}
                                className="flex w-full items-center justify-center rounded border border-dashed border-slate-300 p-2 text-xs text-slate-400 transition hover:border-slate-400 hover:bg-slate-50 hover:text-slate-600"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden">
              {weekDays.map((day, dayIndex) => {
                const isToday = isSameDay(day, new Date());
                const dayShifts = shifts.filter((s) =>
                  isSameDay(new Date(s.fields.date), day)
                );
                return (
                  <div
                    key={dayIndex}
                    className={`border-b p-4 last:border-b-0 ${
                      isToday ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <span className={`font-medium ${isToday ? 'text-blue-700' : 'text-slate-600'}`}>
                          {WEEKDAYS[dayIndex]}
                        </span>
                        <span className={`ml-2 text-lg font-bold ${isToday ? 'text-blue-700' : 'text-slate-900'}`}>
                          {format(day, 'd. MMM', { locale: de })}
                        </span>
                        {isToday && (
                          <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700">
                            Heute
                          </Badge>
                        )}
                      </div>
                    </div>
                    {dayShifts.length === 0 ? (
                      <p className="text-sm text-slate-400">Keine Schichten</p>
                    ) : (
                      <div className="space-y-2">
                        {dayShifts.map((shift) => {
                          const emp = getEmployeeById(shift.fields.employee);
                          return (
                            <button
                              key={shift.record_id}
                              onClick={() => openEditDialog(shift)}
                              className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition hover:shadow-md ${
                                SHIFT_COLORS[shift.fields.shift_type]
                              }`}
                            >
                              <div
                                className="h-8 w-8 rounded-full flex items-center justify-center text-white font-medium text-sm"
                                style={{ backgroundColor: emp?.fields.color || '#6b7280' }}
                              >
                                {emp?.fields.name.charAt(0)}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{emp?.fields.name}</div>
                                <div className="text-sm opacity-80">
                                  {shift.fields.start_time} - {shift.fields.end_time} · {SHIFT_TYPE_LABELS[shift.fields.shift_type]}
                                </div>
                              </div>
                              <Pencil className="h-4 w-4 opacity-50" />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <div className="h-3 w-6 rounded border bg-amber-100 border-amber-300" />
            <span>Frühschicht</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-6 rounded border bg-blue-100 border-blue-300" />
            <span>Spätschicht</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-6 rounded border bg-indigo-100 border-indigo-300" />
            <span>Nachtschicht</span>
          </div>
        </div>
      </div>

      {/* Edit/Add Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingShift ? 'Schicht bearbeiten' : 'Neue Schicht'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="employee">Mitarbeiter</Label>
              <Select
                value={formData.employee}
                onValueChange={(value) => setFormData({ ...formData, employee: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Mitarbeiter wählen" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((emp) => (
                    <SelectItem key={emp.record_id} value={emp.record_id}>
                      <div className="flex items-center gap-2">
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: emp.fields.color || '#6b7280' }}
                        />
                        {emp.fields.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Datum</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start_time">Start</Label>
                <Input
                  id="start_time"
                  type="time"
                  value={formData.start_time}
                  onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end_time">Ende</Label>
                <Input
                  id="end_time"
                  type="time"
                  value={formData.end_time}
                  onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="shift_type">Schichttyp</Label>
              <Select
                value={formData.shift_type}
                onValueChange={(value) => setFormData({ ...formData, shift_type: value as ShiftType })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Frühschicht (06:00 - 14:00)</SelectItem>
                  <SelectItem value="afternoon">Spätschicht (14:00 - 22:00)</SelectItem>
                  <SelectItem value="night">Nachtschicht (22:00 - 06:00)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notizen</Label>
              <Textarea
                id="notes"
                placeholder="Optionale Notizen..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter className="flex-col gap-2 sm:flex-row">
            {editingShift && (
              <Button
                variant="destructive"
                onClick={handleDelete}
                className="w-full sm:w-auto"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Löschen
              </Button>
            )}
            <div className="flex flex-1 justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Abbrechen
              </Button>
              <Button onClick={handleSave}>
                {editingShift ? 'Speichern' : 'Hinzufügen'}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
