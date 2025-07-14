'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Globe, BookOpen, Languages, Database, Check, AlertCircle, ExternalLink, Sparkles, Brain, Zap, ArrowRight, FileText, Lightbulb, Wand2, RotateCw } from 'lucide-react'

interface SummaryResult {
  id: number
  blog_url: string
  title: string
  summary_english: string
  summary_urdu: string
  created_at: string
  word_count: number
  author?: string
}

interface ProcessingStatus {
  step: string
  status: 'pending' | 'processing' | 'completed' | 'error'
  message?: string
}

export default function HomePage() {
  const [url, setUrl] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<SummaryResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [processingSteps, setProcessingSteps] = useState<ProcessingStatus[]>([])
  const [showUrduTranslation, setShowUrduTranslation] = useState(false)

  const initializeSteps = (): ProcessingStatus[] => [
    { step: 'Scraping blog content', status: 'pending' },
    { step: 'Generating AI summary', status: 'pending' },
    { step: 'Translating to Urdu', status: 'pending' }
  ]

  const updateStep = (stepIndex: number, status: ProcessingStatus['status'], message?: string) => {
    setProcessingSteps(prev => prev.map((step, index) => 
      index === stepIndex ? { ...step, status, message } : step
    ))
  }

  const validateUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url)
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
    } catch {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!url.trim()) {
      setError('Please enter a blog URL')
      return
    }

    if (!validateUrl(url)) {
      setError('Please enter a valid URL (must start with http:// or https://)')
      return
    }

    setError(null)
    setResult(null)
    setIsProcessing(true)
    setProcessingSteps(initializeSteps())

    try {
      // Step 1: Scraping
      updateStep(0, 'processing', 'Extracting content from blog...')
      
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      updateStep(0, 'completed', 'Content extracted successfully')
      updateStep(1, 'processing', 'Generating summary...')
      updateStep(2, 'processing', 'Translating to Urdu...')

      const data = await response.json()
      
      updateStep(1, 'completed', 'Summary generated')
      updateStep(2, 'completed', 'Translation completed')

      setResult(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
      
      // Mark current processing step as error
      const currentStepIndex = processingSteps.findIndex(step => step.status === 'processing')
      if (currentStepIndex !== -1) {
        updateStep(currentStepIndex, 'error', errorMessage)
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const getStepIcon = (status: ProcessingStatus['status']) => {
    switch (status) {
      case 'completed':
        return <Check className="w-4 h-4 text-green-500" />
      case 'processing':
        return <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
    }
  }

  // Animation variants for summary generation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        {/* Input Form */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gray-800/50 border border-gray-700 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Globe className="w-5 h-5" />
                Enter Blog URL
              </CardTitle>
              <CardDescription className="text-gray-400">
                Provide a valid blog URL to start the AI-powered analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-2">
                  <div className="relative flex-1 group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <Input
                      type="url"
                      placeholder="https://example.com/blog-post"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="relative bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                      disabled={isProcessing}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isProcessing}
                    className="relative group overflow-hidden bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center">
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Analyze
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </div>
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-400 text-sm flex items-center gap-2 bg-red-900/20 p-3 rounded-lg"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Processing Steps */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="bg-gray-800/50 border border-gray-700 backdrop-blur-lg overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-blue-400">Processing Status</CardTitle>
                  <CardDescription className="text-gray-400">
                    Watch the AI analyze your content in real-time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {processingSteps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.2 }}
                        className="flex items-center gap-3 bg-gray-900/50 p-4 rounded-lg border border-gray-700"
                      >
                        <div className="relative">
                          {step.status === 'processing' && (
                            <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping"></div>
                          )}
                          {getStepIcon(step.status)}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-200">{step.step}</div>
                          {step.message && (
                            <div className="text-sm text-gray-400">{step.message}</div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Blog Information */}
              <motion.div 
                variants={itemVariants}
                transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
              >
                <Card className="bg-gray-800/50 border border-gray-700 backdrop-blur-lg transform transition-all duration-300 hover:scale-[1.02]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-400">
                      <div className="relative">
                        <Globe className="w-5 h-5" />
                        <motion.div
                          className="absolute -inset-1 bg-blue-500/20 rounded-full"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.2, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity
                          }}
                        />
                      </div>
                      Blog Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                        <h4 className="font-medium text-gray-300">Title</h4>
                        <p className="text-gray-400">{result.title}</p>
                      </div>
                      <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                        <h4 className="font-medium text-gray-300">Source</h4>
                        <a 
                          href={result.blog_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 flex items-center gap-1 group"
                        >
                          {result.blog_url}
                          <ExternalLink className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                        </a>
                      </div>
                      {result.author && (
                        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                          <h4 className="font-medium text-gray-300">Author</h4>
                          <p className="text-gray-400">{result.author}</p>
                        </div>
                      )}
                      <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                        <h4 className="font-medium text-gray-300">Word Count</h4>
                        <p className="text-gray-400">{result.word_count} words</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* English Summary */}
              <motion.div 
                variants={itemVariants}
                transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
              >
                <Card className="bg-gray-800/50 border border-gray-700 backdrop-blur-lg transform transition-all duration-300 hover:scale-[1.02]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-400">
                      <div className="relative">
                        <Brain className="w-5 h-5" />
                        <motion.div
                          className="absolute -inset-2 bg-purple-500/20 rounded-full"
                          animate={{
                            rotate: [0, 360],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        AI Summary
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.7, 1]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity
                          }}
                        >
                          <Sparkles className="w-4 h-4 text-yellow-400" />
                        </motion.div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 overflow-hidden"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <motion.div
                            animate={{
                              rotate: [0, 360]
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          >
                            <Wand2 className="w-5 h-5 text-purple-400" />
                          </motion.div>
                        </div>
                        <div className="flex-1 space-y-4">
                          <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                            {result.summary_english}
                          </p>
                          
                          {/* Urdu Translation Section */}
                          <div className="mt-4 pt-4 border-t border-gray-700">
                            <div 
                              onClick={() => setShowUrduTranslation(!showUrduTranslation)}
                              className="flex items-center gap-2 text-green-400 cursor-pointer group mb-2"
                            >
                              <Languages className="w-4 h-4" />
                              <span className="text-sm font-medium group-hover:text-green-300">
                                {showUrduTranslation ? 'Hide' : 'Click to view'} Urdu translation
                              </span>
                              <motion.div
                                animate={{
                                  rotate: showUrduTranslation ? 180 : 0
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                <ArrowRight className="w-4 h-4" />
                              </motion.div>
                            </div>
                            <AnimatePresence>
                              {showUrduTranslation ? (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <p className="text-gray-300 text-right whitespace-pre-wrap leading-relaxed" dir="rtl" lang="ur">
                                    {result.summary_urdu}
                                  </p>
                                </motion.div>
                              ) : (
                                <motion.div
                                  initial={{ height: "auto", opacity: 1 }}
                                  animate={{ height: "auto", opacity: 0.7 }}
                                  className="overflow-hidden"
                                >
                                  <p className="text-gray-400 text-right" dir="rtl" lang="ur">
                                    {result.summary_urdu.split(' ').slice(0, 15).join(' ')}...
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gray-800/50 border border-gray-700 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-blue-400">AI-Powered Features</CardTitle>
              <CardDescription className="text-gray-400">
                Experience the power of artificial intelligence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                  <div className="relative bg-gray-900 p-6 rounded-lg border border-gray-700 transform transition-all duration-300 hover:-translate-y-1">
                    <Globe className="w-8 h-8 mb-4 text-blue-400" />
                    <h3 className="font-medium text-gray-200 mb-2">Smart Scraping</h3>
                    <p className="text-sm text-gray-400">
                      Advanced content extraction from any blog URL
                    </p>
                  </div>
                </div>
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                  <div className="relative bg-gray-900 p-6 rounded-lg border border-gray-700 transform transition-all duration-300 hover:-translate-y-1">
                    <Brain className="w-8 h-8 mb-4 text-purple-400" />
                    <h3 className="font-medium text-gray-200 mb-2">AI Summary</h3>
                    <p className="text-sm text-gray-400">
                      Neural-powered content summarization
                    </p>
                  </div>
                </div>
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                  <div className="relative bg-gray-900 p-6 rounded-lg border border-gray-700 transform transition-all duration-300 hover:-translate-y-1">
                    <Zap className="w-8 h-8 mb-4 text-yellow-400" />
                    <h3 className="font-medium text-gray-200 mb-2">Neural Translation</h3>
                    <p className="text-sm text-gray-400">
                      Advanced Urdu translation engine
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
} 