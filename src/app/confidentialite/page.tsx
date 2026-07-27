import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function ConfidentialitePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 bg-[#ebe5de] pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-8 text-[#1e2d3d]">Politique de Confidentialité</h1>
          
          <div className="bg-white/80 backdrop-blur-md border border-[#d4cdc5] rounded-xl p-6 md:p-10 space-y-6 text-[#6b7b8d]">
            <section>
              <h2 className="text-xl font-semibold text-[#1e2d3d] mb-3">1. Collecte des données</h2>
              <p>
                Nous collectons les informations nécessaires au traitement de votre commande et à la communication
                concernant nos services : nom complet, adresse e-mail, numéro de téléphone, établissement scolaire,
                ainsi que les documents et détails liés à votre rapport de stage.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#1e2d3d] mb-3">2. Utilisation des données</h2>
              <p>
                Vos informations personnelles et documents ne sont utilisés que dans le cadre exclusif de la réalisation
                de la prestation demandée (rédaction, relecture, mise en page).
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#1e2d3d] mb-3">3. Protection des données et confidentialité</h2>
              <p>
                Nous prenons la confidentialité de vos travaux très au sérieux. Vos rapports, données d'entreprise
                et informations personnelles sont stockés de manière sécurisée et ne seront jamais partagés, vendus ou
                divulgués à des tiers. Les rédacteurs sont soumis au secret professionnel.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#1e2d3d] mb-3">4. Conservation des données</h2>
              <p>
                Vos documents finaux sont conservés le temps nécessaire pour garantir le service après-vente (corrections, etc.)
                et peuvent être supprimés de nos serveurs sur simple demande de votre part après la livraison finale.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
