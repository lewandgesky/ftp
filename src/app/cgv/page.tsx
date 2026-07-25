import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function CGVPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 bg-[#0f172a] pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-8 text-[#f1f5f9]">Conditions Générales de Vente (CGV)</h1>
          
          <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 md:p-10 space-y-6 text-[#94a3b8]">
            <section>
              <h2 className="text-xl font-semibold text-[#f1f5f9] mb-3">1. Objet</h2>
              <p>
                Les présentes Conditions Générales de Vente définissent les modalités selon lesquelles
                notre plateforme fournit ses services de rédaction et d'accompagnement de rapports de stage,
                mémoires et présentations PowerPoint.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#f1f5f9] mb-3">2. Commandes</h2>
              <p>
                Toute commande effectuée sur la plateforme vaut acceptation pleine et entière des présentes
                CGV. Le client s'engage à fournir des informations exactes lors de sa commande (directives de l'école, thème, informations personnelles).
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#f1f5f9] mb-3">3. Tarifs et Paiement</h2>
              <p>
                Les tarifs de nos services sont indiqués sur la plateforme en FCFA. Le paiement est requis pour
                démarrer le travail. En cas d'option "Sur devis", un prix personnalisé sera communiqué au client.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#f1f5f9] mb-3">4. Livraison</h2>
              <p>
                Les délais de livraison sont fournis à titre indicatif lors de la validation de la commande.
                Nous nous engageons à respecter ces délais dans la mesure du possible, sous réserve de la réception de
                toutes les informations requises de la part du client.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#f1f5f9] mb-3">5. Révisions et Remboursement</h2>
              <p>
                Nous offrons des révisions selon les retours de vos encadreurs pour s'assurer que le document
                répond aux exigences. En raison de la nature numérique et personnalisée des services,
                aucun remboursement n'est possible une fois le travail entamé.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
