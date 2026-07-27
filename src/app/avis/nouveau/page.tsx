"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { submitReview } from "@/lib/store";

export default function NewReviewPage() {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [studentName, setStudentName] = useState("");
  const [school, setSchool] = useState("");
  const [field, setField] = useState("");
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !studentName.trim()) return;
    
    setIsSubmitting(true);
    const result = await submitReview({
      studentName: studentName.trim(),
      school: school.trim(),
      field: field.trim(),
      content: content.trim(),
      rating,
      isAnonymous,
    });
    
    setIsSubmitting(false);
    if (result) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <main className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-1 bg-[#ebe5de] pt-24 pb-20">
          <div className="container mx-auto px-4 md:px-6 max-w-2xl">
            <Card className="bg-white/80 backdrop-blur-md border-[#d4cdc5]">
              <CardContent className="p-8 md:p-12 text-center">
                <div className="w-20 h-20 bg-[#10b981]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h2 className="text-2xl font-bold text-[#1e2d3d] mb-3">Merci beaucoup ! 🎉</h2>
                <p className="text-[#6b7b8d] mb-2">
                  Votre avis a été envoyé avec succès.
                </p>
                <p className="text-sm text-[#8c9bab]">
                  Il sera publié sur notre site après validation par notre équipe.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 bg-[#ebe5de] pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1e2d3d] mb-3">
              Votre avis compte ! ⭐
            </h1>
            <p className="text-[#6b7b8d]">
              Partagez votre expérience avec FTP. Votre retour nous aide à nous améliorer et aide d&apos;autres étudiants à nous faire confiance.
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-md border-[#d4cdc5]">
            <CardContent className="p-6 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Star Rating */}
                <div className="space-y-2">
                  <Label className="text-[#1e2d3d] text-base font-semibold">Votre note</Label>
                  <div className="flex gap-2 justify-center py-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="36"
                          height="36"
                          viewBox="0 0 24 24"
                          fill={(hoverRating || rating) >= star ? "#c8944e" : "none"}
                          stroke={(hoverRating || rating) >= star ? "#c8944e" : "#d4cdc5"}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <div className="space-y-2">
                  <Label htmlFor="content" className="text-[#1e2d3d]">
                    Votre témoignage <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Décrivez votre expérience avec FTP... (qualité du travail, communication, respect des délais, etc.)"
                    className="min-h-[120px] bg-white border-[#d4cdc5] text-[#1e2d3d] focus:ring-[#c2a275]"
                    required
                  />
                </div>

                {/* Name and info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentName" className="text-[#1e2d3d]">
                      Votre nom <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="studentName"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Ex: Marc Essomba"
                      className="bg-white border-[#d4cdc5] text-[#1e2d3d] focus:ring-[#c2a275]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="school" className="text-[#1e2d3d]">Votre école / université</Label>
                    <Input
                      id="school"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      placeholder="Ex: ESSEC Douala"
                      className="bg-white border-[#d4cdc5] text-[#1e2d3d] focus:ring-[#c2a275]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="field" className="text-[#1e2d3d]">Votre filière</Label>
                  <Input
                    id="field"
                    value={field}
                    onChange={(e) => setField(e.target.value)}
                    placeholder="Ex: Marketing, Informatique, RH..."
                    className="bg-white border-[#d4cdc5] text-[#1e2d3d] focus:ring-[#c2a275]"
                  />
                </div>

                {/* Anonymous toggle */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#f5f0eb] border border-[#d4cdc5]">
                  <button
                    type="button"
                    onClick={() => setIsAnonymous(!isAnonymous)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                      isAnonymous ? "bg-[#c2a275]" : "bg-[#d4cdc5]"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                        isAnonymous ? "translate-x-6" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                  <div>
                    <div className="font-medium text-sm text-[#1e2d3d]">Rester anonyme</div>
                    <div className="text-xs text-[#6b7b8d]">
                      {isAnonymous
                        ? "Votre nom ne sera pas affiché publiquement"
                        : "Votre nom sera visible sur le site"}
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !content.trim() || !studentName.trim()}
                  className="w-full bg-[#c2a275] hover:bg-[#b59567] text-white h-12 text-base"
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer mon avis"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </main>
  );
}
