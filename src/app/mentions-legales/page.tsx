import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function MentionsLegalesPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 bg-[#0f172a] pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-8 text-[#f1f5f9]">Mentions Légales</h1>
          
          <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 md:p-10 space-y-6 text-[#94a3b8]">
            <section>
              <h2 className="text-xl font-semibold text-[#f1f5f9] mb-3">1. Éditeur du site</h2>
              <p>
                Le site internet FTP (Fast & Trust Platform) est édité par l'équipe FTP.
                Pour toute question, veuillez utiliser le formulaire de contact ou les coordonnées fournies sur la plateforme.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#f1f5f9] mb-3">2. Hébergement</h2>
              <p>
                Ce site est hébergé par Vercel Inc.<br />
                340 S Lemon Ave #4133<br />
                Walnut, CA 91789, USA
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#f1f5f9] mb-3">3. Propriété Intellectuelle</h2>
              <p>
                L'ensemble du contenu (textes, images, logos, éléments graphiques) présent sur ce site est la
                propriété exclusive de l'éditeur ou fait l'objet d'une autorisation d'utilisation. Toute
                reproduction totale ou partielle est interdite sans autorisation préalable.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-[#f1f5f9] mb-3">4. Limitation de responsabilité</h2>
              <p>
                FTP s'efforce de fournir un service d'assistance rédactionnelle de haute qualité, mais ne saurait
                être tenu responsable des notes obtenues ou des décisions académiques des établissements des étudiants.
                Les travaux fournis servent de base de recherche et d'accompagnement.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
