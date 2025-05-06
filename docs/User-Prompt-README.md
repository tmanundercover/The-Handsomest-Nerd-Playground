# Open AI  API Integration - React Application Design

## Overview

Single-page React + TypeScript web application integrating Open AI API endpoints with MirageJS backend simulation.

## Functional Requirements

### Dynamic Input Interface

- Intuitive form-based UI elements
- Sliders, dropdowns, textareas, file inputs for parameter collection

### Text Generation

- Support message thread building (system/user/assistant)
- Model selection
- Markdown result rendering

### Audio Transcription

- Chunked file handling simulation
- Speaker parsing (Speaker 1 by name, Speaker 2 by name, etc.)
- Live conversation summary updates

### Audio Generation

- Text input interface
- Voice/vibe selection
- Audio playback integration

### Image Capabilities

- **Generation:**
    - Prompt-based creation
    - Data/URL modes
    - Width/height/model/seed controls
- **Analysis:**
    - URL/upload support
    - Prompt-based analysis
    - Paragraph + raw JSON display

### Input/Output Display

- Styled audio players
- Image viewers
- Markdown renderers
- Collapsible JSON views

## UX/UI Requirements

### Styling & Animation

- Tailwind CSS implementation
- Framer Motion animations
- Dark theme with vibrant accents
- shadcn/ui component integration

### Layout & Responsiveness

- Section-based navigation (tabs/accordions)
- Animated skeleton loaders
- Query history sidebar
- Replayable previous outputs

## Technical Requirements

### Core Stack

- React + TypeScript
- Zustand state management
- MirageJS backend mocking for chunked audio operations
- Firebase v2 Functions backend stubbed out from mocked backend
- Firebase v2 Functions backend for all other endpoints
- Firestore for data persistence
- Firebase Hosting & Functions for deployment

# Client Implementation

- OpenAIClient class
    - Type-safe interfaces
    - Error handling
    - Retry logic
    - API key security

# OpenAI API Integration Documentation - EACH ENDPOINT IS A HARD REQUIREMENT

## Table of Contents
1. Available Endpoints
2. Detailed Endpoint Documentation
3. Implementation Guidelines
4. Error Handling
5. Best Practices
6. Models/Schemas

---

## Available Endpoints

### 1. Audio Transcription (Whisper)
- **Direct File Upload**: `/v1/audio/transcriptions`
- **URL-based Transcription**: (Custom implementation required via file fetch + POST)
- **List Available Voices**: (See TTS voices: `/v1/audio/speech options`)

### 2. Text Generation (Chat/Completion)
- **Generate Chat Completion**: `/v1/chat/completions`
- **List Available Models**: `/v1/models`

### 3. Audio Generation (Text-to-Speech)
- **Generate Audio**: `/v1/audio/speech`
- **Generate Audio URL**: (Host returned audio yourself after receiving binary)

### 4. Image Generation (DALL·E)
- **Download Image Data**: `/v1/images/generations`
- **Download Image URL**: (Same endpoint, returns URLs)

### 5. Image Analysis (GPT-4 Vision)
- **Analyze Image**: `/v1/chat/completions` (GPT-4-turbo with image content)

### 6. Application Endpoints – Creative Use Cases (Built from primitives)
- Chunked Audio Transcription from file
- Chunked Audio Transcription from URL
- Live Audio Transcription (not available in OpenAI API natively)
- Conversationlizer – Segment speakers from transcript using GPT
- Summarizer – Use GPT to summarize transcripts
- Emoji Gallery – Use GPT + DALL·E to generate emoji inspiration and then generate SVG emojis
- Speaking Part Extractor + Summary from Conversation

---

## Detailed Endpoint Documentation

### Text Generation

#### Generate Chat Completion
- **URL**: `/v1/chat/completions`
- **Method**: POST
- **Headers**:
  - Authorization: `Bearer <API_KEY>`
  - Content-Type: `application/json`
- **Body**:
  ```json
  {
    "model": "gpt-4-turbo",
    "messages": [
      { "role": "user", "content": "Summarize this transcript..." }
    ],
    "temperature": 0.7,
    "max_tokens": 500
  }
- **Response**:
  ```json
  {
    "choices": [{ "message": { "content": "summary..." } }]
  }
  ```
- **Status Codes**:
  - 200: Success
  - 400/401/429/500: Standard OpenAI errors

#### List Available Models
- **URL**: `/v1/models`
- **Method**: GET
- **Response**: Array of available models
- **Status Codes**: 200

---

### Audio Processing

#### Transcribe Audio File (Whisper)
- **URL**: `/v1/audio/transcriptions`
- **Method**: POST
- **Headers**:
  - Authorization: `Bearer <API_KEY>`
- **Body**: `multipart/form-data` with field `file` and `model=whisper-1`
- **Response**:
  ```json
  { "text": "transcribed text" }
  ```

---

### Audio Generation

#### Generate Audio (Text-to-Speech)
- **URL**: `/v1/audio/speech`
- **Method**: POST
- **Body**:
  ```json
  {
    "model": "tts-1",
    "input": "Your text here",
    "voice": "nova",
    "response_format": "mp3"
  }
  ```
- **Response**: Binary audio
- **Voices Available**: alloy, echo, fable, onyx, nova, shimmer

---

### Image Processing

#### Generate Image (DALL·E)
- **URL**: `/v1/images/generations`
- **Method**: POST
- **Body**:
  ```json
  {
    "prompt": "A futuristic cityscape at sunset",
    "n": 1,
    "size": "1024x1024"
  }
  ```
- **Response**:
  ```json
  { "data": [{ "url": "https://..." }] }
  ```

#### Analyze Image (GPT-4 Vision)
- **URL**: `/v1/chat/completions`
- **Model**: `gpt-4-vision-preview`
- **Body**:
  ```json
  {
    "model": "gpt-4-vision-preview",
    "messages": [
      {
        "role": "user",
        "content": [
          { "type": "text", "text": "What's in this image?" },
          { "type": "image_url", "image_url": { "url": "https://..." } }
        ]
      }
    ],
    "max_tokens": 500
  }
  ```

---

## Implementation Guidelines

### 1. Client Configuration
```typescript
interface OpenAIConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
}
```

### 2. Core Functions to Implement

#### Chat Completion
```typescript
interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}
interface CompletionOptions {
  model?: string;
  temperature?: number;
  max_tokens?: number;
}
```

#### Audio Handling
```typescript
interface AudioTranscriptionResult {
  text: string;
}
interface TTSOptions {
  voice?: string;
  format?: 'mp3' | 'wav';
}
```

#### Image Generation
```typescript
interface ImageOptions {
  prompt: string;
  size?: "256x256" | "512x512" | "1024x1024";
}
```

---

### 3. Error Handling
- Common status codes to handle:
  - 400: Malformed request
  - 401: Unauthorized (Invalid token)
  - 413: Payload Too Large
  - 429: Rate limit exceeded
  - 500: Internal error

---

### 4. Rate Limiting and Retries
- Implement:
  - Exponential backoff
  - Retry-after header parsing
  - Request timeouts and queuing

---

## Implementation Example Structure
```typescript
class OpenAIClient {
  constructor(config: OpenAIConfig) { /* store config */ }

  async chat(messages: ChatMessage[], options?: CompletionOptions): Promise<string> { /* call /chat/completions */ }

  async transcribe(file: Buffer): Promise<AudioTranscriptionResult> { /* call /audio/transcriptions */ }

  async speak(text: string, options?: TTSOptions): Promise<Buffer> { /* call /audio/speech */ }

  async generateImage(prompt: string, options?: ImageOptions): Promise<string[]> { /* call /images/generations */ }

  async analyzeImage(imageUrl: string): Promise<string> { /* call /chat/completions with image */ }
}
```

---

## Best Practices

### Error Handling
- Provide clear feedback to user-facing apps
- Use logs to capture full response metadata

### Performance
- Cache model lists
- Preprocess input (e.g., compress images/audio)

### Security
- Store API keys securely
- Sanitize and validate input

### Monitoring
- Log usage by endpoint
- Respect rate limits via Retry-After

---

## Models/Schemas

### Models (Chat & Vision)
- gpt-4, gpt-4-32k, gpt-4-turbo, gpt-3.5-turbo
- gpt-4-vision-preview

### Audio
- whisper-1 (transcription)
- tts-1, tts-1-hd (speech)

### Image
- dall-e-3, dall-e-2

---

# 🧠 OpenAI TypeScript Starter Client

```typescript
// openai-client.ts

import axios, { AxiosInstance } from 'axios';

interface ClientConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
}

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface TextGenerationOptions {
  model?: string;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

interface AudioTranscriptionResult {
  text: string;
}

interface AudioOptions {
  model?: string;
  language?: string;
  prompt?: string;
  temperature?: number;
}

interface VoiceOptions {
  voice?: string; // e.g. "alloy", "echo", "nova", etc.
}

interface ImageOptions {
  prompt: string;
  n?: number;
  size?: '256x256' | '512x512' | '1024x1024';
  response_format?: 'url' | 'b64_json';
}

interface AnalysisOptions {
  messages: Message[];
  model?: string;
  max_tokens?: number;
}

export class OpenAIClient {
  private client: AxiosInstance;
  private apiKey: string;

  constructor(config: ClientConfig) {
    this.apiKey = config.apiKey;
    this.client = axios.create({
      baseURL: config.baseUrl ?? 'https://api.openai.com/v1',
      timeout: config.timeout ?? 15000,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  // 1. Chat Completion
  async generateText(messages: Message[], options?: TextGenerationOptions): Promise<string> {
    const model = options?.model ?? 'gpt-4';
    const response = await this.client.post('/chat/completions', {
      model,
      messages,
      temperature: options?.temperature ?? 1,
      max_tokens: options?.max_tokens ?? 500,
      stream: options?.stream ?? false,
    });

    return response.data.choices[0].message.content;
  }

  // 2. Transcribe Audio File
  async transcribeAudio(file: Buffer, filename = 'audio.mp3', options?: AudioOptions): Promise<AudioTranscriptionResult> {
    const form = new FormData();
    form.append('file', file, filename);
    form.append('model', options?.model ?? 'whisper-1');

    const response = await this.client.post('/audio/transcriptions', form, {
      headers: {
        ...form.getHeaders(),
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    return response.data;
  }

  // 3. Generate Audio (Text-to-Speech)
  async generateAudio(text: string, options?: VoiceOptions): Promise<Buffer> {
    const response = await this.client.post('/audio/speech', {
      model: 'tts-1',
      input: text,
      voice: options?.voice ?? 'alloy',
    }, {
      responseType: 'arraybuffer',
    });

    return Buffer.from(response.data);
  }

  // 4. Generate Image
  async generateImage(options: ImageOptions): Promise<string[]> {
    const response = await this.client.post('/images/generations', {
      prompt: options.prompt,
      n: options.n ?? 1,
      size: options.size ?? '1024x1024',
      response_format: options.response_format ?? 'url',
    });

    return response.data.data.map((img: any) => img.url || img.b64_json);
  }

  // 5. Analyze Image (Vision model)
  async analyzeImage(imageUrl: string, prompt: string, options?: AnalysisOptions): Promise<string> {
    const model = options?.model ?? 'gpt-4-vision-preview';
    const messages = [
      { role: 'system', content: 'You are a helpful assistant.' },
      {
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          { type: 'image_url', image_url: { url: imageUrl } },
        ],
      },
    ];

    const response = await this.client.post('/chat/completions', {
      model,
      messages,
      max_tokens: options?.max_tokens ?? 300,
    });

    return response.data.choices[0].message.content;
  }
}
```

### Utilities

- Audio format validation (mp3, wav, m4a)
- Image preview handling (thumbnail generation, lazy loading)
- Transcription streaming with progress indicators
- Download functionality for generated assets
- Rate limiting and retry utilities
- Error boundary wrappers
- Data persistence helpers
- Response caching layer
- Type validation guards
- Prompt template management

## Deliverables

1. OpenAIClient implementation
  - Core API integration
  - Type-safe interfaces
  - Error handling
  - Retry logic
  - Rate limiting

2. UI components
  - Form elements
  - Media players
  - Image viewers
  - Markdown renderers
  - Loading states
  - Error boundaries

3. MirageJS server configuration
  - Route handlers
  - Mock data generation
  - Response delays
  - Error simulation

4. Tailwind setup
  - Custom theme
  - Dark mode
  - Animation classes
  - Component styles
  - Responsive utilities

5. Mock response data
  - Chat completions
  - Audio transcriptions
  - Generated images
  - Analysis results
  - Error states

