# Blog Summarizer

A powerful web application that scrapes blog content, generates AI summaries, translates to Urdu, and stores data in dual databases (Supabase and MongoDB).

## Features

- 🌐 **Web Scraping**: Extract content from any blog URL using advanced scraping techniques
- 🤖 **AI Summarization**: Generate intelligent summaries using static AI logic simulation
- 🌍 **Urdu Translation**: Translate summaries to Urdu using a comprehensive JavaScript dictionary
- 💾 **Dual Storage**: Save summaries in Supabase and full content in MongoDB
- 🎨 **Modern UI**: Beautiful, responsive interface built with ShadCN UI components
- ⚡ **Real-time Progress**: Track processing steps with live status updates

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **UI Components**: ShadCN UI, Radix UI, Lucide React Icons
- **Backend**: Next.js API Routes
- **Databases**: Supabase (PostgreSQL), MongoDB
- **Scraping**: Cheerio, Axios
- **Deployment**: Vercel (recommended)

## Prerequisites

Before running this application, make sure you have:

1. **Node.js** (v18 or higher)
2. **npm** or **yarn** package manager
3. **Supabase account** and project
4. **MongoDB Atlas account** (or local MongoDB instance)

## Tech Stack
-Demo:[https://nexium-huzaifa-asif-blog-summarizer-16vbrvh1i.vercel.app/](https://nexium-huzaifa-asif-blog-summarizer-16vbrvh1i.vercel.app/)

## Environment Variables



## Database Setup

### Supabase Setup

1. Create a new project on [Supabase](https://supabase.com)
2. Go to the SQL Editor and run the following schema:


## Installation

1. **Clone the repository** (or use the code from assignment-2/ directory)

```bash
git clone <repository-url>
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

 `.env.local` and fill in your database credentials.

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Enter a Blog URL**: Paste any blog URL into the input field
2. **Click Summarize**: The application will process your request through four steps:
   - Scraping blog content
   - Generating AI summary
   - Translating to Urdu
   - Saving to databases
3. **View Results**: See the original content info, English summary, Urdu translation, and database storage confirmation


### GET /api/summarize

Returns API information and usage instructions.

## Deployment on Vercel

1. **Install Vercel CLI** (optional)

```bash
npm i -g vercel
```

2. **Deploy using Vercel Dashboard**

   - Connect your GitHub repository to Vercel
   - Add environment variables in the Vercel dashboard
   - Deploy automatically on push

3. **Or deploy using CLI**

```bash
vercel --prod
```

4. **Set up environment variables in Vercel**

   Go to your project settings in Vercel and add all the environment variables from your `.env.local` file.


## Features Deep Dive

### Web Scraping
- Supports multiple blog platforms and content structures
- Robust content extraction with fallback selectors
- Extracts title, content, author, and publication date
- Handles various HTML structures and edge cases

### AI Summarization
- Uses sentence scoring algorithm based on position, keywords, and content
- Identifies important sentences using keyword analysis
- Maintains original context and meaning
- Configurable summary length and quality

### Urdu Translation
- Comprehensive English-to-Urdu dictionary with 1000+ words
- Handles common sentence structures and grammar patterns
- Supports technical and blog-related terminology
- Graceful handling of untranslated words

### Database Strategy
- **Supabase**: Stores summaries, metadata, and searchable content
- **MongoDB**: Archives full content for backup and analysis
- Cross-referencing between databases for data integrity
- Optimized for both read and write operations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the API documentation

---

**Built with ❤️ using Next.js, ShadCN UI, Supabase, and MongoDB** 
