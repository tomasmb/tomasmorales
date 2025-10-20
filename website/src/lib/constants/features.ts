export const features = {
  blog: false, // Hide blog section until there are posts
  downloadCV: true,
  contactForm: false,
} as const;

export type FeatureFlags = typeof features;
