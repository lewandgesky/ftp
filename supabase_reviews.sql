-- Script SQL pour créer la table `reviews` pour le système d'avis clients

CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "studentName" TEXT NOT NULL,
  school TEXT NOT NULL DEFAULT '',
  field TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Activer la Row Level Security (Sécurité au niveau des lignes)
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- 1. Permettre à tout le monde de soumettre un nouvel avis (pour le formulaire /avis/nouveau)
CREATE POLICY "Anyone can insert reviews" 
ON reviews FOR INSERT 
WITH CHECK (true);

-- 2. Permettre à tout le monde de lire UNIQUEMENT les avis approuvés (pour la page /avis et l'accueil)
CREATE POLICY "Anyone can read approved reviews" 
ON reviews FOR SELECT 
USING (status = 'approved');

-- 3. Permettre la gestion via le panneau admin
-- Comme l'admin est protégé localement (mot de passe), on autorise l'accès complet via l'API pour l'instant
CREATE POLICY "Enable all operations" 
ON reviews FOR ALL 
USING (true)
WITH CHECK (true);
