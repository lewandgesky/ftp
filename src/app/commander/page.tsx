"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useTranslation } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { createOrder, getPriceSettings } from "@/lib/store";
import { StudyLevel, ServiceType } from "@/types/order";

function OrderFormContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") as ServiceType | null;

  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const prices = getPriceSettings();

  // Form State
  const [formData, setFormData] = useState({
    // Step 1
    fullName: "",
    email: "",
    phone: "",
    school: "",
    fieldOfStudy: "",
    studyLevel: "licence" as StudyLevel,
    // Step 2
    companyName: "",
    companySector: "",
    internshipDuration: "",
    department: "",
    supervisorName: "",
    positionHeld: "",
    // Step 3
    reportTheme: "",
    problematic: "",
    objectives: "",
    tasksDone: "",
    difficulties: "",
    results: "",
    schoolGuidelines: "",
    // Step 4 (Files mock for now)
    files: [] as File[],
    // Step 5
    serviceType: (initialService || "report") as ServiceType,
    specialRequests: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      // Mock validation (size < 30MB)
      const validFiles = newFiles.filter(f => f.size <= 30 * 1024 * 1024);
      setFormData((prev) => ({ ...prev, files: [...prev.files, ...validFiles] }));
    }
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return formData.fullName.length > 1 && formData.email.includes("@") && formData.phone.length > 5 && formData.school && formData.fieldOfStudy;
      case 2:
        return formData.companyName && formData.companySector && formData.internshipDuration;
      case 3:
        return formData.reportTheme && formData.tasksDone.length >= 50;
      case 4:
        return true; // Files are optional
      case 5:
        return !!formData.serviceType;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep() && step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const calculateTotal = () => {
    switch (formData.serviceType) {
      case "report": return prices.reportPrice;
      case "powerpoint": return prices.powerpointPrice;
      case "pack": return prices.packPrice;
      default: return 0;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API delay
    await new Promise(r => setTimeout(r, 1500));
    
    // Create order in store
    const order = createOrder({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      school: formData.school,
      fieldOfStudy: formData.fieldOfStudy,
      studyLevel: formData.studyLevel,
      companyName: formData.companyName,
      companySector: formData.companySector,
      internshipDuration: formData.internshipDuration,
      department: formData.department,
      supervisorName: formData.supervisorName,
      positionHeld: formData.positionHeld,
      reportTheme: formData.reportTheme,
      problematic: formData.problematic,
      objectives: formData.objectives,
      tasksDone: formData.tasksDone,
      difficulties: formData.difficulties,
      results: formData.results,
      schoolGuidelines: formData.schoolGuidelines,
      serviceType: formData.serviceType,
      specialRequests: formData.specialRequests,
      totalPrice: calculateTotal(),
      // mock saving files URL
    });

    router.push(`/commander/succes?ref=${order.orderRef}`);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-24 md:py-32 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t("order.title")}</h1>
        <p className="text-[#8888a0]">{t("order.subtitle")}</p>
      </div>

      {/* Progress bar */}
      <div className="mb-10">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <div 
              key={s} 
              className={`text-xs font-medium ${s <= step ? 'text-[#7c3aed]' : 'text-[#5a5a72]'}`}
            >
              Étape {s}
            </div>
          ))}
        </div>
        <div className="w-full bg-[#1a1a2e] rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] h-2 rounded-full transition-all duration-300"
            style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      <Card className="bg-[#0a0a0f] border-[#2a2a3e]">
        <CardContent className="p-6 md:p-8">
          
          {/* STEP 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-semibold border-b border-[#2a2a3e] pb-3 mb-6">{t("order.step1")}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">{t("order.fullName")} <span className="text-red-500">*</span></Label>
                  <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("order.email")} <span className="text-red-500">*</span></Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("order.phone")} <span className="text-red-500">*</span></Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school">{t("order.school")} <span className="text-red-500">*</span></Label>
                  <Input id="school" name="school" value={formData.school} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fieldOfStudy">{t("order.fieldOfStudy")} <span className="text-red-500">*</span></Label>
                  <Input id="fieldOfStudy" name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studyLevel">{t("order.studyLevel")} <span className="text-red-500">*</span></Label>
                  <select 
                    id="studyLevel" 
                    name="studyLevel" 
                    value={formData.studyLevel} 
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-[#2a2a3e] bg-[#0a0a0f] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed] text-[#f0f0f5]"
                  >
                    <option value="bts">{t("order.studyLevels.bts")}</option>
                    <option value="licence">{t("order.studyLevels.licence")}</option>
                    <option value="master">{t("order.studyLevels.master")}</option>
                    <option value="ingenieur">{t("order.studyLevels.ingenieur")}</option>
                    <option value="other">{t("order.studyLevels.other")}</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Internship Info */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-semibold border-b border-[#2a2a3e] pb-3 mb-6">{t("order.step2")}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">{t("order.companyName")} <span className="text-red-500">*</span></Label>
                  <Input id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companySector">{t("order.companySector")} <span className="text-red-500">*</span></Label>
                  <Input id="companySector" name="companySector" value={formData.companySector} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="internshipDuration">{t("order.internshipDuration")} <span className="text-red-500">*</span></Label>
                  <Input id="internshipDuration" name="internshipDuration" placeholder="Ex: 3 mois" value={formData.internshipDuration} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">{t("order.department")}</Label>
                  <Input id="department" name="department" value={formData.department} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supervisorName">{t("order.supervisorName")}</Label>
                  <Input id="supervisorName" name="supervisorName" value={formData.supervisorName} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="positionHeld">{t("order.positionHeld")}</Label>
                  <Input id="positionHeld" name="positionHeld" value={formData.positionHeld} onChange={handleChange} />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Project Info */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-semibold border-b border-[#2a2a3e] pb-3 mb-6">{t("order.step3")}</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="reportTheme">{t("order.reportTheme")} <span className="text-red-500">*</span></Label>
                  <Input id="reportTheme" name="reportTheme" value={formData.reportTheme} onChange={handleChange} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tasksDone">{t("order.tasksDone")} <span className="text-red-500">*</span></Label>
                  <p className="text-xs text-[#8888a0]">{t("order.tasksDoneHint")}</p>
                  <Textarea id="tasksDone" name="tasksDone" className="min-h-[120px]" value={formData.tasksDone} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="problematic">{t("order.problematic")}</Label>
                  <Textarea id="problematic" name="problematic" value={formData.problematic} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schoolGuidelines">{t("order.schoolGuidelines")}</Label>
                  <p className="text-xs text-[#8888a0]">{t("order.schoolGuidelinesHint")}</p>
                  <Textarea id="schoolGuidelines" name="schoolGuidelines" value={formData.schoolGuidelines} onChange={handleChange} />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Documents */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-semibold border-b border-[#2a2a3e] pb-3 mb-6">{t("order.step4")}</h2>
              
              <div className="border-2 border-dashed border-[#2a2a3e] rounded-xl p-8 text-center bg-[#12121a] hover:bg-[#1a1a2e] transition-colors relative">
                <input 
                  type="file" 
                  multiple 
                  onChange={handleFileChange} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <div className="w-12 h-12 rounded-full bg-[#1a1a2e] border border-[#3a3a52] flex items-center justify-center mx-auto mb-4 text-[#7c3aed]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                </div>
                <p className="font-semibold mb-2">{t("order.uploadTitle")}</p>
                <p className="text-sm text-[#8888a0] mb-2">{t("order.uploadDesc")}</p>
                <p className="text-xs text-[#5a5a72]">{t("order.uploadFormats")}</p>
              </div>

              {formData.files.length > 0 && (
                <div className="space-y-3 mt-6">
                  <h3 className="text-sm font-medium">Fichiers sélectionnés :</h3>
                  {formData.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-[#12121a] border border-[#2a2a3e]">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#06b6d4] flex-shrink-0"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                        <span className="text-sm truncate">{file.name}</span>
                        <span className="text-xs text-[#5a5a72]">{(file.size / 1024 / 1024).toFixed(2)} Mo</span>
                      </div>
                      <button onClick={() => removeFile(index)} className="text-red-400 hover:text-red-300 p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 5: Services */}
          {step === 5 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-semibold border-b border-[#2a2a3e] pb-3 mb-6">{t("order.step5")}</h2>
              
              <div className="space-y-4">
                <Label>{t("order.serviceChoice")}</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: "report", name: t("services.report.name"), price: prices.reportPrice },
                    { id: "pack", name: t("services.pack.name"), price: prices.packPrice },
                    { id: "powerpoint", name: t("services.powerpoint.name"), price: prices.powerpointPrice }
                  ].map((service) => (
                    <div 
                      key={service.id}
                      onClick={() => setFormData(prev => ({ ...prev, serviceType: service.id as ServiceType }))}
                      className={`cursor-pointer rounded-xl border p-4 transition-all ${
                        formData.serviceType === service.id 
                          ? "border-[#7c3aed] bg-[#7c3aed]/10 shadow-glow" 
                          : "border-[#2a2a3e] bg-[#12121a] hover:border-[#3a3a52]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-sm">{service.name}</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.serviceType === service.id ? "border-[#7c3aed]" : "border-[#5a5a72]"}`}>
                          {formData.serviceType === service.id && <div className="w-2 h-2 rounded-full bg-[#7c3aed]"></div>}
                        </div>
                      </div>
                      <div className="text-sm text-[#06b6d4] font-medium">
                        {service.price > 0 ? `${service.price} FCFA` : "Sur devis"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 mt-6">
                <Label htmlFor="specialRequests">{t("order.specialRequests")}</Label>
                <p className="text-xs text-[#8888a0]">{t("order.specialRequestsHint")}</p>
                <Textarea id="specialRequests" name="specialRequests" value={formData.specialRequests} onChange={handleChange} />
              </div>

              {/* Summary */}
              <div className="mt-8 p-6 rounded-xl bg-[#12121a] border border-[#2a2a3e]">
                <h3 className="font-semibold mb-4 border-b border-[#2a2a3e] pb-2">{t("order.summary")}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#8888a0]">Client :</span>
                    <span className="font-medium text-right">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8888a0]">Thème :</span>
                    <span className="font-medium text-right truncate ml-4 max-w-[200px] md:max-w-md">{formData.reportTheme || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8888a0]">Service :</span>
                    <span className="font-medium text-right">
                      {formData.serviceType === "report" ? t("services.report.name") : 
                       formData.serviceType === "powerpoint" ? t("services.powerpoint.name") : 
                       t("services.pack.name")}
                    </span>
                  </div>
                  <div className="flex justify-between pt-4 mt-4 border-t border-[#2a2a3e]">
                    <span className="font-bold">Total estimé :</span>
                    <span className="font-bold text-[#06b6d4] text-lg">
                      {calculateTotal() > 0 ? `${calculateTotal()} FCFA` : "Sur devis"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-10 flex justify-between pt-6 border-t border-[#2a2a3e]">
            <Button 
              type="button" 
              variant="outline" 
              onClick={prevStep} 
              disabled={step === 1 || isSubmitting}
            >
              {t("common.previous")}
            </Button>
            
            {step < totalSteps ? (
              <Button 
                type="button" 
                variant="glow" 
                onClick={nextStep}
                disabled={!validateStep()}
              >
                {t("common.next")}
              </Button>
            ) : (
              <Button 
                type="button" 
                variant="glow" 
                onClick={handleSubmit}
                disabled={!validateStep() || isSubmitting}
                className="bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857]"
              >
                {isSubmitting ? t("common.loading") : t("order.confirmOrder")}
              </Button>
            )}
          </div>

        </CardContent>
      </Card>
    </div>
  );
}

export default function OrderPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 bg-[#050508] bg-[url('/grid-pattern.svg')] bg-repeat">
        <Suspense fallback={<div className="flex justify-center items-center h-64">{/* Loading */}</div>}>
          <OrderFormContent />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
