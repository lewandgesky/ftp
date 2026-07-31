"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useTranslation } from "@/lib/i18n/context";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/Reveal";
import { getApprovedReviews } from "@/lib/store";
import { Review } from "@/types/order";

interface DisplayTestimonial {
  id: string | number;
  name: string;
  school: string;
  field: string;
  content: string;
  rating: number;
}

const FALLBACK_TESTIMONIALS: DisplayTestimonial[] = [
  {
    id: 1,
    name: "Marc E.",
    school: "Université de Yaoundé II",
    field: "Économie",
    content:
      "Un service incroyable ! J'étais submergé par mon stage et je n'avais pas le temps de rédiger mon rapport. L'équipe a produit un document parfait, sans faute, et le PowerPoint était juste magnifique.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sophie T.",
    school: "ESSEC Douala",
    field: "Ressources Humaines",
    content:
      "La communication sur WhatsApp est super pratique. J'ai pu demander quelques ajustements après la première version et ils ont été faits le jour même. Mon encadreur académique a adoré.",
    rating: 5,
  },
  {
    id: 3,
    name: "Christian N.",
    school: "Institut Supérieur",
    field: "Génie Logiciel",
    content:
      "J'avais beaucoup de mal avec la mise en page et la structure. Ils ont pris mes notes et mon code source pour en faire un rapport technique de 50 pages très professionnel. Je recommande le pack complet !",
    rating: 5,
  },
];

function reviewToDisplay(review: Review): DisplayTestimonial {
  return {
    id: review.id,
    name: review.isAnonymous ? "Étudiant anonyme" : review.studentName,
    school: review.school || "",
    field: review.field || "",
    content: review.content,
    rating: review.rating,
  };
}

export function Testimonials() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [testimonials, setTestimonials] = useState<DisplayTestimonial[]>(
    FALLBACK_TESTIMONIALS
  );
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const loadReviews = async () => {
      const approved = await getApprovedReviews();
      if (approved.length > 0) {
        setTestimonials(approved.map(reviewToDisplay));
        setActiveIndex(0);
      }
      // If no approved reviews, keep fallback data
    };
    loadReviews();
  }, []);

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setActiveIndex(index);
    },
    []
  );

  const paginate = useCallback(
    (dir: number) => {
      const next =
        (activeIndex + dir + testimonials.length) % testimonials.length;
      goTo(next, dir);
    },
    [activeIndex, testimonials.length, goTo]
  );

  const item = testimonials[activeIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: reduceMotion ? 0 : dir > 0 ? 320 : -320,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: reduceMotion ? 0 : dir > 0 ? -320 : 320,
      opacity: 0,
    }),
  };

  return (
    <section className="py-20 bg-[#f5f0eb]/80 backdrop-blur-md relative border-y border-white/20">
      <div className="container mx-auto px-4 md:px-6">
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1e2d3d]">
            {t("testimonials.title")}
          </h2>
          <p className="text-[#6b7b8d] max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </Reveal>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Carousel */}
            <div className="overflow-hidden relative px-4">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={item?.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="w-full"
                >
                  <Card className="bg-white border-[#d4cdc5] p-8 md:p-10 text-center relative max-w-3xl mx-auto">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#f5f0eb] p-2 rounded-full border border-[#d4cdc5]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="none"
                        className="text-[#c8944e]"
                      >
                        <path d="M10 11h-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H6l2 4h2l-2-4z" />
                        <path d="M20 11h-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4l2 4h2l-2-4z" />
                      </svg>
                    </div>

                    <div className="flex justify-center gap-1 mb-6 mt-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill={i < item.rating ? "#c8944e" : "none"}
                          stroke={i < item.rating ? "#c8944e" : "#d4cdc5"}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>

                    <p className="text-lg md:text-xl text-[#4a5568] leading-relaxed mb-8 italic">
                      &quot;{item?.content}&quot;
                    </p>

                    <div>
                      <div className="font-bold text-lg text-[#1e2d3d]">
                        {item?.name}
                      </div>
                      {item?.field && (
                        <div className="text-sm text-[#c8944e]">{item.field}</div>
                      )}
                      {item?.school && (
                        <div className="text-sm text-[#6b7b8d]">
                          {item.school}
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index, index > activeIndex ? 1 : -1)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-[#c8944e] w-8"
                      : "w-3 bg-[#d4cdc5] hover:bg-[#b8b0a6]"
                  }`}
                  aria-label={`Aller au témoignage ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(-1)}
              className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-[#d4cdc5] flex items-center justify-center text-[#1e2d3d] hover:bg-[#ebe5de] transition-colors z-10"
              aria-label="Témoignage précédent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-[#d4cdc5] flex items-center justify-center text-[#1e2d3d] hover:bg-[#ebe5de] transition-colors z-10"
              aria-label="Témoignage suivant"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
