export interface ServiceProblem {
  id: string;
  label: string;
}

export interface Photo {
  id: string;
  url: string;
  alt: string;
}

export interface ServiceRequestState {
  problemType: string;
  description: string;
  photos: Photo[];
  address: string;
  schedulePreference: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}