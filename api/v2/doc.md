# Text Utility API Suite

The **Text Utility API Suite** provides a powerful set of tools for text processing, including summarization, paragraph generation, title suggestions, and social media caption generation. Built with ease of use in mind, this API suite is ideal for developers, content creators, and marketers looking to enhance their workflows.

## Base URL
```plaintext
https://text-utility-api-suite.p.rapidapi.com/v2/
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

**Endpoint**: `/api/pargraph/summery`  
**Method**: `POST`  
**Description**: Summarizes long paragraphs into concise, meaningful summaries. Requires a `content` field in the request body.

#### Example Request
```javascript
fetch("https://text-utility-api-suite.p.rapidapi.com/v2/api/pargraph/summery", {
    method: "POST",
    headers: {
        "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY",
        "X-RapidAPI-Host": "text-utility-api-suite.p.rapidapi.com",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        content: "Your text to summarize here..."
    })
})
```

#### Example Response
```json
{
  "response": "Concise summary of the input text."
}
```

---

### 3. Paragraph Generator API

**Endpoint**: `/api/paragraph/generate`  
**Method**: `POST`  
**Description**: Generates a single, well-structured paragraph based on the given content in `content`.

#### Example Request
```javascript
fetch("https://text-utility-api-suite.p.rapidapi.com/v2/api/paragraph/generate", {
    method: "POST",
    headers: {
        "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY",
        "X-RapidAPI-Host": "text-utility-api-suite.p.rapidapi.com",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        content: "Topic or text to expand upon..."
    })
})
```

#### Example Response
```json
{
  "response": "Generated paragraph based on the input text."
}
```

---

### 4. Title Generator API

**Endpoint**: `/api/title/generate`  
**Method**: `POST`  
**Description**: Generates four title suggestions based on provided content, with each title having a unique tone or format.

#### Example Request
```javascript
fetch("https://text-utility-api-suite.p.rapidapi.com/v2/api/title/generate", {
    method: "POST",
    headers: {
        "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY",
        "X-RapidAPI-Host": "text-utility-api-suite.p.rapidapi.com",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        content: "Text for generating titles..."
    })
})
```

#### Example Response
```json
{
  "response": "Generated titles"
}
```

---

### 5. Caption Generator API

**Endpoint**: `/api/caption/generate`  
**Method**: `POST`  
**Description**: Generates a catchy social media caption based on input text.

#### Example Request
```javascript
fetch("https://text-utility-api-suite.p.rapidapi.com/v2/api/caption/generate", {
    method: "POST",
    headers: {
        "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY",
        "X-RapidAPI-Host": "text-utility-api-suite.p.rapidapi.com",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        content: "Text for caption generation..."
    })
})
```

#### Example Response
```json
{
  "response": "Generated catchy caption for social media."
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