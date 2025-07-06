export interface SocialLink {
  id: string;
  url: string;
  platform: string;
  platformName: string;
  icon: string;
  color: string;
  customIcon: string;
  desc: string;
  followers?: string;
  following?: string;
  username: string;
  handle?: string;
}
