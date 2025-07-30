// Assets exports
// Import and re-export your assets here for centralized access

// Example images (replace with actual imports when you add images)
// export { default as LogoImage } from './images/logo.svg';
// export { default as PlaceholderImage } from './images/placeholder.png';

// Example icons (replace with actual imports when you add icons)
// export { default as ShoppingCartIcon } from './icons/shopping-cart.svg';
// export { default as UserIcon } from './icons/user.svg';

// Asset helpers
export const getImageUrl = (imageName: string): string => {
  return `/src/assets/images/${imageName}`;
};

export const getIconUrl = (iconName: string): string => {
  return `/src/assets/icons/${iconName}`;
};

// Placeholder function for when assets are not found
export const getPlaceholderImageUrl = (): string => {
  return '/placeholder.svg'; // This should exist in your public folder
};

// Common asset paths (update these as you add real assets)
export const ASSET_PATHS = {
  LOGO: '/placeholder.svg',
  DEFAULT_PRODUCT_IMAGE: '/placeholder.svg',
  DEFAULT_USER_AVATAR: '/placeholder.svg',
  LOADING_SPINNER: '/placeholder.svg',
} as const; 