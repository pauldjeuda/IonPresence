#!/bin/bash

# Script pour générer les icônes de l'application
echo "Génération des icônes pour l'application Presence App..."

# Vérifier si le logo principal existe
if [ ! -f "resources/icon.png" ]; then
    echo "ERREUR: Le logo principal resources/icon.png n'existe pas"
    echo "Veuillez ajouter votre logo (1024x1024px) dans resources/icon.png"
    exit 1
fi

# Installer les dépendances nécessaires
echo "Installation des dépendances..."
npm install -g @ionic/cli cordova-res native-run

# Générer les icônes Android
echo "Génération des icônes Android..."
cordova-res android --skip-config --copy

# Générer les icônes iOS
echo "Génération des icônes iOS..."
cordova-res ios --skip-config --copy

# Copier les icônes vers les dossiers Capacitor
echo "Copie des icônes vers les dossiers Capacitor..."
if [ -d "resources/android/icon" ]; then
    mkdir -p android/app/src/main/res
    cp -r resources/android/icon/* android/app/src/main/res/ 2>/dev/null || true
fi

echo "Génération des icônes terminée!"
echo "Les icônes ont été générées dans les dossiers resources/ et copiées vers android/app/src/main/res/"
