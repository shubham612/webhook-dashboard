export interface Delivery {
    id: string;
  
    eventType: string;
  
    webhookId: string;
  
    payload: Record<string, unknown>;
  
    status: string;
  
    attemptCount: number;
  
    maxAttempts: number;
  
    nextRetryAt: string | null;
  
    lastAttemptAt: string | null;
  
    responseCode: number | null;
  
    errorMessage: string | null;
  
    createdAt: string;
  
    updatedAt: string;
  }
  
  export interface PageableResponse<T> {
    content: T[];
  
    totalElements: number;
  
    totalPages: number;
  
    number: number;
  
    size: number;
  
    first: boolean;
  
    last: boolean;
  
    empty: boolean;
  }