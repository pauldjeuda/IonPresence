import { Component } from '@angular/core';
import { PresenceRecord, PresenceStats, PresenceStorageService } from '../../services/presence-storage.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss']
})
export class ReportsPage {
  monthRecords: PresenceRecord[] = [];
  monthStats!: PresenceStats;

  constructor(private presenceStorage: PresenceStorageService) {}

  ionViewWillEnter(): void {
    this.refresh();
  }

  refresh(): void {
    this.monthRecords = this.presenceStorage.getMonthRecords();
    this.monthStats = this.presenceStorage.getStats(this.monthRecords);
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
