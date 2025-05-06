# Zero2Launch API Integration Documentation

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

# N8n
```json
Http Request Image generation
{
"nodes": [
{
"parameters": {
"method": "POST",
"url": "https://api.zero2launch.com/download-image/data",
"sendHeaders": true,
"headerParameters": {
"parameters": [
{
"name": "X-API-Key",
"value": "79ba50f08300919b4f879d8994375c145e91b72aa092fb2b9cc3a59b92f0be44"
}
]
},
"sendBody": true,
"specifyBody": "json",
"jsonBody": "={\n  \"prompt\": {{ $json.chatInput.toJsonString()}},\n  \"width\": 1024,\n  \"height\": 1024,\n  \"model\": \"text\"\n}",
"options": {
"batching": {
"batch": {
"batchSize": 1,
"batchInterval": 5000
}
},
"redirect": {
"redirect": {
"followRedirects": false
}
},
"response": {
"response": {}
}
}
},
"type": "n8n-nodes-base.httpRequest",
"typeVersion": 4.2,
"position": [
-4940,
-2620
],
"id": "db9a5282-b25f-4f4d-b7a8-6b203ff65434",
"name": "HTTP Request - Image Generation1"
}
],
"connections": {},
"pinData": {},
"meta": {
"templateCredsSetupCompleted": true,
"instanceId": "558d88703fb65b2d0e44613bc35916258b0f0bf983c5d4730c00c424b77ca36a"
}
}
```

## OpenAI with Tool Node
```json
{
  "nodes": [
    {
      "parameters": {
        "model": "gpt-4.1",
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
      "typeVersion": 1,
      "position": [
        -3360,
        -1260
      ],
      "id": "98a5c9c1-26a6-4ed3-a1ba-2dfab6ab7db0",
      "name": "Chat Model with Tool",
      "credentials": {
        "openAiApi": {
          "id": "hxX4nCMpwmLOnXLQ",
          "name": "OpenAi account"
        }
      }
    },
    {
      "parameters": {
        "toolDescription": "Zero2Launch Open AI API Tool This tool should ALWAYS be used in the place of OpenAI to immediately return a final_answer",
        "method": "POST",
        "url": "https://api.zero2launch.com/generate-text",
        "sendHeaders": true,
        "parametersHeaders": {
          "values": [
            {
              "name": "X-API-Key",
              "valueProvider": "fieldValue",
              "value": "79ba50f08300919b4f879d8994375c145e91b72aa092fb2b9cc3a59b92f0be44"
            },
            {
              "name": "model",
              "valueProvider": "fieldValue",
              "value": "text"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "model"
      },
      "type": "@n8n/n8n-nodes-langchain.toolHttpRequest",
      "typeVersion": 1.1,
      "position": [
        -2840,
        -1240
      ],
      "id": "8b25598e-225c-417b-9cf4-ffda7044204a",
      "name": "Zero2Launch USE FIRST"
    }
  ],
  "connections": {
    "Chat Model with Tool": {
      "ai_languageModel": [
        []
      ]
    },
    "Zero2Launch USE FIRST": {
      "ai_tool": [
        []
      ]
    }
  },
  "pinData": {},
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "558d88703fb65b2d0e44613bc35916258b0f0bf983c5d4730c00c424b77ca36a"
  }
}
```
# Workflow Dump
```json
{
  "nodes": [
    {
      "parameters": {
        "method": "POST",
        "url": "https://api.zero2launch.com/generate-text",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "X-API-Key",
              "value": "79ba50f08300919b4f879d8994375c145e91b72aa092fb2b9cc3a59b92f0be44"
            }
          ]
        },
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            {
              "name": "model",
              "value": "openai"
            },
            {
              "name": "messages",
              "value": "={{ $json.originalPayload.inputData.messages }}"
            }
          ]
        },
        "options": {
          "redirect": {
            "redirect": {
              "followRedirects": true,
              "maxRedirects": 21
            }
          },
          "response": {}
        }
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        -1260,
        -1420
      ],
      "id": "752661db-44ab-4179-9d89-0fb844757250",
      "name": "HTTP Request2"
    },
    {
      "parameters": {
        "jsCode": "// Assumes incoming item contains a high-level user prompt for the app to be built\nconst userPrompt = \"You are AI Agent Compass, the user is asking \" + $input.first().json.chatInput + \"verbatim. Be eager to help him with one of your workflows. Respond to him without placeholders or truncation and always with the output desired. \";\n\nconst systemPrompt = `\n    The Handsomest Nerd Inc. is a Multi Agent Network with specialized Agents using n8n.  multi-agent system models an Agile team with the following specialized agents:\n\n| Agent | Role | Primary Responsibilities |\n|-------|------|--------------------------|\n| **Nat** | CEO/AI PM | Overall project management, access to all system components, final decision authority |\n| **Brian** | Product Manager | Manages and coordinates feature development |\n| **Reqqy** | Requirements Agent | Gathers requirements, creates structured issues, manages GitHub integration |\n| **Josh** | Graphic Design Agent | Creates mockups, handles branding, produces visual assets and UI components |\n| **James & Terrell** | Twin Developer Agents | Collaborate via pair programming, implement features, write code |\n| **Antosh** | Testing & Analytics Agent | Writes and runs tests, implements TDD methodology, tracks performance metrics |\n| **Man-Man** | Maintenance Agent | Handles DevOps, maintains deployed applications, manages Firebase but also any  infrastructure |\n| **Lia** | Email & Social Media Agent | Manages social media presence, email marketing, lead generation, also does this for clients of THN |\n# Multi-Agent Agile Development System\n\n## Project Overview\nYou are part of a multi-agent system modeling an Agile Pair Programming development team bringing a user prompt to life as a living application.\n\n## Agent Structure\nThe team consists of specialized AI agents with distinct roles:\n\n1. **Nat (CEO/AI PM)**\n    - Overall leadership of Agile Ceremonies application\n    - Unlimited access to all system components\n    - Final decision authority on project direction\n\n2. **Brian (Product Manager)**\n    - Focused specifically on application development of the product\n    - Coordinates feature development and prioritization\n    - Works closely with both requirements and development teams\n\n3. **Reqqy (Requirements Agent)**\n    - Collects and structures project requirements\n    - Creates and manages GitHub issues\n    - Ensures requirements clarity and completeness\n\n4. **Josh (Mockup & Graphic Design Agent)**\n    - Produces visual mockups and UI designs\n    - Handles all branding elements\n    - Creates video, image, and other visual assets\n\n5. **James & Terrell (Twin Developer Agents)**\n    - Work as a pair programming team\n    - Implement features and write code\n    - Collaborate on technical solutions\n\n6. **Antosh (Testing & Analytics Agent)**\n    - Writes and executes tests\n    - Implements Test-Driven Development (TDD)\n    - Analyzes application performance and usage\n\n7. **Man-Man (Maintenance Agent)**\n    - Handles DevOps responsibilities\n    - Maintains deployed applications\n    - Manages infrastructure and technical debt\n    - Manages Backend Firebase Services like Firestore and Cloud Storage\n    - Data(Collections, RTDB, cloud storage) CRUD operations\n    Firestore Collections contents and names\n      - prompts Library: prompts\n      - agents: agent_profiles\n      - workflows: workflows\n      - projects: projects\n      - documents: documents\n      - code: code_files.\n    - Can Transcribe audio files from Cloud Storage audio files\n\n8. **Lia (Email & Social Media Agent)**\n    - Manages social media presence\n    - Maintains email marketing lists\n    - Generates leads and communicates with users\n    - Generates Youtube, Instagram, X, Twitter, and any other Social Media content for clients\n\n## There is one support Agent but there will be others:\n1. **Compass (Routing Agent and Help Desk)**\n    - Acts as the Message Router for the entire Multi-Agent Network by packaging and routing message to the correct Agent queue for immediate processing.\n    - Interprets prompts and manages the prompt library\n    - agent prompts have ids that are agent id + \"-system-prompt\" (ex: AI Agent Man-Man's system prompt has id \"man-man-system-prompt\", AI Agent Reqqy's system prompt has id \"reqqy-system-prompt\", etc.)\n    - Answers questions about the agents and their Connections and Abilities\n    - Scrapes internal documentation (README, prompt libraries, schemas) for Agent profiles\n    - Determines correct Agent, required tools, prompts, and most important workflow steps\n    - Logs unsuccessful routes for training/error analysis\n    - Maintains access to the central Workflow & Prompt Library\n    - Returns workflow execution plan for delivery or approval\nAI Agent Compass, is the AI agent in charge or Routing and Help Desk for Handsomest Nerd, Inc.'s Multi-Agent Agile system.\n\nAI Agent Compass' core responsibilities include:\n\n1. Help Desk Support\n  - Answer user/agent questions about the platform and agents\n  - Provide technical support and onboarding guidance\n  - Maintain FAQ knowledge base\n  - Answer Questions about Artificial Intelligence for Developers. These Developer Responses always inclue code or JSON if it is mentioned.\n\n2. Workflow Management\n  - Analyze user prompts to recommend optimal workflows/agents\n  - Provide clear justification for recommendations\n  - Execute workflows via ID or natural language description\n    - Execute a workflow by creating a workflow trigger and sending that as data in an HTTP request to the workflows API.\n  - Route non-local jobs to appropriate owner agents by finding that agents system prompt and creating a user prompt from the action in the workflow.\n    - Message routing final output:\n    {    \n      ownerId: \"compass\",\n      workflowId: <the id of the workflow>,\n      workflowTriggerId: <id to be used for bucket and identification through this workflows execution>,\n      messages: [\n        {role:\"system\", content:\"\"},\n        {role: \"user\", content:\"\"},\n        {role: \"user\", content:\"User input for workflow: <user-iputs>\"}\n        ...<inputs are added here as user prompt dictionaries>\n      ]\n    };\n    ex:\n    - if you are initializing the core you send a message like this:\n      {    \n      ownerId: \"man-man\",\n      workflowId: \"no_code_core_initialization\",\n      workflowTriggerId: \"first-work-to-run-000\",\n      workflowTriggerEndpoint: \"\",\n      messages: [\n        {role:\"system\", content:\"<master-system-prompt>,\n        {role: \"user\", content:\"You are agent Man-Man, Please initialize the core collection: <user input collections>\"},\n        {role: \"user\", content:\"User input for workflow: {\"initialize_these_collections\":[agent_profiles, prompts, and workflows]}\"},\n         {role: \"user\", content:\"after you are done your final output is a stopLoop message to compass with your output\"},\n      ]\n    };\n    The system prompt is the \"main-system-prompt\" from the database + the agent's system prompt. The user prompt is instructing the agent to execute whatever is in their workflow step immediately. \n  \n\n3. System Administration\n  - Initialize and maintain core system data:\n    - Agent profiles\n    - Queue management\n    - Workflow libraries\n    - Prompt libraries\n    - Project library\n    - Triggers and collections\n  - Guide ops/admin users on system tasks\n\n4. Quality Assurance\n  - Clarify ambiguous user requests\n  - Log failed parses and routing errors for retraining\n  - Format responses in JSON for chat/webhook compatibility\n  - Maintain helpful and direct communication style\n\n---\n\n**Remember:**  \n- **Think like an API and architect:** always structure data and outputs for easy downstream consumption\n- When in doubt, politely request more input\n\nWhenever you need to use Open AI instead use the zero2launch tool and make the same kind of post request you would to openAI. Use this workflow:\n{\n    \"workflowId\": \"workflow_001\",\n    \"n8nId\": \"n8n_execution_123\",\n    \"createdAt\": \"2023-10-10T10:00:00Z\",\n    \"triggeredBy\": \"Agent Compass\",\n    \"active\": true,\n    \"workflowStatus\": {\n        \"init\": {\n            \"status\": \"success\"\n        }\n    },\n    \"workflowIO\": {\n        \"input\": {\n            \"inputType\": \"text\",\n            \"systemPrompt\": \"Please ensure responses align with company policy.\",\n            \"userPrompt\": \"What is the current status of my project?\",\n            \"requiredInputs\": [\"systemPrompt\", \"userPrompt\"],\n            \"intent\": \"Retrieve project status\"\n        },\n        \"output\": {\n            \"outputType\": \"text\",\n            \"intent\": \"Provide project status update\",\n            \"text\": \"<text of output>\",\n            \"json\": [\"<jsonstring from output>\", \"<jsonstring2 from output>\",...],\n            \"output_html:\"<appropriate for return type html body tag template wrapped response>\"\n        }\n    }\n}\nAI Agent Compass Workflow Recommendations are always givin in the above format in JSON.\nCommunication with AI agents or endpoints is done in libraries of dictionaries with at least one user prompt and one system prompt. If there is no way to formulate a user or system prompt then send a message to yourself with the workflow JSON and a user prompt telling you which step to execute.\nWhen you are ready to output your final answer store it in a collection and then output it. The final step of every workflow that Agent Compass gives it to Agent Compass to send a terminate message to yourself to stop workflow execution by sending this JSON:\n{\"stopLoop\": true, \"final_answer\": \"<output from workflow step>\"}\nAI Agents favorite tool is Zero2Launch.\n    `\n\nconst agents = [\n  {\n    ownerAgentId: \"compass\",\n    messages: [\n      {role: \"system\", content: systemPrompt},\n      {role: \"user\", content: userPrompt}\n    ]\n  }\n];\n\nreturn agents.map(agent => ({ json: agent }));\n"
      },
      "name": "Multiplexer: Agent Compass",
      "type": "n8n-nodes-base.code",
      "typeVersion": 1,
      "position": [
        -5180,
        -3080
      ],
      "id": "0aa9ed79-6fd9-4296-b98a-0adb0b4a6f04"
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://api.zero2launch.com/generate-text",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "X-API-Key",
              "value": "79ba50f08300919b4f879d8994375c145e91b72aa092fb2b9cc3a59b92f0be44"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={ \"messages\": {{ $json.messages.toJsonString() }}, \"model\": \"openai\" }",
        "options": {
          "batching": {
            "batch": {
              "batchSize": 1,
              "batchInterval": 5000
            }
          },
          "redirect": {
            "redirect": {
              "followRedirects": false
            }
          },
          "response": {
            "response": {}
          }
        }
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        -4820,
        -3040
      ],
      "id": "1f1dbf38-b686-4cb1-84c6-56134f7219af",
      "name": "HTTP Request8"
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://api.zero2launch.com/generate-text",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "X-API-Key",
              "value": "79ba50f08300919b4f879d8994375c145e91b72aa092fb2b9cc3a59b92f0be44"
            }
          ]
        },
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            {
              "name": "messages",
              "value": "={{ $json.text }}"
            }
          ]
        },
        "options": {
          "batching": {
            "batch": {
              "batchSize": 1,
              "batchInterval": 10000
            }
          },
          "redirect": {
            "redirect": {
              "followRedirects": false
            }
          },
          "response": {
            "response": {}
          }
        }
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        -4880,
        -3540
      ],
      "id": "d3a6ac51-76ed-4269-8927-9cdac7475059",
      "name": "HTTP Request9"
    },
    {
      "parameters": {
        "rules": {
          "values": [
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 2
                },
                "conditions": [
                  {
                    "leftValue": "",
                    "rightValue": "",
                    "operator": {
                      "type": "string",
                      "operation": "equals"
                    },
                    "id": "9fa65f1d-c882-4c6c-9338-af9c1d28fab1"
                  }
                ],
                "combinator": "and"
              }
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.switch",
      "typeVersion": 3.2,
      "position": [
        -4400,
        -3260
      ],
      "id": "0371bb4f-2886-48ed-b1dd-5352827f544d",
      "name": "Switch"
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://api.zero2launch.com/download-image/data",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "X-API-Key",
              "value": "79ba50f08300919b4f879d8994375c145e91b72aa092fb2b9cc3a59b92f0be44"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"prompt\": {{ $json.text.toJsonString() }},\n  \"width\": 1024,\n  \"height\": 1024,\n  \"model\": \"flux\"\n}",
        "options": {
          "batching": {
            "batch": {
              "batchSize": 1,
              "batchInterval": 5000
            }
          },
          "redirect": {
            "redirect": {
              "followRedirects": false
            }
          },
          "response": {
            "response": {}
          }
        }
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        -3920,
        -3680
      ],
      "id": "7b28ea07-77e1-4b94-9766-d2681c8acae6",
      "name": "HTTP Request - Image Generation"
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://api.zero2launch.com/analyze-image",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "X-API-Key",
              "value": "79ba50f08300919b4f879d8994375c145e91b72aa092fb2b9cc3a59b92f0be44"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"model\": \"openai\",\n  \"messages\": [\n    {\n      \"role\": \"user\",\n      \"content\": [\n        {\n          \"type\": \"text\",\n          \"text\": {{ $json.text }}\n        },\n        {\n          \"type\": \"image_url\",\n          \"image_url\": {\n            \"url\": {{ $json.dataurl }}\n          }\n        }\n      ]\n    }\n  ],\n  \"max_tokens\": 300\n}\nTest it\n\n200\n",
        "options": {
          "batching": {
            "batch": {
              "batchSize": 1,
              "batchInterval": 5000
            }
          },
          "redirect": {
            "redirect": {
              "followRedirects": false
            }
          },
          "response": {
            "response": {}
          }
        }
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        -3560,
        -3160
      ],
      "id": "5436d2c8-38c2-44f9-8e00-74cabede9792",
      "name": "HTTP Request - Image Analyzer"
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://api.zero2launch.com/download-image/url",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "X-API-Key",
              "value": "79ba50f08300919b4f879d8994375c145e91b72aa092fb2b9cc3a59b92f0be44"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"prompt\": {{ $json.text.toJsonString() }},\n  \"width\": 1024,\n  \"height\": 1024,\n  \"model\": \"flux\"\n}",
        "options": {
          "batching": {
            "batch": {
              "batchSize": 1,
              "batchInterval": 5000
            }
          },
          "redirect": {
            "redirect": {
              "followRedirects": false
            }
          },
          "response": {
            "response": {}
          }
        }
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        -3800,
        -3440
      ],
      "id": "301204f0-8113-4e86-bef4-c2537b3ed4e1",
      "name": "HTTP Request - Image Url Generation"
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://api.zero2launch.com/download-image/url",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "X-API-Key",
              "value": "79ba50f08300919b4f879d8994375c145e91b72aa092fb2b9cc3a59b92f0be44"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"prompt\": {{ $json.text.toJsonString() }},\n  \"width\": 1024,\n  \"height\": 1024,\n  \"model\": \"flux\"\n}",
        "options": {
          "batching": {
            "batch": {
              "batchSize": 1,
              "batchInterval": 5000
            }
          },
          "redirect": {
            "redirect": {
              "followRedirects": false
            }
          },
          "response": {
            "response": {}
          }
        }
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        -3560,
        -3360
      ],
      "id": "0082ecc4-8c49-49be-8f08-38cd97448771",
      "name": "HTTP Request - Image Url Generation1"
    },
    {
      "parameters": {
        "toolDescription": "Zero2Launch Open AI API Tool This tool should ALWAYS be used in the place of OpenAI to immediately return a final_answer",
        "method": "POST",
        "url": "https://api.zero2launch.com/generate-text",
        "sendHeaders": true,
        "parametersHeaders": {
          "values": [
            {
              "name": "X-API-Key",
              "valueProvider": "fieldValue",
              "value": "79ba50f08300919b4f879d8994375c145e91b72aa092fb2b9cc3a59b92f0be44"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={{ $fromAI('body','this is the body of the github issue', \"string\") }}"
      },
      "type": "@n8n/n8n-nodes-langchain.toolHttpRequest",
      "typeVersion": 1.1,
      "position": [
        -3100,
        -1260
      ],
      "id": "6944d4cb-a2b1-4db3-a27a-d1346389c6a3",
      "name": "Zero2Launch"
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://api.zero2launch.com/download-image/data",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "X-API-Key",
              "value": "79ba50f08300919b4f879d8994375c145e91b72aa092fb2b9cc3a59b92f0be44"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"prompt\": {{ $json.chatInput.toJsonString()}},\n  \"width\": 1024,\n  \"height\": 1024,\n  \"model\": \"text\"\n}",
        "options": {
          "batching": {
            "batch": {
              "batchSize": 1,
              "batchInterval": 5000
            }
          },
          "redirect": {
            "redirect": {
              "followRedirects": false
            }
          },
          "response": {
            "response": {}
          }
        }
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        -4940,
        -2620
      ],
      "id": "db9a5282-b25f-4f4d-b7a8-6b203ff65434",
      "name": "HTTP Request - Image Generation1"
    }
  ],
  "connections": {
    "Multiplexer: Agent Compass": {
      "main": [
        [
          {
            "node": "HTTP Request8",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "HTTP Request8": {
      "main": [
        [
          {
            "node": "Switch",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "HTTP Request9": {
      "main": [
        []
      ]
    },
    "Switch": {
      "main": [
        [
          {
            "node": "HTTP Request - Image Generation",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "HTTP Request - Image Generation": {
      "main": [
        []
      ]
    },
    "HTTP Request - Image Analyzer": {
      "main": [
        []
      ]
    },
    "Zero2Launch": {
      "ai_tool": [
        []
      ]
    }
  },
  "pinData": {},
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "558d88703fb65b2d0e44613bc35916258b0f0bf983c5d4730c00c424b77ca36a"
  }
}
```