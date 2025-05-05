# 🧠 AI-Powered Media Playground – Development Kickstart (README.md)

**Version:** 1.0  
**Intended for:** Agile Dev Team + AI Agents  
**Style:** GitHub README | Optimized for AI Parsing & Prompt Engineering  
**Workflow:** Agile + Pair Programming + Test-Driven Development

---

## 🎯 Project Objective

You are building a **single-page TypeScript React application** that acts as a visually dynamic and responsive playground for **media-based AI APIs** (text, image, audio).

Your mission is to implement the **Zero2Launch AI API suite** with full interactivity and real-time rendering. This application will showcase the capabilities of AI media generation and analysis, providing an intuitive and beautiful user experience.

# Zero2Launch API Integration Documentation - EACH ENDPOINT IS A HARD REQUIREMENT

## Table of Contents
- [Available Endpoints](#available-endpoints)
- [Detailed Endpoint Documentation](#detailed-endpoint-documentation)
- [Implementation Guidelines](#implementation-guidelines)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)
- [Models/Schemas](#models)

## Available Endpoints

### 1. Audio Transcription
- **Direct File Upload**: `/generate-audio/transcribe-file`
- **URL-based Transcription**: `/generate-audio/transcribe-url`
- **List Available Voices**: `/generate-audio/voices`

### 2. Text Generation
- **Generate Text**: `/generate-text`
- **List Available Models**: `/generate-text/models`

### 3. Audio Generation
- **Generate Audio**: `/generate-audio/generate`
- **Generate Audio URL**: `/generate-audio/url/generate`

### 4. Image Generation
- **Download Image Data**: `/download-image/data`
- **Download Image URL**: `/download-image/url`

### 5. Image Analysis
- **Analyze Image**: `/analyze-image`

## Detailed Endpoint Documentation

### Text Generation

#### Generate Text
- **URL**: `/generate-text`
- **Method**: POST
- **Headers**:
  - X-API-Key: string (required)
  - X-Fields: string · mask (optional)
- **Body**: JSON with `messages` array and `model` field
  - `messages`: Array of message objects with 'role' and 'content'
  - `model`: string (default: "openai")
- **Response**: `{ "text": "generated_text" }`
- **Status Codes**:
  - 200: Success
  - 400: Bad Request - JSON parsing error or invalid request

#### List Available Text Models
- **URL**: `/generate-text/models`
- **Method**: GET
- **Response**: List of available text models
- **Status Codes**:
  - 200: Success

### Audio Processing

#### Audio Transcription

##### Transcribe Audio File
- **URL**: `/generate-audio/transcribe-file`
- **Method**: POST
- **Headers**:
  - X-API-Key: string (required)
  - X-Fields: string · mask (optional)
- **Body**: multipart/form-data with field `audio_file` (binary)
- **Description**: Transcribes an uploaded audio file (auto-detects format)
- **Response**: `{ "transcription": "text" }`
- **Status Codes**:
  - 200: Success
  - 400: Bad Request - Missing file, invalid format, or processing error
  - 415: Unsupported Media Type - Audio format not supported or detectable
  - 500: Transcription Failed

##### Transcribe Audio URL
- **URL**: `/generate-audio/transcribe-url`
- **Method**: POST
- **Headers**:
  - X-API-Key: string (required)
  - X-Fields: string · mask (optional)
- **Body**: JSON with field `audio_url` (string)
- **Description**: Transcribes audio from a URL (downloads, auto-detects format)
- **Response**: `{ "transcription": "text" }`
- **Status Codes**:
  - 200: Success
  - 400: Bad Request - Invalid URL or download failed
  - 415: Unsupported Media Type - Audio format not supported or detectable
  - 500: Transcription Failed

#### Audio Generation

##### Generate Audio
- **URL**: `/generate-audio/generate`
- **Method**: POST
- **Headers**:
  - X-API-Key: string (required)
- **Body**: JSON with `text`, `voice`, and optional `vibe` fields
  - `text`: string - Text to convert to speech
  - `voice`: string - Base voice (default: "alloy")
  - `vibe`: string - Optional vibe
- **Response**: Binary audio data
- **Status Codes**:
  - 200: Success

##### Generate Audio URL
- **URL**: `/generate-audio/url/generate`
- **Method**: POST
- **Headers**:
  - X-API-Key: string (required)
- **Body**: JSON with `text`, `voice`, and optional `vibe` fields
  - `text`: string - Text to convert to speech
  - `voice`: string - Base voice (default: "alloy")
  - `vibe`: string - Optional vibe
- **Response**: `{ "url": "audio_url" }`
- **Status Codes**:
  - 200: Success

##### List Available Voices
- **URL**: `/generate-audio/voices`
- **Method**: GET
- **Response**: Lists the available voice options for audio generation
- **Status Codes**:
  - 200: Success

### Image Processing

#### Image Generation

##### Download Image Data
- **URL**: `/download-image/data`
- **Method**: POST
- **Headers**:
  - X-API-Key: string (required)
- **Body**: JSON with fields:
  - `prompt`: string - Image description prompt
  - `width`: integer (default: 1024)
  - `height`: integer (default: 1024)
  - `seed`: integer (default: 42)
  - `model`: string (default: "flux")
- **Response**: Binary image data
- **Status Codes**:
  - 200: Success

##### Download Image URL
- **URL**: `/download-image/url`
- **Method**: POST
- **Headers**:
  - X-API-Key: string (required)
- **Body**: JSON with fields:
  - `prompt`: string - Image description prompt
  - `width`: integer (default: 1024)
  - `height`: integer (default: 1024)
  - `seed`: integer (default: 42)
  - `model`: string (default: "flux")
- **Response**: `{ "url": "image_url" }`
- **Status Codes**:
  - 200: Success

#### Image Analysis

##### Analyze Image
- **URL**: `/analyze-image`
- **Method**: POST
- **Headers**:
  - X-API-Key: string (required)
- **Body**: JSON with fields:
  - `model`: string (default: "openai")
  - `messages`: Array of OpenAI-style chat messages with image_url or base64
  - `max_tokens`: integer (default: 300)
  - `seed`: integer (optional)
- **Response**: `{ "result": "analysis_text" }`
- **Status Codes**:
  - 200: Success
  - 400: Bad Request
  - 500: Internal Server Error

## Implementation Guidelines

### 1. Client Configuration
```typescript
interface ClientConfig {
    apiKey: string;
    endpoint: string;
    timeout?: number;
}

interface RequestOptions {
    maxRetries?: number;
    onProgress?: (progress: number) => void;
}
```

### 2. Core Functions to Implement

#### Audio Processing
```typescript
interface AudioTranscriptionResult {
    transcription: string;
    error: boolean;
    errorMessage?: string;
}

interface AudioOptions {
    format?: string;
    quality?: number;
    maxDuration?: number;
}
```

#### Text Generation
```typescript
interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

interface TextGenerationOptions {
    model?: string;
    maxTokens?: number;
    temperature?: number;
}
```

```typescript
interface VoiceOptions {
    voice?: string;
    vibe?: string;
    format?: 'mp3' | 'wav';
}
```

### 3. Error Handling
Common status codes to handle:
- 400: Bad Request
- 413: Payload Too Large
- 415: Unsupported Media Type
- 429: Too Many Requests
- 500: Internal Server Error

### 4. Rate Limiting and Retries
Implement:
- Exponential backoff
- Request queuing
- Concurrent request limiting
- Request timeout handling

### 5. Implementation Example Structure
```typescript
class Zero2LaunchClient {
    constructor(config: ClientConfig);

    // Audio Methods
    async transcribeFile(file: Buffer, options?: AudioOptions): Promise<AudioTranscriptionResult>;
    async transcribeUrl(url: string, options?: AudioOptions): Promise<AudioTranscriptionResult>;
    
    // Text Methods
    async generateText(messages: Message[], options?: TextGenerationOptions): Promise<string>;
    
    // Audio Generation
    async generateAudio(text: string, options?: VoiceOptions): Promise<Buffer>;
    async generateAudioUrl(text: string, options?: VoiceOptions): Promise<string>;
    
    // Image Methods
    async generateImage(prompt: string, options?: ImageOptions): Promise<Buffer>;
    async generateImageUrl(prompt: string, options?: ImageOptions): Promise<string>;
    async analyzeImage(imageUrl: string, prompt: string, options?: AnalysisOptions): Promise<string>;
    
    // Utility Methods
    async validateAudioFormat(file: Buffer): Promise<boolean>;
    async checkApiStatus(): Promise<boolean>;
}
```

### 6. Best Practices
1. **Error Handling**
  - Implement comprehensive error handling
  - Provide detailed error messages
  - Log errors appropriately

2. **Performance**
  - Use connection pooling
  - Implement caching where appropriate
  - Handle large files efficiently

3. **Security**
  - Never expose API keys in client-side code
  - Validate input before sending to API
  - Implement request signing if required

4. **Monitoring**
  - Track API usage
  - Monitor rate limits
  - Log response times

## Models

### TextInput
- **messages**: object[] - A list of message objects with 'role' and 'content'
  - Default: `[{"role":"system","content":"You are a helpful assistant."},{"role":"user","content":""}]`
- **model**: string - Model name
  - Default: "openai"

### TextOutput
- **text**: string - Generated text (processed to remove specific keywords/links)

### AudioGenerationInput
- **text**: string - Text to convert to speech
- **voice**: string (enum) - Base voice
  - Default: "alloy"
  - Possible values: alloy, echo, fable, onyx, nova, shimmer, coral, verse, ballad, ash, sage, amuch, dan
- **vibe**: string (enum) - Optional vibe
  - Possible values: default, neutral, chill_surfer, calm, robot, dramatic, auctioneer, friendly, eternal_optimist, sincere, medieval_knight, noir_detective, cheerleader, bedtime_story, pirate, professional, sympathetic, gourmet_chef, cowboy, emo_teenager, santa, nyc_cabbie, old_timey, patient_teacher, sport_coach, mad_scientist, smooth_jazz_dj, true_crime_buff, fitness_instructor, connoisseur

### TranscriptionOutput
- **transcription**: string - The transcribed text

### AudioTranscriptionUrlInput
- **audio_url**: string - URL of the audio file to transcribe (format auto-detected)

### ImageInput
- **prompt**: string - Image description prompt
- **width**: integer - Image width
  - Default: 1024
- **height**: integer - Image height
  - Default: 1024
- **seed**: integer - Random seed
  - Default: 42
- **model**: string - Image generation model
  - Default: "flux"

---

## 🧩 Feature Modules

Implement the following **API playground components**, each in its own UI section:

### 1. 📄 Text Completion
- Input field (textarea)
- Model selector dropdown
- Button to send prompt
- Render markdown output
- Add "Regenerate" and "Copy" buttons

### 2. 🎙️ Audio Transcription
- Upload or paste URL (mp3)
- Model selector
- Simulated chunked transcript (MirageJS backend)
- Real-time updates with summaries
- Show progress loader with dynamic % and transcript UI blocks

### 3. 🔈 Audio Generation
- Input: Text
- Select: Voice and Vibe
- Render: Audio player
- Show fetch vs direct audio rendering modes
- Toggle "Preview" or "Download" options

### 4. 🧠 Image Analysis
- Upload or paste image URL
- Analyze button
- Render natural language semantic description
- Markdown-style output

### 5. 🎨 Image Generation
- Input: Text prompt
- Options: Style selector, aspect ratio, size
- Generate and render image preview (as base64 or URL)

### 6. ⚙️ API Model Explorer
- Model listing view (text, audio, image)
- Fetch and render models and their capabilities
- Filter by capability and endpoint
- Render descriptions in expandable cards

---

## ⚙️ Architecture Stack

- **Frontend:** React + TypeScript + Vite
- **Styling:** TailwindCSS + Radix UI
- **Routing:** React Router
- **Mocks:** MirageJS (for simulating chunked responses)
- **Testing:** Vitest + React Testing Library + Cypress

---

## ✅ Development Guidelines

- ✅ Use **TDD**: Write tests first, then code to pass the test
- ✅ Use **Pair Programming** (Buddy AI + Dev)
- ✅ Use **Feature Branches** and Pull Requests
- ✅ Use **Skeleton Loaders** during async fetches
- ✅ Modularize components by API domain

---

## 🧪 Test Strategy

- Unit tests for all components, hooks, and services
- Integration tests for simulated user workflows
- Snapshot tests for markdown/image/audio renderers
- MirageJS testing for chunked streaming simulation

---

## 🧠 Prompt for AI Coding Agents

```prompt
You are a senior React + TypeScript engineer working in an Agile team with pair programming and full TDD.
Build a Vite-based SPA that exposes multiple interactive panels, each corresponding to a Zero2Launch media API endpoint.
Mock audio streaming using MirageJS. Include model selectors, chunked output rendering, skeleton loaders, and markdown/audio/image display components.
Use TailwindCSS + Radix UI, and test with Vitest. Provide a beautiful developer-focused UX optimized for understanding AI outputs.
```

---

## 📁 File Structure (Suggestive)

```
/src
  /components
    /Text
    /Audio
    /Image
    /Shared
  /mocks
  /services
  /tests
  /styles
  App.tsx
  main.tsx
```

---

## 🚀 First Sprint Plan

- [ ] Set up Vite + TS + Tailwind + Radix UI base
- [ ] Create skeleton loader components
- [ ] Create Text Completion panel with markdown render
- [ ] Set up MirageJS for mocking transcription API
- [ ] Create global API service handler with error handling
- [ ] Write unit tests for input → response pipelines

---

## 🏁 Success Criteria

- 🧠 All APIs are interactable with real-time rendering
- 🔍 Code is modular, readable, and fully test-covered
- 💡 UX is intuitive for devs and AI researchers alike
- 📦 Build is lightweight and performance-optimized

---

## 📜 License & Contribution

MIT License – Fork and build your own playground. Contributions welcome.  
Use this document as an AI-ready prompt to generate an MVP incrementally.