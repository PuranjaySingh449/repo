"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, ArrowRight, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LanguageSelection() {
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "hi" | null>(null)
  const router = useRouter()

  const handleContinue = () => {
    if (selectedLanguage) {
      localStorage.setItem("selectedLanguage", selectedLanguage)
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <Card className="w-full max-w-lg shadow-2xl border-0 bg-white/95 backdrop-blur-sm relative z-10">
        <CardContent className="p-10 text-center">
          <div className="mb-10">
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Leaf className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-yellow-800" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
              Dr. Crop
            </h1>
            <p className="text-gray-600 text-lg">AI-Powered Crop Disease Detection</p>
            <p className="text-gray-500 text-sm mt-2">कृत्रिम बुद्धिमत्ता से फसल रोग की पहचान</p>
          </div>

          <div className="space-y-6 mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Language / भाषा चुनें</h2>

            <div className="space-y-4">
              <Button
                variant={selectedLanguage === "en" ? "default" : "outline"}
                className={`w-full h-16 text-lg font-semibold transition-all duration-300 ${
                  selectedLanguage === "en"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transform scale-105"
                    : "border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-700"
                }`}
                onClick={() => setSelectedLanguage("en")}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🇺🇸</span>
                  <span>English</span>
                </div>
              </Button>

              <Button
                variant={selectedLanguage === "hi" ? "default" : "outline"}
                className={`w-full h-16 text-lg font-semibold transition-all duration-300 ${
                  selectedLanguage === "hi"
                    ? "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg transform scale-105"
                    : "border-2 border-gray-300 hover:border-orange-400 hover:bg-orange-50 text-gray-700"
                }`}
                onClick={() => setSelectedLanguage("hi")}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🇮🇳</span>
                  <span>हिंदी (Hindi)</span>
                </div>
              </Button>
            </div>
          </div>

          <Button
            onClick={handleContinue}
            disabled={!selectedLanguage}
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all duration-300"
          >
            <span className="flex items-center space-x-2">
              <span>{selectedLanguage === "hi" ? "जारी रखें" : "Continue"}</span>
              <ArrowRight className="w-5 h-5" />
            </span>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
