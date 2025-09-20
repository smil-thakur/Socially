// Enhanced Interface with more customization options
export interface InnerBento {
  heading: string;
  content?: string;
  icon?: string; // Icon name or emoji
  badge?: string; // Small text badge
  link?: string; // Optional link
}

export interface Bento {
  heading: string;
  content: string;
  innerBentos?: InnerBento[];
  bigBento?: boolean;
  layout?:
    | 'default'
    | 'featured'
    | 'stats'
    | 'timeline'
    | 'gallery'
    | 'contact';
  size?: 'small' | 'medium' | 'large' | 'xl';
  accent?: 'primary' | 'secondary' | 'success' | 'warning' | 'info';
  icon?: string;
  image?: string;
  tags?: string[];
  stats?: { label: string; value: string }[];
  badge?: string; // Small text badge
}

export interface Website {
  elements: Bento[];
}
