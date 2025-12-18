// TypeScript declarations for style and asset imports used by Next.js
// Prevents "Cannot find module or type declarations for side-effect import" errors

declare module '*.css';
declare module '*.module.css';
declare module '*.scss';
declare module '*.module.scss';
declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.webp';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
