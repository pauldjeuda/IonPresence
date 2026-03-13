import { Component } from '@angular/core';
import { PresenceRecord, PresenceStats, PresenceStorageService } from '../../services/presence-storage.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss']
})
export class ReportsPage {
  selectedPeriod: 'week' | 'month' = 'week';
  weekRecords: PresenceRecord[] = [];
  monthRecords: PresenceRecord[] = [];
  weekStats!: PresenceStats;
  monthStats!: PresenceStats;

  constructor(private presenceStorage: PresenceStorageService) {}

  ionViewWillEnter(): void {
    this.refresh();
  }

  refresh(): void {
    this.weekRecords = this.presenceStorage.getWeekRecords();
    this.monthRecords = this.presenceStorage.getMonthRecords();
    this.weekStats = this.presenceStorage.getStats(this.weekRecords);
    this.monthStats = this.presenceStorage.getStats(this.monthRecords);
  }

  changePeriod(period: 'week' | 'month'): void {
    this.selectedPeriod = period;
  }

  get activeRecords(): PresenceRecord[] {
    return this.selectedPeriod === 'week' ? this.weekRecords : this.monthRecords;
  }

  get activeStats(): PresenceStats {
    return this.selectedPeriod === 'week' ? this.weekStats : this.monthStats;
  }

  get periodLabel(): string {
    return this.selectedPeriod === 'week' ? 'de la semaine' : 'du mois';
  }

  formatDate(value: string): string {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(value));
  }
}
