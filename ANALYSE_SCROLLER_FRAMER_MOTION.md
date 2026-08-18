# Analyse & améliorations — Scroller Framer Motion sur la landing page (FTP)

## 1. Ce que j'ai compris du projet

**FTP (FaisToiPlaisir)** est une application Next.js qui vend un
service de rédaction de **rapports de stage, mémoires et présentations PowerPoint** pour étudiants.

### Stack technique
- **Next.js 16.2.11** (App Router) + **React 19.2.4** (versions très récentes ⚠️ pour le choix du package animation)
- **Tailwind CSS v4** (`@import "tailwindcss"`, design tokens en CSS variables dans `globals.css`)
- **Supabase** (PostgreSQL : `orders`, `settings` + Storage pour les pièces jointes)
- **lucide-react** (icônes), **class-variance-authority** (boutons)
- i18n **FR/EN** maison via `src/lib/i18n/context.tsx`

### Palette & ambiance
- Palette chaude « premium » : crème `#f5f0eb` / beige `#ebe5de` / **doré `#c8944e`** / bleu ardoise `#1e2d3d`
- Fond vidéo fullscreen `sea-storm.mp4` (mer en tempête, ~12 Mo) en `position: fixed` derrière tout le site
- Glassmorphism (`.glass`, `.glass-strong`), dégradés dorés, glows

### Structure de la landing page (`src/app/page.tsx`)
```
Fond vidéo sea-storm (fixed, -z-50)
└─ Navbar (fixed, passe en glass au scroll via listener natif)
└─ Hero           → titre + CTA + 3 stats (50+ / 100% / 48h)
└─ HowItWorks     → 3 étapes + démo « navigateur » qui s'auto-avance
└─ Services       → 3 cartes, prix depuis Supabase
└─ Templates      → 4 réalisations en grille + modale d'aperçu
└─ Testimonials   → carrousel (translateX) + dots + flèches
└─ FAQ            → accordéon (max-height CSS)
└─ Footer + WhatsAppFloat
```

Tous les composants home sont **déjà des Client Components** (`"use client"`) — c'est un prérequis pour Framer Motion, donc ✅ rien à restructurer de ce côté.

---

## 2. Diagnostic des animations ACTUELLES (et pourquoi un « scroller » manque)

Les animations sont aujourd'hui **100 % CSS** (keyframes dans `globals.css` + `hero-animations.css`).
Classes disponibles : `animate-fade-in-up`, `animate-fade-in`, `animate-slide-in-left`,
`animate-pulse-glow`, `animate-float` + délais `delay-100…500`.

### Les problèmes détectés
| # | Problème | Impact |
|---|----------|--------|
| 1 | **Les animations se déclenchent au montage de la page, pas au scroll.** | Le Hero s'anime bien, mais `HowItWorks`, `Services`, `Templates`… déclenchent leur `fadeInUp` **immédiatement à l'ouverture**, même si l'utilisateur n'a pas encore scrollé. Quand il y arrive, l'animation est déjà finie → la page paraît **statique/morte**. |
| 2 | **`.animate-on-scroll { opacity: 0 }` est défini mais jamais activé** (aucun `IntersectionObserver`). | Demi-préparation abandonnée : si on l'appliquait telle quelle, les éléments resteraient **invisibles**. |
| 3 | **Aucune parallaxe / profondeur**, alors que le fond vidéo s'y prête parfaitement. | Rendu « plat », gâche le décor de fond. |
| 4 | **`hero.scrollHint` (« Scrolle pour découvrir »)** existe en FR **et** EN mais **n'est jamais rendu**. | Aucune incitation au scroll. |
| 5 | **Pas de barre de progression de lecture.** | Aucun repère de progression dans la page. |
| 6 | **Stats (50+, 100%, 48h) en chiffres fixes** — pas de comptage animé. | Baisse l'effet « wow » sur les chiffres clés. |
| 7 | **`HowItWorks` auto-avance via `setInterval`** (3 s), déconnecté de l'attention utilisateur. | La démo tourne dans le vide même hors écran. |
| 8 | **Aucune prise en charge de `prefers-reduced-motion`.** | Problème d'accessibilité (utilisateurs sensibles au mouvement). |
| 9 | Aucune lib d'animation JS installée (`grep framer-motion` → **rien**). | Il faut **ajouter** la dépendance. |

**Conclusion :** il n'y a pas de « scroller » aujourd'hui. On a des animations d'entrée au chargement,
mais **zéro réaction au défilement**. C'est précisément ce que Framer Motion va corriger.

---

## 3. Choix du package (important avec React 19 / Next 16)

Le package **`framer-motion`** a été renommé **`motion`** (même auteur, Framer).
Pour **React 19.2.4**, il faut la lib moderne :

```bash
npm install motion
# import depuis "motion/react" (et non plus "framer-motion")
```

- ✅ Compatible React 19 / Next 16 App Router
- ✅ Tous les composants home sont déjà `"use client"` → rien à restructurer
- ⚠️ `useScroll` / `useInView` doivent rester dans des Client Components (c'est le cas)
- 📦 Bundle ~30–50 ko gzippé, acceptable

---

## 4. Les améliorations possibles (du plus simple au plus ambitieux)

### A. Fondations réutilisables (à faire en premier)
- Créer un composant **`<Reveal>`** générique basé sur `motion.div` + `whileInView` + `useInView`
  (avec `once: true`, `amount: 0.2`) → remplace tous les `animate-fade-in-up` CSS actuels.
- Créer **`<Stagger>` + `<StaggerItem>`** pour animer en cascade les grilles (Services, Templates, FAQ).
- Ajouter un **hook `useReducedMotion()`** (Framer Motion le fournit) pour désactiver le mouvement
  quand l'utilisateur le demande → accessibilité + conforme RGAA/WCAG.

### B. Navigation & repères de scroll
1. **Barre de progression de lecture** (haut de page) — `useScroll()` → `scaleX` d'une barre dorée.
2. **Indicateur « Scrolle pour découvrir »** animé (flèche qui rebondit) dans le Hero — utilise
   enfin la clé `hero.scrollHint` déjà traduite 🎯.
3. **Bouton « retour en haut »** qui apparaît en `whileInView`/au scroll.

### C. Section par section

**🎬 Hero**
- Parallaxe sur la **vidéo de fond** (`useScroll` + `useTransform` → `y` / `scale` au scroll).
- Titre animé **mot par mot** (stagger) au lieu d'un `fadeInUp` global.
- **Compteurs animés** sur les 3 stats (0 → 50, 0 → 100, 0 → 48) avec `useInView` + `animate()`.
- Orbes lumineuses (keyframes `hero-animations.css`) réanimées en **parallaxe** au scroll.

**⚙️ HowItWorks**
- Remplacer le `setInterval` auto par une **avancée pilotée au scroll** : la démo « navigateur »
  change d'étape quand on entre/sort de la section (ou via une **section pinned**).
- Les cartes d'étapes en `whileInView` stagger.

**💎 Services**
- Cartes en **stagger reveal** au scroll + survol `whileHover` (relèvement + glow doré).
- Léger **parallaxe** vertical sur les cartes.

**📄 Templates**
- **Option forte : scroll horizontal pinné** (`position: sticky` + `useScroll` → `translateX`),
  les 4 réalisations défilent horizontalement pendant que l'utilisateur scrolle verticalement.
- Ou à défaut : reveal stagger + survol `whileHover` (zoom léger + overlay doré).
- **Modale d'aperçu** animée avec `AnimatePresence` (entrée/sortie propre au lieu du simple `fadeIn`).

**⭐ Testimonials**
- Carrousel réécrit avec `motion` + **glisser-déposer (`drag`)** / ou auto-advance lié au scroll.
- Transition `AnimatePresence` entre avis (slide/fade) au lieu du `translateX` CSS manuel.

**❓ FAQ**
- Accordéon animé **proprement** : `motion.div` avec `height: "auto"` animé
  (aujourd'hui c'est un `max-h` CSS qui « saute »).

### D. Effets globaux (les « petits plus »)
- **Parallaxe douce** sur les séparateurs / fonds de section.
- **Scale-down du Hero** quand on scrolle (effet profondeur « s'enfonce »).
- `AnimatePresence` pour la modale Templates et le menu mobile de la Navbar.

---

## 5. Recommandation de priorisation

| Priorité | Amélioration | Gain perçu | Effort |
|----------|--------------|-----------|--------|
| 🔴 P0 | Installer `motion` + `<Reveal>`/`<Stagger>` + `useReducedMotion` | Énorme (répare le « tout se joue au chargement ») | Faible |
| 🔴 P0 | Parallaxe vidéo de fond + barre de progression | Effet premium immédiat | Faible |
| 🟠 P1 | Compteurs animés des stats + scrollHint Hero | Crédibilité + incitation | Faible |
| 🟠 P1 | Accordéon FAQ animé propre + `AnimatePresence` modale | Finition pro | Faible |
| 🟡 P2 | HowItWorks piloté au scroll | Interactivité | Moyen |
| 🟡 P2 | Templates en scroll horizontal pinné | Effet « wow » signature | Moyen–élevé |
| 🟢 P3 | Testimonials en drag, parallaxe des cartes | Polish | Moyen |

### Points de vigilance
- **Vidéo de fond 12 Mo** + plusieurs `useScroll` + parallaxes lourdes → surveiller les perfs sur
  mobile / connections faibles (audience étudiants, souvent mobile). Prévoir `whileInView`
  légers plutôt que plein de `useScroll` globaux.
- Garder `once: true` sur les `whileInView` pour éviter de ré-animer en boucle.
- Respecter `prefers-reduced-motion` (hook Framer Motion) pour l'accessibilité.

---

## 6. Prochaine étape proposée
Je peux implémenter dans l'ordre : **(1)** installation de `motion`, **(2)** composants
`<Reveal>` / `<Stagger>` + `useReducedMotion`, **(3)** remplacement des animations CSS
par des reveals au scroll sur toutes les sections, **(4)** parallaxe vidéo + barre de progression
+ compteurs animés + scrollHint, puis les raffinements (Templates horizontal, FAQ animé…).
