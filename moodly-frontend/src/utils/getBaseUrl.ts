export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "/api";
  }
  return "http://localhost:4000/api";
};
