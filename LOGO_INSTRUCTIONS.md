# Instructions pour l'ajout du logo

## Étapes à suivre :

### 1. Ajouter le logo comme icône de l'application

Placez votre image logo dans les dossiers suivants avec les tailles appropriées :

#### Pour Android :
- `resources/android/icon/drawable-mdpi-icon.png` (48x48 px)
- `resources/android/icon/drawable-hdpi-icon.png` (72x72 px)
- `resources/android/icon/drawable-xhdpi-icon.png` (96x96 px)
- `resources/android/icon/drawable-xxhdpi-icon.png` (144x144 px)
- `resources/android/icon/drawable-xxxhdpi-icon.png` (192x192 px)

#### Pour iOS :
- `resources/ios/icon/icon.png` (57x57 px)
- `resources/ios/icon/icon@2x.png` (114x114 px)
- `resources/ios/icon/icon-60.png` (60x60 px)
- `resources/ios/icon/icon-60@2x.png` (120x120 px)
- `resources/ios/icon/icon-60@3x.png` (180x180 px)

### 2. Ajouter le logo pour la page de présence

Placez votre logo dans :
- `src/assets/images/logo.png` (200x200 px recommandé)

### 3. Génération automatique avec Ionic CLI

Vous pouvez aussi utiliser la commande Ionic pour générer automatiquement toutes les tailles :

```bash
# Placez votre logo principal (1024x1024 px) dans resources/icon.png
ionic cordova resources --icon
```

### 4. Pipeline CI/CD mis à jour

Le pipeline GitHub Actions générera automatiquement l'APK avec les nouvelles icônes.

## Note importante :
Assurez-vous que votre image est carrée et de haute qualité pour de meilleurs résultats.
