"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, Camera, Zap, Shield, ImageIcon, Sparkles, Brain, Target } from "lucide-react"
import { useRouter } from "next/navigation"

const crops = [
  { id: "tomato", name: "Tomato", hindiName: "टमाटर", emoji: "🍅", color: "from-red-400 to-red-600" },
  { id: "potato", name: "Potato", hindiName: "आलू", emoji: "🥔", color: "from-yellow-400 to-orange-500" },
  { id: "maize", name: "Maize", hindiName: "मक्का", emoji: "🌽", color: "from-yellow-400 to-yellow-600" },
  { id: "cotton", name: "Cotton", hindiName: "कपास", emoji: "🌿", color: "from-green-400 to-green-600" },
  { id: "apple", name: "Apple", hindiName: "सेब", emoji: "🍎", color: "from-red-400 to-pink-500" },
  { id: "rice", name: "Rice", hindiName: "चावल", emoji: "🌾", color: "from-amber-400 to-yellow-500" },
]

const features = [
  {
    icon: Brain,
    title: "AI-Powered Detection",
    hindiTitle: "AI संचालित पहचान",
    desc: "Advanced machine learning algorithms",
    hindiDesc: "उन्नत मशीन लर्निंग एल्गॉरिदम",
    color: "from-purple-500 to-indigo-600",
  },
  {
    icon: Target,
    title: "99% Accuracy",
    hindiTitle: "99% सटीकता",
    desc: "Highly accurate disease identification",
    hindiDesc: "अत्यधिक सटीक रोग पहचान",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Zap,
    title: "Instant Results",
    hindiTitle: "तत्काल परिणाम",
    desc: "Get results in seconds",
    hindiDesc: "सेकंडों में परिणाम पाएं",
    color: "from-yellow-500 to-orange-600",
  },
  {
    icon: Shield,
    title: "Expert Validated",
    hindiTitle: "विशेषज्ञ सत्यापित",
    desc: "Verified by agricultural experts",
    hindiDesc: "कृषि विशेषज्ञों द्वारा सत्यापित",
    color: "from-blue-500 to-cyan-600",
  },
]

export default function Dashboard() {
  const [selectedCrop, setSelectedCrop] = useState<string>("")
  const [dragActive, setDragActive] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [language, setLanguage] = useState<"en" | "hi">("en")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage") as "en" | "hi"
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  const text = {
    en: {
      title: "Dr. Crop Dashboard",
      subtitle: "Upload your crop image for instant AI-powered disease analysis",
      selectCrop: "Select Your Crop",
      autoDetect: "🤖 Auto-detect crop type",
      uploadArea: "Drop your image here or click to browse",
      uploadText: "Drag and drop your crop image here",
      browseFiles: "📁 Browse Files",
      analyze: "🔍 Analyze My Crop",
      selectCropFirst: "Please select a crop type first",
      features: "Why Choose Dr. Crop?",
      uploadTitle: "Upload Crop Image",
    },
    hi: {
      title: "डॉ. क्रॉप डैशबोर्ड",
      subtitle: "तुरंत AI-संचालित रोग विश्लेषण के लिए अपनी फसल की तस्वीर अपलोड करें",
      selectCrop: "अपनी फसल चुनें",
      autoDetect: "🤖 फसल का प्रकार स्वतः पहचानें",
      uploadArea: "अपनी तस्वीर यहाँ छोड़ें या ब्राउज़ करने के लिए क्लिक करें",
      uploadText: "अपनी फसल की तस्वीर यहाँ खींचें और छोड़ें",
      browseFiles: "📁 फाइलें ब्राउज़ करें",
      analyze: "🔍 मेरी फसल का विश्लेषण करें",
      selectCropFirst: "कृपया पहले फसल का प्रकार चुनें",
      features: "डॉ. क्रॉप क्यों चुनें?",
      uploadTitle: "फसल की तस्वीर अपलोड करें",
    },
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleAnalyze = () => {
    if (!selectedCrop && !uploadedImage) {
      alert(text[language].selectCropFirst)
      return
    }

    localStorage.setItem(
      "analysisData",
      JSON.stringify({
        crop: selectedCrop,
        image: uploadedImage,
        language: language,
      }),
    )

    router.push("/results")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {text[language].title}
                </h1>
                <p className="text-gray-600 text-sm">{text[language].subtitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge
                className={`px-4 py-2 text-sm font-semibold ${
                  language === "en"
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    : "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                }`}
              >
                {language === "en" ? "\ud83c\uddfa\ud83c\uddf8 English" : "\ud83c\uddee\ud83c\uddf3 हिंदी"}
              </Badge>
              <Button
                className="rounded-full min-w-[90px] bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-md hover:from-purple-600 hover:to-indigo-600 transition-all"
                onClick={() => router.push("/signup")}
                style={{marginLeft:8}}
              >
                Sign Up
              </Button>
              <Button
                className="rounded-full min-w-[90px] bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-md hover:from-blue-600 hover:to-purple-600 transition-all"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">{text[language].features}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800">
                    {language === "en" ? feature.title : feature.hindiTitle}
                  </h3>
                  <p className="text-sm text-gray-600">{language === "en" ? feature.desc : feature.hindiDesc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Crop Selection */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {text[language].selectCrop}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant={selectedCrop === "auto" ? "default" : "outline"}
                  className={`w-full justify-start h-12 text-left transition-all duration-300 ${
                    selectedCrop === "auto"
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                      : "border-2 hover:border-purple-400 hover:bg-purple-50"
                  }`}
                  onClick={() => setSelectedCrop("auto")}
                >
                  <Zap className="w-5 h-5 mr-3" />
                  {text[language].autoDetect}
                </Button>

                {crops.map((crop) => (
                  <Button
                    key={crop.id}
                    variant={selectedCrop === crop.id ? "default" : "outline"}
                    className={`w-full justify-start h-12 text-left transition-all duration-300 ${
                      selectedCrop === crop.id
                        ? `bg-gradient-to-r ${crop.color} text-white shadow-lg transform scale-105`
                        : "border-2 hover:border-gray-400 hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedCrop(crop.id)}
                  >
                    <span className="text-xl mr-3">{crop.emoji}</span>
                    <div className="text-left">
                      <div className="font-semibold">{language === "en" ? crop.name : crop.hindiName}</div>
                      {language === "hi" && <div className="text-xs opacity-75">{crop.name}</div>}
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Upload Area */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                    <Upload className="w-5 h-5 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {text[language].uploadTitle}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-3 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                    dragActive
                      ? "border-green-500 bg-green-50 scale-105"
                      : "border-gray-300 hover:border-green-400 hover:bg-green-50/50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {uploadedImage ? (
                    <div className="space-y-6">
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Uploaded crop"
                        className="max-w-full max-h-80 mx-auto rounded-xl shadow-lg border-4 border-white"
                      />
                      <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-blue-400 text-blue-600 hover:bg-blue-50"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        {language === "en" ? "Change Image" : "तस्वीर बदलें"}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mx-auto">
                        <ImageIcon className="w-12 h-12 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-xl font-semibold text-gray-700 mb-2">{text[language].uploadText}</p>
                        <p className="text-gray-500">{text[language].uploadArea}</p>
                      </div>
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg px-8 py-3"
                      >
                        <Upload className="w-5 h-5 mr-2" />
                        {text[language].browseFiles}
                      </Button>
                    </div>
                  )}
                </div>

                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />

                <Button
                  onClick={handleAnalyze}
                  disabled={!uploadedImage}
                  className="w-full mt-8 h-14 text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  {text[language].analyze}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-4 w-full">
        <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold text-sm shadow-md">
          {language === "en" ? "us English" : "हिंदी"}
        </span>
        <button
          className="ml-4 px-5 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-sm shadow-md hover:from-blue-600 hover:to-purple-600 transition-all border-0 outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => router.push("/signup")}
          style={{minWidth:'90px'}}
        >
          Sign Up
        </button>
        <button
          className="ml-2 px-5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold text-sm shadow-md hover:from-emerald-600 hover:to-green-600 transition-all border-0 outline-none focus:ring-2 focus:ring-green-400"
          onClick={() => router.push("/login")}
          style={{minWidth:'90px'}}
        >
          Login
        </button>
      </div>
    </div>
  )
}
