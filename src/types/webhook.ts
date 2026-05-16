export interface Webhook {
    id: string;
    url: string;
    description: string;
    status: string;
    events: string[];
    createdAt: string;
  }
  
  export interface PageableResponse<T> {
    content: T[];
  
    totalElements: number;
    totalPages: number;
  
    size: number;
    number: number;
  
    first: boolean;
    last: boolean;
  }