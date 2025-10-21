export const features = {
  blog: true,
  downloadCV: true,
  contactForm: false,
} as const;

export type FeatureFlags = typeof features;
