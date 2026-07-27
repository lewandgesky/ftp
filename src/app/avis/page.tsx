"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { getApprovedReviews } from "@/lib/store";
import { Review } from "@/types/order";

export default function AvisPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await getApprovedReviews();
      setReviews(data);
      setLoading(false);
    };
    load();
  }, []);

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "5.0";

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 bg-[#ebe5de] pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-[#1e2d3d] mb-4">
              Ce que nos clients disent
            </h1>
            <p className="text-[#6b7b8d] max-w-2xl mx-auto mb-6">
              Des avis authentiques d&apos;étudiants qui nous ont fait confiance pour leurs rapports de stage, mémoires et présentations.
            </p>
            
            {/* Stats bar */}
            {reviews.length > 0 && (
              <div className="inline-flex items-center gap-6 bg-white/80 backdrop-blur-md border border-[#d4cdc5] rounded-2xl px-8 py-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#c8944e]">{averageRating}</div>
                  <div className="text-xs text-[#6b7b8d]">Note moyenne</div>
                </div>
                <div className="w-px h-10 bg-[#d4cdc5]"></div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={parseFloat(averageRating) >= star ? "#c8944e" : "none"} stroke={parseFloat(averageRating) >= star ? "#c8944e" : "#d4cdc5"} strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <div className="w-px h-10 bg-[#d4cdc5]"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#1e2d3d]">{reviews.length}</div>
                  <div className="text-xs text-[#6b7b8d]">Avis vérifiés</div>
                </div>
              </div>
            )}
          </div>

          {/* Reviews Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-[#c2a275] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-[#f5f0eb] flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c2a275" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <h3 className="text-xl font-bold text-[#1e2d3d] mb-2">Pas encore d&apos;avis</h3>
              <p className="text-[#6b7b8d]">Les premiers avis de nos clients apparaîtront bientôt ici.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <Card key={review.id} className="bg-white/80 backdrop-blur-md border-[#d4cdc5] p-6 hover:-translate-y-1 transition-transform duration-300">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={review.rating >= star ? "#c8944e" : "none"} stroke={review.rating >= star ? "#c8944e" : "#d4cdc5"} strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  
                  {/* Content */}
                  <p className="text-[#4a5568] leading-relaxed mb-6 italic">
                    &quot;{review.content}&quot;
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-[#d4cdc5]">
                    <div className="w-10 h-10 rounded-full bg-[#c2a275]/10 flex items-center justify-center text-[#c2a275] font-bold text-sm">
                      {review.isAnonymous ? "?" : review.studentName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-[#1e2d3d]">
                        {review.isAnonymous ? "Étudiant anonyme" : review.studentName}
                      </div>
                      <div className="text-xs text-[#6b7b8d]">
                        {[review.field, review.school].filter(Boolean).join(" · ") || "Étudiant"}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
