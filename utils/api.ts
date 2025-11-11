/**
 * API Utility Functions
 * Handles requests to the external API server
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export interface ApiError {
  message: string;
  status?: number;
  error?: unknown;
}

/**
 * Generic API request function
 */
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: 'An error occurred',
      }));
      throw {
        message: errorData.message || `HTTP error! status: ${response.status}`,
        status: response.status,
        error: errorData,
      } as ApiError;
    }

    return await response.json();
  } catch (error) {
    if ((error as ApiError).status) {
      throw error;
    }
    throw {
      message: 'Network error or server unavailable',
      error,
    } as ApiError;
  }
}

/**
 * GET request
 */
export async function apiGet<T>(endpoint: string): Promise<T> {
  return apiRequest<T>(endpoint, { method: 'GET' });
}

/**
 * POST request
 */
export async function apiPost<T>(endpoint: string, data?: unknown): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PUT request
 */
export async function apiPut<T>(endpoint: string, data?: unknown): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * DELETE request
 */
export async function apiDelete<T>(endpoint: string): Promise<T> {
  return apiRequest<T>(endpoint, { method: 'DELETE' });
}

/**
 * Chat-specific API functions
 */

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  message: string;
  history?: ChatMessage[];
}

export interface ChatResponse {
  answer: string;
  timestamp?: string;
}

export interface StreamChunk {
  type: 'chunk' | 'sources' | 'done';
  content?: string;
  sources?: Array<{
    content: string;
    metadata: Record<string, unknown>;
  }>;
}

export interface StreamCallbacks {
  onChunk?: (content: string) => void;
  onSources?: (sources: StreamChunk['sources']) => void;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Send a chat message to the API
 */
export async function sendChatMessage(question: string, history?: ChatMessage[]): Promise<ChatResponse> {
  return apiPost<ChatResponse>('/chat/query/stream', { question, history });
}

/**
 * Send a chat message with streaming response
 */
export async function sendChatMessageStream(
  question: string,
  history: ChatMessage[] | undefined,
  callbacks: StreamCallbacks
): Promise<void> {
  const url = `${API_URL}/chat/query/stream`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, history }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No response body');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const jsonStr = line.slice(6).trim();
          if (!jsonStr) continue;

          try {
            const data = JSON.parse(jsonStr) as StreamChunk;

            if (data.type === 'chunk' && data.content) {
              callbacks.onChunk?.(data.content);
            } else if (data.type === 'sources' && data.sources) {
              callbacks.onSources?.(data.sources);
            } else if (data.type === 'done') {
              callbacks.onComplete?.();
            }
          } catch (e) {
            console.error('Error parsing SSE data:', e, jsonStr);
          }
        }
      }
    }
  } catch (error) {
    callbacks.onError?.(error as Error);
    throw error;
  }
}
