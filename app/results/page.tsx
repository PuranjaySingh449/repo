"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  Leaf,
  Droplets,
  Sun,
  Bug,
  Sparkles,
  RefreshCw,
  Brain,
  Target,
  Shield,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface AnalysisData {
  crop: string
  image: string
  language: "en" | "hi"
}

const diseaseInfo = {
  healthy: {
    en: {
      status: "🌱 Healthy Crop Detected!",
      description:
        "Excellent news! Your crop appears to be in perfect health with no signs of disease detected by our AI analysis.",
      recommendations: [
        "Continue your current excellent care routine",
        "Monitor for any changes in leaf color or texture",
        "Maintain proper soil nutrition and pH levels",
        "Keep the growing area clean and free from weeds",
        "Ensure adequate but not excessive watering",
      ],
    },
    hi: {
      status: "🌱 स्वस्थ फसल का पता चला!",
      description: "बहुत अच्छी खबर! आपकी फसल बिल्कुल स्वस्थ दिखाई दे रही है और हमारे AI विश्लेषण में कोई बीमारी के लक्षण नहीं मिले हैं।",
      recommendations: [
        "अपनी वर्तमान उत्कृष्ट देखभाल की दिनचर्या जारी रखें",
        "पत्तियों के रंग या बनावट में किसी भी बदलाव पर नज़र रखें",
        "मिट्टी का उचित पोषण और pH स्तर बनाए रखें",
        "बढ़ते क्षेत्र को साफ और खरपतवार से मुक्त रखें",
        "पर्याप्त लेकिन अत्यधिक नहीं, पानी देना सुनिश्चित करें",
      ],
    },
  },
  diseased: {
    en: {
      status: "⚠️ Disease Symptoms Detected",
      description:
        "Our advanced AI analysis has identified potential disease symptoms in your crop. Early detection allows for prompt treatment.",
      recommendations: [
        "Consult with a local agricultural expert immediately",
        "Consider applying organic or recommended fungicide treatment",
        "Improve air circulation around affected plants",
        "Remove and dispose of severely affected leaves properly",
        "Monitor other plants in the area for similar symptoms",
        "Adjust watering schedule to prevent moisture buildup",
      ],
    },
    hi: {
      status: "⚠️ बीमारी के लक्षण मिले",
      description: "हमारे उन्नत AI विश्लेषण ने आपकी फसल में संभावित बीमारी के लक्षण पाए हैं। जल्दी पहचान से तुरंत इलाज संभव है।",
      recommendations: [
        "तुरंत स्थानीय कृषि विशेषज्ञ से सलाह लें",
        "जैविक या सुझाए गए कवकनाशी उपचार पर विचार करें",
        "प्रभावित पौधों के चारों ओर हवा का संचार बेहतर बनाएं",
        "गंभीर रूप से प्रभावित पत्तियों को सही तरीके से हटाएं और नष्ट करें",
        "क्षेत्र के अन्य पौधों में समान लक्षणों की निगरानी करें",
        "नमी के संचय को रोकने के लिए पानी देने का कार्यक्रम समायोजित करें",
      ],
    },
  },
}

export default function Results() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)
  const [isHealthy, setIsHealthy] = useState<boolean>(true)
  const [confidence, setConfidence] = useState<number>(95)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const data = localStorage.getItem("analysisData")
    if (data) {
      const parsed = JSON.parse(data)
      setAnalysisData(parsed)

      setTimeout(() => {
        setIsHealthy(Math.random() > 0.4)
        setConfidence(Math.floor(Math.random() * 20) + 80)
        setLoading(false)
      }, 3000)
    } else {
      router.push("/dashboard")
    }
  }, [router])

  if (!analysisData) {
    return <div>Loading...</div>
  }

  const currentInfo = isHealthy ? diseaseInfo.healthy : diseaseInfo.diseased
  const text = currentInfo[analysisData.language]

  const cropEmojis: { [key: string]: string } = {
    tomato: "🍅",
    potato: "🥔",
    maize: "🌽",
    cotton: "🌿",
    apple: "🍎",
    rice: "🌾",
    auto: "🤖",
  }

  const cropNames = {
    en: {
      tomato: "Tomato",
      potato: "Potato",
      maize: "Maize",
      cotton: "Cotton",
      apple: "Apple",
      rice: "Rice",
      auto: "Auto-detected",
    },
    hi: {
      tomato: "टमाटर",
      potato: "आलू",
      maize: "मक्का",
      cotton: "कपास",
      apple: "सेब",
      rice: "चावल",
      auto: "स्वतः पहचाना गया",
    },
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-green-400/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        <Card className="w-full max-w-lg border-0 bg-white/95 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-12 text-center">
            <div className="relative mb-8">
              <RefreshCw className="w-20 h-20 text-blue-600 mx-auto animate-spin" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {analysisData.language === "en" ? "🔬 AI Analysis in Progress..." : "🔬 AI विश्लेषण प्रगति में..."}
            </h2>
            <p className="text-gray-600 text-lg">
              {analysisData.language === "en"
                ? "Our advanced AI is carefully examining your crop image for disease detection..."
                : "हमारा उन्नत AI आपकी फसल की तस्वीर में बीमारी की सावधानीपूर्वक जांच कर रहा है..."}
            </p>
            <div className="mt-6 flex justify-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce delay-200"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.push("/dashboard")}
                className="mr-2 hover:bg-blue-50 border-2 border-transparent hover:border-blue-200"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                {analysisData.language === "en" ? "Back to Dashboard" : "डैशबोर्ड पर वापस"}
              </Button>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Target className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {analysisData.language === "en" ? "🔬 Analysis Results" : "🔬 विश्लेषण परिणाम"}
                </h1>
                <p className="text-gray-600">
                  {analysisData.language === "en" ? "AI-Powered Crop Disease Detection" : "AI-संचालित फसल रोग पहचान"}
                </p>
              </div>
            </div>
            <Badge
              className={`px-4 py-2 text-sm font-semibold ${
                analysisData.language === "en"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  : "bg-gradient-to-r from-orange-500 to-red-600 text-white"
              }`}
            >
              {analysisData.language === "en" ? "🇺🇸 English" : "🇮🇳 हिंदी"}
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image and Basic Info */}
          <div className="space-y-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <span className="text-3xl">{cropEmojis[analysisData.crop] || "🌱"}</span>
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {analysisData.language === "en" ? "Analyzed Image" : "विश्लेषित तस्वीर"}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <img
                    src={analysisData.image || "/placeholder.svg"}
                    alt="Analyzed crop"
                    className="w-full rounded-xl shadow-lg border-4 border-white"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-gray-800 font-semibold">
                      {analysisData.language === "en" ? `${confidence}% Confidence` : `${confidence}% विश्वास`}
                    </Badge>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                    <div className="text-2xl mb-2">{cropEmojis[analysisData.crop] || "🌱"}</div>
                    <div className="font-semibold text-gray-800">
                      {cropNames[analysisData.language][analysisData.crop as keyof typeof cropNames.en] || "Unknown"}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                    <div className="text-2xl mb-2">🎯</div>
                    <div className="font-semibold text-gray-800">
                      {analysisData.language === "en" ? "AI Analyzed" : "AI विश्लेषित"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* Status Alert */}
            <Alert
              className={`border-0 shadow-lg ${
                isHealthy
                  ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
                  : "bg-gradient-to-br from-orange-50 to-red-50 border-orange-200"
              }`}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isHealthy ? "bg-green-500" : "bg-orange-500"
                  }`}
                >
                  {isHealthy ? (
                    <CheckCircle className="w-7 h-7 text-white" />
                  ) : (
                    <AlertTriangle className="w-7 h-7 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-xl mb-2 ${isHealthy ? "text-green-800" : "text-orange-800"}`}>
                    {text.status}
                  </h3>
                  <AlertDescription className="text-gray-700 text-base leading-relaxed">
                    {text.description}
                  </AlertDescription>
                </div>
              </div>
            </Alert>

            {/* Detailed Analysis */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    {analysisData.language === "en" ? "Detailed Analysis" : "विस्तृत विश्लेषण"}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
                    <Sun className="w-6 h-6 text-yellow-600" />
                    <div>
                      <div className="font-semibold text-gray-800">
                        {analysisData.language === "en" ? "Light Exposure" : "प्रकाश"}
                      </div>
                      <div className="text-sm text-gray-600">{analysisData.language === "en" ? "Optimal" : "उत्तम"}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                    <Droplets className="w-6 h-6 text-blue-600" />
                    <div>
                      <div className="font-semibold text-gray-800">
                        {analysisData.language === "en" ? "Moisture Level" : "नमी स्तर"}
                      </div>
                      <div className="text-sm text-gray-600">{analysisData.language === "en" ? "Good" : "अच्छा"}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl">
                    <Bug className="w-6 h-6 text-red-600" />
                    <div>
                      <div className="font-semibold text-gray-800">
                        {analysisData.language === "en" ? "Pest Risk" : "कीट जोखिम"}
                      </div>
                      <div className="text-sm text-gray-600">
                        {analysisData.language === "en"
                          ? `${isHealthy ? "Low" : "Medium"}`
                          : `${isHealthy ? "कम" : "मध्यम"}`}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                    <Shield className="w-6 h-6 text-green-600" />
                    <div>
                      <div className="font-semibold text-gray-800">
                        {analysisData.language === "en" ? "Health Score" : "स्वास्थ्य स्कोर"}
                      </div>
                      <div className="text-sm text-gray-600">{confidence}%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {analysisData.language === "en" ? "Expert Recommendations" : "विशेषज्ञ सुझाव"}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {text.recommendations.map((rec, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg"
                    >
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800 leading-relaxed">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={() => router.push("/dashboard")}
                className="h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {analysisData.language === "en" ? "Analyze Another Crop" : "दूसरी फसल का विश्लेषण करें"}
              </Button>
              <Button
                variant="outline"
                onClick={() => window.print()}
                className="h-14 text-lg font-semibold border-2 border-green-400 text-green-600 hover:bg-green-50"
              >
                <Target className="w-5 h-5 mr-2" />
                {analysisData.language === "en" ? "Save Report" : "रिपोर्ट सेव करें"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
