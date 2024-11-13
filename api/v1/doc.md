# Text Utility API Suite

The **Text Utility API Suite** provides a powerful set of tools for text processing, including summarization, paragraph generation, title suggestions, and social media caption generation. Built with ease of use in mind, this API suite is ideal for developers, content creators, and marketers looking to enhance their workflows.

## Base URL
```plaintext
https://text-utility-api-suite.p.rapidapi.com/v1/
```

## Endpoints Overview

### 1. Ping API

**Endpoint**: `/ping`  
**Method**: `GET`  
**Description**: Verifies server availability by returning a basic "Hello world" response with the server status and a timestamp.

#### Example Request
```javascript
fetch("https://text-utility-api-suite.p.rapidapi.com/ping", {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY",
        "X-RapidAPI-Host": "text-utility-api-suite.p.rapidapi.com"
    }
})
```

#### Example Response
```json
{
  "message": "Hello world",
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

---

### 2. Paragraph Summarizer API

**Endpoint**: `/api/paragraph/summary`  
**Method**: `POST`  
**Description**: Summarizes long paragraphs into concise, meaningful summaries. Requires a `content` field in the request body and optionally accepts a `tone` parameter for adjusting summary length.

#### Parameters
- **content** (string, required): The text to be summarized.
- **tone** (string, optional): Defines the summary length or style. Supported values are `"short"`, `"medium"`, `"long"`, `"brief"`, or `"concise"`. Defaults to `"concise"` if not specified.

#### Example Request
```javascript
fetch("https://text-utility-api-suite.p.rapidapi.com/v1/api/paragraph/summary", {
    method: "POST",
    headers: {
        "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY",
        "X-RapidAPI-Host": "text-utility-api-suite.p.rapidapi.com",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        content: "Artificial intelligence (AI) refers to systems or machines that mimic human intelligence to perform tasks and can iteratively improve themselves based on the information they collect...",
        tone: "medium"
    })
})
```

#### Example Response
```json
{
  "response": "AI systems mimic human intelligence to perform tasks and improve through data collection, with applications in customer service, image recognition, and content recommendations."
}
```

---

### 3. Paragraph Generator API

**Endpoint**: `/api/paragraph/generate`  
**Method**: `POST`  
**Description**: Generates a single, well-structured paragraph based on the provided content. This endpoint also allows optional customization of the paragraph's tone and style.

#### Parameters
- **content** (string, required): The text or topic to expand into a paragraph.
- **tone** (string, optional): Defines the length or tone of the paragraph. Options include `"short"`, `"medium"`, `"long"`, `"brief"`, `"concise"`. Default is `"concise"`.
- **style** (string, optional): Specifies the style of the paragraph. Options include `"formal"`, `"friendly"`, `"lovely"`, `"neutral"`. Default is `"neutral"`.

#### Example Request
```javascript
fetch("https://text-utility-api-suite.p.rapidapi.com/v1/api/paragraph/generate", {
    method: "POST",
    headers: {
        "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY",
        "X-RapidAPI-Host": "text-utility-api-suite.p.rapidapi.com",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        content: "Topic or text to expand upon...",
        tone: "medium",         // Optional tone
        style: "formal"          // Optional style
    })
})
```

#### Example Response
```json
{
  "response": "Generated paragraph based on the input text."
}
```

### 4. Title Generator API

**Endpoint**: `/api/title/generate`  
**Method**: `POST`  
**Description**: Generates four unique title suggestions based on provided content. Each title can vary in tone, style, and context to match different purposes, such as articles, YouTube videos, blogs, or stories.

#### Parameters
- **content** (string, required): The main topic or text to generate titles for.
- **tone** (string, optional): The desired tone of the titles. Examples include "informative," "casual," "motivational," "formal," etc.
- **style** (string, optional): The style or approach of the titles, such as "catchy," "thought-provoking," "conversational," "educational," etc.
- **context** (string, optional): The target context for the titles, like "article," "YouTube," "blog," "story," etc.

#### Example Request
```javascript
fetch("https://text-utility-api-suite.p.rapidapi.com/v1/api/title/generate", {
    method: "POST",
    headers: {
        "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY",
        "X-RapidAPI-Host": "text-utility-api-suite.p.rapidapi.com",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        content: "The Importance of Cybersecurity in Today's Digital World",
        tone: "informative",
        style: "thought-provoking",
        context: "article"
    })
})
```

#### Example Response
```json
{
    "response": [
        "Safeguarding Our Future: Why Cybersecurity Matters More Than Ever",
        "Cybersecurity in the Digital Age: A Necessity for All",
        "Protecting the Digital World: The Role of Cybersecurity Today",
        "Beyond Firewalls: The Growing Importance of Cybersecurity Awareness"
    ]
}
```

---

### 5. Caption Generator API

**Endpoint**: `/api/caption/generate`  
**Method**: `POST`  
**Description**: Generates a catchy social media caption based on input text, with customizable style and context options for different platforms like Instagram, LinkedIn, etc.

#### Request Body Parameters
- **content** (string, required): The main text or idea for generating the caption.
- **style** (string, optional): The desired tone or style for the caption (e.g., "engaging", "motivational", "funny", "casual"). Default is "engaging".
- **context** (string, optional): The platform or context for the caption (e.g., "Instagram", "LinkedIn", "Twitter", "Facebook"). Default is "Instagram".

#### Example Request
```javascript
fetch("https://text-utility-api-suite.p.rapidapi.com/v1/api/caption/generate", {
    method: "POST",
    headers: {
        "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY",
        "X-RapidAPI-Host": "text-utility-api-suite.p.rapidapi.com",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        content: "The importance of teamwork in achieving success in any project.",
        style: "motivational",
        context: "LinkedIn"
    })
})
```

#### Example Response
```json
{
  "response": "Great things are never achieved alone. Teamwork is the key to success! #Teamwork #Success #Leadership"
}
```

--- 

## Error Handling
Each endpoint provides structured error responses for missing parameters or processing issues. Common error responses include:

- **400 Bad Request**: Missing or invalid `content` in the request body.
- **500 Internal Server Error**: General server error or failure in content generation.

## Quick Start
1. **Get an API Key**: Sign up on RapidAPI to obtain your `X-RapidAPI-Key`.
2. **Use the Endpoints**: Include your API key in the request headers and interact with the endpoints as shown in the examples.

## Support
For questions or support, please visit the [API documentation](https://rapidapi.com/mrsajadpp-QM3iUwNG3/api/text-utility-api-suite) or contact the support team on RapidAPI.