# TruthGuard × MongoDB

## Project Description
TruthGuard is an AI-powered platform for real-time media bias and misinformation detection, leveraging MongoDB's intelligent data platform and Google AI. It provides advanced tools to analyze news articles, detect bias patterns, assess misinformation risk, and deliver actionable insights to promote informed media consumption.

## Tech Stack and Dependencies
- **Framework:** Next.js (React, TypeScript)
- **Styling:** Tailwind CSS, Radix UI components
- **Data & AI:** MongoDB (Atlas Vector Search, Aggregation Pipeline, Change Streams), Google Generative AI (Gemini 1.5 Pro)
- **Visualization:** D3, Recharts
- **Other Libraries:** React Hook Form, Lucide React icons, Sonner, Date-fns, Embla Carousel, and more.

## Features

### Real-time Media Bias and Misinformation Detection
- AI-powered bias detection and sentiment analysis on news articles.
- Fact-checking and credibility scoring using advanced language models.
- Narrative framing and topic classification for comprehensive content understanding.

### Semantic Vector Search
- Search news articles using AI-generated embeddings for semantic similarity.
- Vector search integrated with MongoDB Atlas for intelligent content discovery.

### Dashboard
- Real-time analytics on bias distribution, threat levels, and source comparisons.
- Visualizations including bias heatmaps, threat assessments, and recent article analysis.
- System health monitoring for AI models and data pipelines.

### Content Analysis
- Deep analysis of user-provided text or URLs for bias, sentiment, fact-checking, and narrative detection.
- Advanced options to toggle specific analysis features.
- Detailed reports with recommended actions.

### Trend Analysis
- Track bias and misinformation trends over time with interactive visualizations.
- Topic clusters, source comparison matrices, narrative flow, and media landscape views.
- AI-generated insights and predictions on emerging narratives and misinformation risks.

### AI Chat Assistant
- Interactive chat interface powered by MongoDB Vector Search and Google AI.
- Real-time analysis, search, and educational insights on media bias and misinformation.
- Quick action buttons and example queries for ease of use.

### MongoDB Integration Showcase
- Demonstrates MongoDB features such as vector search, aggregation pipelines, change streams, and time series analysis.
- Live demos of semantic search and analytics dashboards.

## Usage

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Navigation Overview
- **Home:** Project overview and feature highlights.
- **Dashboard:** Real-time bias and misinformation analytics.
- **Search:** Semantic search of news articles with bias and risk filters.
- **Analyze:** Deep content analysis with AI-powered insights.
- **Trends:** Visualization of bias and misinformation trends.
- **AI Chat:** Interactive assistant for analysis and search.
- **MongoDB Demo:** Showcase of MongoDB's advanced data platform features.

## Folder Structure Overview
- `app/`: Next.js pages and API routes.
- `components/`: Reusable UI components and feature-specific components.
- `hooks/`: Custom React hooks.
- `lib/`: Utility functions.
- `public/`: Static assets like images and icons.
- `scripts/`: Backend scripts such as news scrapers.
- `styles/`: Global and component-specific styles.

## API Routes
- `/api/ai/analyze`: AI content analysis endpoint.
- `/api/mongodb-analytics`: Fetches analytics data from MongoDB.
- `/api/mongodb-vector`: Vector search API.
- `/api/news-scraper`: News scraping service.
- Additional APIs for real-time scraping, Google AI analysis, and MongoDB datasets.

## Contribution
Contributions are welcome! Please open issues or submit pull requests for bug fixes, features, or improvements.

## License
This project is private. Please contact the maintainer for licensing information.

---

Powered by MongoDB, Google AI, and Next.js.
