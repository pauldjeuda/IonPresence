import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LocationService } from '../../services/location.service';
import { PresenceRecord, PresenceStorageService } from '../../services/presence-storage.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.page.html',
  styleUrls: ['./presence.page.scss']
})
export class PresencePage {
  isLoading = false;
  statusMessage = 'Prêt pour le pointage';
  statusColor = 'medium';
  distance?: number;
  accuracy?: number;
  userLatitude?: number;
  userLongitude?: number;
  isValidated?: boolean;
  isLate?: boolean;
  timestamp?: string;
  lastRecord?: PresenceRecord;
  userName?: string;
  isInfoPopupOpen = false;

  constructor(
    private locationService: LocationService,
    private presenceStorage: PresenceStorageService,
    private userService: UserService
  ) {
    this.lastRecord = this.presenceStorage.getRecords()[0];
    this.userName = this.userService.getUserName() || undefined;
  }

  openInfoPopup() {
    this.isInfoPopupOpen = true;
  }

  closeInfoPopup() {
    this.isInfoPopupOpen = false;
  }

  get infoPopupMessage(): string {
    return `Rayon autorisé: ${this.allowedRadius} m<br/>Heure d'arrivée: ${this.officeClock}<br/><br/>Vous devez pointer dans cette zone avant l'heure limite.`;
  }

  async checkPresence(): Promise<void> {
    this.isLoading = true;
    this.isValidated = undefined;
    this.distance = undefined;
    this.accuracy = undefined;
    this.isLate = undefined;

    try {
      const userLocation = await this.locationService.getCurrentPosition();
      this.userLatitude = userLocation.latitude;
      this.userLongitude = userLocation.longitude;
      this.accuracy = userLocation.accuracy;

      const companyLocation = environment.companyLocation;
      const distance = this.locationService.getDistance(userLocation, companyLocation);
      const timestamp = new Date().toISOString();
      const validated = distance <= environment.allowedPresenceRadiusMeters;
      const late = validated ? this.presenceStorage.isLate(timestamp) : false;

      this.distance = distance;
      this.timestamp = timestamp;
      this.isValidated = validated;
      this.isLate = late;
      this.statusColor = validated ? 'success' : 'danger';
      this.statusMessage = validated
        ? (late ? 'Présence validée avec retard' : 'Présence validée à l’heure')
        : 'Présence refusée : hors zone autorisée';

      const record: PresenceRecord = {
        id: timestamp,
        timestamp,
        validated,
        isLate: late,
        distance,
        accuracy: userLocation.accuracy,
        latitude: userLocation.latitude,
        longitude: userLocation.longitude
      };

      this.presenceStorage.saveRecord(record);
      this.lastRecord = record;
    } catch (error: any) {
      this.statusMessage = error?.message || 'Impossible de récupérer votre position';
      this.statusColor = 'warning';
      this.isValidated = undefined;
    } finally {
      this.isLoading = false;
    }
  }

  get allowedRadius(): number {
    return environment.allowedPresenceRadiusMeters;
  }

  get officeClock(): string {
    return `${String(environment.workStartHour).padStart(2, '0')}:${String(environment.workStartMinute).padStart(2, '0')}`;
  }

  formatDate(value?: string): string {
    if (!value) {
      return '—';
    }

    return new Intl.DateTimeFormat('fr-FR', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(new Date(value));
  }
}
