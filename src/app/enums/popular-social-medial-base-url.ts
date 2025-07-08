export interface SocialMediaBaseUrl {
  baseURL: string;
  value: string;
}

export const POPULAR_SOCIAL_MEDIA_BASE_URLS: SocialMediaBaseUrl[] = [
  { baseURL: 'https://facebook.com/', value: 'facebook' },
  { baseURL: 'https://www.facebook.com/', value: 'facebook' },
  { baseURL: 'https://github.com/', value: 'github' },
  { baseURL: 'https://www.github.com/', value: 'github' },
  { baseURL: 'https://instagram.com/', value: 'instagram' },
  { baseURL: 'https://www.instagram.com/', value: 'instagram' },
  { baseURL: 'https://linkedin.com/', value: 'linkedin' },
  { baseURL: 'https://www.linkedin.com/', value: 'linkedin' },
  { baseURL: 'https://x.com/', value: 'x' },
  { baseURL: 'https://www.x.com/', value: 'x' },
  { baseURL: 'https://youtube.com/', value: 'youtube' },
  { baseURL: 'https://www.youtube.com/', value: 'youtube' },
  { baseURL: 'https://messenger.com/', value: 'messenger' },
  { baseURL: 'https://www.messenger.com/', value: 'messenger' },
];
