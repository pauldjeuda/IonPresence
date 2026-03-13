import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface PresenceRecord {
  id: string;
  timestamp: string;
  validated: boolean;
  isLate: boolean;
  distance: number;
  accuracy?: number;
  latitude: number;
  longitude: number;
}

export interface PresenceStats {
  total: number;
  lateCount: number;
  onTimeCount: number;
  validatedCount: number;
  invalidCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class PresenceStorageService {
  private readonly storageKey = 'presence-records-v1';

  getRecords(): PresenceRecord[] {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      return [];
    }

    try {
      const parsed = JSON.parse(raw) as PresenceRecord[];
      return parsed.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    } catch {
      return [];
    }
  }

  saveRecord(record: PresenceRecord): void {
    const records = this.getRecords();
    records.unshift(record);
    localStorage.setItem(this.storageKey, JSON.stringify(records));
  }

  getWeekRecords(referenceDate = new Date()): PresenceRecord[] {
    const records = this.getRecords();
    const start = this.startOfWeek(referenceDate);
    const end = new Date(start);
    end.setDate(start.getDate() + 7);

    return records.filter((record) => {
      const recordDate = new Date(record.timestamp);
      return recordDate >= start && recordDate < end;
    });
  }

  getMonthRecords(referenceDate = new Date()): PresenceRecord[] {
    const records = this.getRecords();
    const year = referenceDate.getFullYear();
    const month = referenceDate.getMonth();

    return records.filter((record) => {
      const recordDate = new Date(record.timestamp);
      return recordDate.getFullYear() === year && recordDate.getMonth() === month;
    });
  }

  getStats(records: PresenceRecord[]): PresenceStats {
    const lateCount = records.filter((record) => record.validated && record.isLate).length;
    const validatedCount = records.filter((record) => record.validated).length;
    const invalidCount = records.filter((record) => !record.validated).length;

    return {
      total: records.length,
      lateCount,
      onTimeCount: validatedCount - lateCount,
      validatedCount,
      invalidCount
    };
  }

  isLate(timestamp: string): boolean {
    const date = new Date(timestamp);
    const workStart = new Date(date);
    workStart.setHours(environment.workStartHour, environment.workStartMinute, 0, 0);
    return date.getTime() > workStart.getTime();
  }

  private startOfWeek(date: Date): Date {
    const result = new Date(date);
    const day = result.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    result.setDate(result.getDate() + diff);
    result.setHours(0, 0, 0, 0);
    return result;
  }
}
