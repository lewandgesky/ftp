# Fast & Trust Platform (FTP)

**FTP (Fast & Trust Platform)** est une application web moderne développée pour accompagner les étudiants dans la rédaction de leurs rapports de stage, mémoires et présentations (PowerPoint). La plateforme permet de commander des services d'assistance rédactionnelle personnalisée de manière simple, sécurisée et rapide.

## 🚀 Fonctionnalités Principales

- **Landing Page Moderne** : Un design premium avec mode sombre (slate-dark), animations fluides (glassmorphism, orbes lumineuses) et adaptatif sur tous les supports.
- **Formulaire de Commande Multi-étapes** :
  - Collecte des informations personnelles, données de stage, directives scolaires, etc.
  - Option d'ignorer certaines étapes spécifiques qui ne sont pas obligatoires.
  - **Upload de Documents** : Possibilité d'uploader plusieurs fichiers (PDF, Word, Images, etc.) en pièce jointe directement sur le cloud (Supabase Storage).
- **Tarification Dynamique** : Les prix des services sont récupérés en temps réel depuis la base de données.
- **Suivi de Commande** : Un espace permettant aux étudiants de suivre l'avancement de leur commande en utilisant la référence (CMD-XXXX).
- **Tableau de bord Admin (Panel `\doni`)** :
  - Accès sécurisé par mot de passe.
  - Aperçu et gestion des commandes (modification du statut de la commande).
  - Gestion dynamique des tarifs des prestations depuis l'interface (synchronisée avec Supabase).
  - **Consultation des Fichiers** : Visualisation directe et téléchargement forcé des fichiers des clients grâce aux URL signées.
  - Lien direct vers WhatsApp pour contacter le client.
- **Pages Légales** : CGV, Politique de Confidentialité, Mentions légales et Formulaire de Contact.

## 🛠️ Stack Technique

- **Framework Front-end** : [Next.js 14/15](https://nextjs.org/) (App Router, React)
- **Styling** : [Tailwind CSS](https://tailwindcss.com/) avec palette de couleurs personnalisée (mode sombre "slate").
- **Backend-as-a-Service** : [Supabase](https://supabase.com/)
  - Base de données **PostgreSQL** pour stocker les commandes et les prix (`orders`, `settings`).
  - **Supabase Storage** pour le stockage sécurisé des pièces jointes des clients (Bucket `order_documents`).
  - **RLS (Row Level Security)** configuré pour sécuriser les accès publics d'insertion.
- **Déploiement (Prévu)** : Vercel.

## 📁 Changements Récents & Améliorations

Voici un aperçu des dernières mises à jour importantes apportées au projet :
- **Intégration Complète de Supabase** : Migration depuis un état local vers Supabase pour la création des commandes et la persistance des paramètres tarifaires.
- **Système de Fichiers (Storage)** : Création et configuration d'un bucket sécurisé sur Supabase, génération d'URLs signées pour visualiser/télécharger les documents clients évitant les erreurs d'encodage (accents, espaces).
- **Modification de la Route Admin** : Remplacement de l'accès `/admin` par la route sécurisée et personnalisée `/doni`.
- **Refonte UI/UX** : Éclaircissement de la palette sombre (passage de fonds noir très foncé à un bleu ardoise plus doux et moderne), refonte de l'interface d'accueil (Hero animé), et ajustement de l'ensemble des composants (boutons, cartes).
- **Création des pages légales** : Ajout fonctionnel du pied de page et de toutes ses pages respectives (Contact, CGV, etc.).

## ⚙️ Configuration & Installation

1. **Cloner le projet**
   ```bash
   git clone https://github.com/lewandgesky/ftp.git
   cd ftp
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Variables d'environnement**
   Créez un fichier `.env.local` à la racine et ajoutez-y vos identifiants Supabase :
   ```env
   NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key_supabase
   ```

4. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```
   Le projet sera accessible sur `http://localhost:3000`.

---
*Fait avec ❤️ pour simplifier la vie des étudiants.*
