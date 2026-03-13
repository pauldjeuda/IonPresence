import { Injectable } from '@angular/core';
import { Geolocation, PermissionStatus } from '@capacitor/geolocation';

export interface AppLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  async getCurrentPosition(): Promise<AppLocation> {
    const permissions: PermissionStatus = await Geolocation.checkPermissions();

    if (permissions.location !== 'granted') {
      const requested = await Geolocation.requestPermissions();

      if (requested.location !== 'granted') {
        throw new Error('Permission refusée');
      }
    }

    const position = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    });

    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy
    };
  }

  getDistance(
    origin: { latitude: number; longitude: number },
    target: { latitude: number; longitude: number }
  ): number {
    const earthRadius = 6371000;

    const toRad = (value: number) => (value * Math.PI) / 180;

    const dLat = toRad(target.latitude - origin.latitude);
    const dLon = toRad(target.longitude - origin.longitude);

    const lat1 = toRad(origin.latitude);
    const lat2 = toRad(target.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c;
  }
}