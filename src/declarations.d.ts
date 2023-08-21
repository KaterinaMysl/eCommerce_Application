declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare global {
  interface Window {
    location: {
      href: string;
    };
  }
}
