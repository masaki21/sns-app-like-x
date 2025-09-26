export function formatImpressions(likes: number) {
  const impressions = Math.max(likes * 42 + 1200, 1200);
  if (impressions >= 10000) {
    return `${(impressions / 1000).toFixed(1)}K`;
  }
  return impressions.toLocaleString("ja-JP");
}
