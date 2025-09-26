export async function withFallback<T>(
  primary: () => Promise<T>,
  fallback: () => Promise<T>,
  onError?: (error: unknown) => void,
) {
  try {
    return await primary();
  } catch (error) {
    if (onError) {
      onError(error);
    } else {
      console.error("Primary data loader failed", error);
    }
    return fallback();
  }
}
