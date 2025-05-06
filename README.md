# 🔍 Bluesky Searcher

Un outil permettant de rechercher du contenu public sur le réseau social **Bluesky**.

---

## 🧰 Stack utilisée

- **Frontend** : React (Vite)  
- **Backend** : Node.js + Express  
- **API** : [@atproto/api](https://www.npmjs.com/package/@atproto/api)

---

## 🚀 Installation & Lancement

### 1. Cloner le projet

```bash
git clone https://github.com/ton-user/bluesky-searcher.git
cd bluesky-searcher
```

### 2. Installer les dépendances

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

### 3. Configuration (⚠️ Nécessite un compte Bluesky)

Créer un fichier `.env` dans le dossier `backend` :

```env
BSKY_IDENTIFIER=ton@adresse.email
BSKY_PASSWORD=tonMotDePasse
```

> Ce compte doit être valide sur Bluesky pour que l’API fonctionne.

### 4. Lancer le backend

```bash
cd backend
node index.js
```

L’API sera disponible sur `http://localhost:3000`.

### 5. Lancer le frontend

Dans un nouveau terminal :

```bash
cd frontend
npm run dev
```

Accède ensuite à [http://localhost:5173](http://localhost:5173)

---

## ✨ Fonctionnalités

- 🔍 Recherche de posts publics via mot-clé
- 📑 Navigation entre posts (← / →)
- 🧑‍ Profil utilisateur via fenêtre modale
- 🗂️ Gestion multi-recherches par onglets
- 🖼️ Affichage d’image intégrée dans un post

---
