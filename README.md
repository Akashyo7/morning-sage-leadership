# 🌅 Morning Sage Leadership AI Agent

A VoltAgent-powered AI assistant designed to inspire and energize teams at the start of each day with wisdom, motivation, and curated music selections.

## ✨ Features

- **Daily Wisdom**: Inspirational quotes from Stoicism, Buddhism, Vadim Zeland, and Neville Goddard
- **Smart Music Curation**: 30-minute productivity playlists tailored to team needs
- **Personalized Experience**: Memory system to avoid repetitive content
- **Team-Focused**: Optimized for different team sizes and work types
- **Workflow Integration**: Structured morning motivation sessions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Groq API key (for Llama 3.3 70B model)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd morning-sage-leadership
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your API keys:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   VOLTAGENT_PUBLIC_KEY=your_voltagent_public_key
   VOLTAGENT_SECRET_KEY=your_voltagent_secret_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the agent**
   - Server: http://localhost:3141
   - Swagger UI: http://localhost:3141/ui
   - VoltOps Console: https://console.voltagent.dev

## 🎯 Usage Examples

### Getting Daily Motivation

**Simple Request:**
```
"Give me some morning motivation for my team of 5 developers"
```

**Detailed Request:**
```
"Create a morning session for 8 team members doing deep work. We need focused energy and some stoic wisdom. It's early morning and we're working on a complex problem-solving project."
```

### Using the Workflow

The agent includes a structured workflow for comprehensive morning sessions:

```json
{
  "teamSize": 6,
  "workType": "collaboration",
  "desiredMood": "energetic",
  "timeOfDay": "early_morning",
  "teamContext": "Product launch sprint",
  "philosophyPreference": "stoicism"
}
```

### Available Tools

1. **Motivational Quotes Tool**
   - Philosophy: stoicism, buddhism, vadim_zeland, neville_goddard, mixed
   - Mood: energetic, focused, calm, creative, motivational
   - Team context support

2. **Music Selection Tool**
   - Work types: deep_work, collaboration, brainstorming, routine_tasks, problem_solving
   - Time-aware recommendations
   - Team size optimization

## 🏗️ Architecture

```
src/
├── index.ts              # Main VoltAgent configuration
├── tools/
│   ├── index.ts          # Tool exports
│   ├── motivational-quotes.ts  # Wisdom generation
│   └── music-selection.ts      # Music curation
└── workflows/
    ├── index.ts          # Workflow exports
    └── morning-motivation.ts   # Structured sessions
```

## 🔧 Configuration

### Agent Settings

The agent is configured with:
- **Model**: Llama 3.3 70B Versatile (via Groq)
- **Memory**: LibSQL for conversation history
- **Server**: Hono-based HTTP server

### Customization

1. **Add New Philosophies**: Edit `src/tools/motivational-quotes.ts`
2. **Expand Music Collections**: Modify `src/tools/music-selection.ts`
3. **Create Custom Workflows**: Add to `src/workflows/`

## 🚀 Deployment

### Docker Deployment

```bash
# Build the image
docker build -t morning-sage-leadership .

# Run the container
docker run -p 3141:3141 --env-file .env morning-sage-leadership
```

### Production Environment

1. **Set production environment variables**
2. **Build the project**
   ```bash
   npm run build
   ```
3. **Start the production server**
   ```bash
   npm start
   ```

### Cloud Deployment Options

- **Railway**: Connect your GitHub repo for automatic deployments
- **Vercel**: Deploy with serverless functions
- **DigitalOcean**: Use App Platform for container deployment
- **AWS/GCP**: Deploy with container services

## 📊 Monitoring

Access the VoltOps Console at https://console.voltagent.dev to:
- Monitor agent performance
- View conversation logs
- Track workflow executions
- Analyze usage patterns

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details

## 🆘 Support

- **Documentation**: [VoltAgent Docs](https://docs.voltagent.dev)
- **Community**: [Discord Server](https://discord.gg/voltagent)
- **Issues**: GitHub Issues tab

## 🎨 Customization Ideas

- **Add new wisdom sources** (Marcus Aurelius, Rumi, etc.)
- **Integrate with Spotify API** for real playlists
- **Add team mood tracking** over time
- **Create seasonal motivation themes**
- **Implement team feedback loops**

---

*Built with ❤️ using [VoltAgent](https://voltagent.dev) - The future of AI agent development*