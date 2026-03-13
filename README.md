# 📍 Présence App — Vérification GPS

Application mobile Ionic / Angular permettant de vérifier si un employé est bien présent sur le site de l'entreprise via GPS.

---

## ✅ Fonctionnalités

- 📍 Récupération de la position GPS de l'utilisateur
- 📏 Calcul de la distance entre l'utilisateur et l'entreprise (algorithme Haversine)
- ✅ Validation ou refus automatique de la présence selon un rayon configurable
- 📊 Affichage de la distance, précision GPS et heure du pointage
- 📱 Interface Ionic propre et responsive

---

## ⚙️ Configuration

Modifier les coordonnées de l'entreprise dans `src/environments/environment.ts` :

```ts
export const environment = {
  companyLocation: {
    latitude: 3.848,    // ← Latitude de l'entreprise
    longitude: 11.502   // ← Longitude de l'entreprise
  },
  allowedPresenceRadiusMeters: 50  // ← Rayon autorisé en mètres
};
```

---

## 🚀 Lancer en développement

```bash
# Installer les dépendances
npm install

# Lancer le serveur de dev
ionic serve
```

---

## 📱 Build APK Android

```bash
# 1. Build de l'app web
ionic build

# 2. Initialiser Capacitor Android (première fois seulement)
npx cap add android

# 3. Synchroniser les fichiers
npx cap sync android

# 4. Build APK debug
cd android
chmod +x gradlew
./gradlew assembleDebug

# L'APK se trouve dans :
# android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🤖 CI/CD GitHub Actions

Le pipeline `.github/workflows/build-apk.yml` se déclenche automatiquement à chaque push sur `main`.

Il génère un APK téléchargeable dans les **Artifacts** de la GitHub Action.

---

## 🛠️ Technologies

| Technologie | Version |
|---|---|
| Ionic | 7.x |
| Angular | 17.x |
| Capacitor | 5.x |
| Node.js | 20.x |
| Java | 17 (pour Android) |

---

## 📂 Structure du projet

```
presence-app/
├── src/
│   ├── app/
│   │   ├── pages/presence/      # Page principale
│   │   └── services/            # Service GPS
│   └── environments/            # Config entreprise
├── .github/workflows/           # Pipeline CI
├── capacitor.config.ts          # Config Capacitor
└── ionic.config.json
```
