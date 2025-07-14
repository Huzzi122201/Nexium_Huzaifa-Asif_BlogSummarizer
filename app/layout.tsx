import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Blog Summarizer - AI-Powered Content Analysis',
  description: 'Transform lengthy blog posts into concise summaries with AI-powered translation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <div className="min-h-screen bg-[#0A0F1C] font-sans antialiased">
          <header className="relative border-b border-blue-900/20">
            <div className="container relative mx-auto px-4 py-14">
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent leading-relaxed pb-4">
                  AI Blog Summarizer
                </h1>
                <p className="text-lg md:text-xl text-blue-100/80 max-w-2xl">
                  Transform lengthy blog posts into concise summaries with{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-medium">
                    AI-powered translation
                  </span>
                </p>
              </div>
            </div>
          </header>

          <main className="container mx-auto px-4 py-8">
            {children}
          </main>

          <footer className="border-t border-blue-900/20">
            <div className="container mx-auto px-4 py-6 text-center text-sm text-blue-100/60">
              <p>© 2024 Blog Summarizer. Built with Next.js, ShadCN UI, Supabase, and MongoDB.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
} 