# Test Technique Frontend - FANGA

Ce projet est une réponse complète au test technique pour le poste de Développeur Frontend Vite.js (Back-Office).

## Lancement du projet

Le projet se trouve dans le dossier `back-office`.

1.  **Naviguer dans le dossier** :
    ```bash
    cd back-office
    ```

2.  **Installer les dépendances** :
    ```bash
    npm install
    ```

3.  **Lancer le serveur de développement** :
    ```bash
    npm run dev
    ```

4.  Ouvrir [http://localhost:5173](http://localhost:5173).

## 🌍 Démo en Live

Le projet est déployé et accessible ici : **[Lien de la Démo Vercel](https://votre-projet.vercel.app)**

## Fonctionnalités Implémentées

### Core (Requis)
*   **Architecture Robuste** : Vite + React + TypeScript + Redux Toolkit.
*   **Design Premium** : Tailwind CSS avec couleurs Fanga, police Poppins et design soigné.
*   **Dashboard Complet** :
    *   Liste des stations (Cards responsive).
    *   **KPIs en temps réel** (Batteries dispo, Stations en maintenance, Swaps du jour).
    *   **Filtres dynamiques** (Recherche, Statut, Tri intelligent).
*   **Détail Station** :
    *   Vue détaillée avec statuts visuels.
    *   **Action "Maintenance"** fonctionnelle et persistante.



### Bonus & "Winning Edge" (100% Complété)
*   **Mobile First & UX** :
    *   **Filtres Optimisés** : Interface mobile repensée avec contrôles empilés et **Dropdown Custom** pour le tri.
    *   **KPIs Responsive** : Grille intelligente (1 colonne Mobile / 3 colonnes Desktop).
*   **Loading UX Premium** : Système de **Skeletons Granulaires** (Layout, Stats, Grille, Détail) pour une fluidité totale.
*   **Feedback & Interaction** :
    *   **Recherche Instantanée** : Barre de recherche avec **Debouncing** (300ms).
    *   **Notifications** : Système de toasts (Sonner) pour le feedback des actions.
    *   **Admin Avatar** : Génération dynamique des initiales de l'utilisateur.
*   **Architecture & Qualité** :
    *   **Persistance LocalStorage** : Les états (Maintenance/Actif) sont sauvegardés.
    *   **Tests Unitaires** : Couverture complète des reducers avec Vitest.
    *   **Code Clean** : Refactoring modulaire, zéro saut de layout (CLS).



## Choix Techniques

*   **Redux Toolkit** : Choisi pour sa robustesse et sa gestion d'état prévisible. L'état est hydraté au démarrage depuis le LocalStorage.
*   **Tailwind CSS** : Utilisé pour un prototypage rapide et un design system cohérent (variables `fanga-green`, etc.).
*   **Vitest** : Pour des tests unitaires rapides et compatibles avec l'écosystème Vite.
*   **Sonner** : Pour des notifications toasts, choisie pour sa légèreté par rapport à `react-toastify`.



## Question Finale : Scalabilité

**Comment feriez-vous évoluer ce back-office pour gérer 1 000 stations en temps réel ?**

Pour passer à l'échelle (Scale-up) tout en maintenant une performance de 60 FPS :

1.  **Optimisation du Rendu (Rendering)** :
    *   **Virtualisation (Windowing)** : Utiliser `react-window` ou `tanstack-virtual` pour ne rendre dans le DOM que les stations visibles à l'écran. Cela permet de scroller une liste de 10 000 items avec la même fluidité qu'une liste de 10.
    *   **Mémorisation** : Utilisation stricte de `React.memo` et `useMemo` pour éviter les re-renders inutiles des cartes lors des mises à jour fréquentes.

2.  **Gestion des Données (State & Network)** :
    *   **WebSockets (Socket.io)** : Remplacer le polling par une connexion WebSocket pour recevoir uniquement les "deltas" (ex: batterie -1%) en temps réel, réduisant drastiquement la bande passante.
    *   **Normalisation du State** : Utiliser `createEntityAdapter` (Redux Toolkit) pour stocker les stations sous forme de Map `{ [id]: station }` plutôt qu'un tableau. L'accès et la mise à jour d'une station deviennent instantanés (O(1)).
    *   **React Query / RTK Query** : Pour gérer intelligemment le cache serveur, la déduplication des requêtes et les mises à jour optimistes.

3.  **UI/UX pour la Masse** :
    *   **Clustering Géographique** : Sur une vue carte, regrouper les stations proches en clusters pour éviter de saturer la vue.
    *   **Filtres Serveur** : Déporter la logique de recherche et de tri côté serveur (Backend) pour ne pas charger le client.
