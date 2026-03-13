import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Geolocation, PermissionStatus, Position } from '@capacitor/geolocation';

export interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  async getCurrentPosition(): Promise<UserLocation> {
    if (Capacitor.isNativePlatform()) {
      await this.ensureNativePermissions();
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      });

      return this.normalizePosition(position);
    }

    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Géolocalisation non supportée par cet appareil'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => resolve(this.normalizePosition(position)),
        (error) => reject(new Error(this.mapBrowserError(error.code))),
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0
        }
      );
    });
  }

  getDistance(origin: UserLocation, target: UserLocation): number {
    const earthRadiusMeters = 6371000;
    const latDiffRad = this.toRad(target.latitude - origin.latitude);
    const lonDiffRad = this.toRad(target.longitude - origin.longitude);
    const originLatRad = this.toRad(origin.latitude);
    const targetLatRad = this.toRad(target.latitude);

    const a =
      Math.sin(latDiffRad / 2) * Math.sin(latDiffRad / 2) +
      Math.cos(originLatRad) * Math.cos(targetLatRad) *
      Math.sin(lonDiffRad / 2) * Math.sin(lonDiffRad / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusMeters * c;
  }

  private async ensureNativePermissions(): Promise<void> {
    let permissions: PermissionStatus = await Geolocation.checkPermissions();

    if (permissions.location === 'prompt' || permissions.coarseLocation === 'prompt') {
      permissions = await Geolocation.requestPermissions();
    }

    if (permissions.location !== 'granted' && permissions.coarseLocation !== 'granted') {
      throw new Error('Permission de géolocalisation refusée');
    }
  }

  private normalizePosition(position: Position | GeolocationPosition): UserLocation {
    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy
    };
  }

  private mapBrowserError(code: number): string {
    switch (code) {
      case 1:
        return 'Permission de géolocalisation refusée';
      case 2:
        return 'Position GPS indisponible';
      case 3:
        return 'Délai de géolocalisation dépassé';
      default:
        return 'Erreur inconnue de géolocalisation';
    }
  }

  private toRad(value: number): number {
    return value * Math.PI / 180;
  }
}
