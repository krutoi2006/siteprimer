export function withSiteBase(path: string) {
  if (!path) {
    return path;
  }

  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:') || path.startsWith('#')) {
    return path;
  }

  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;

  return `${normalizedBase}${path.replace(/^\/+/, '')}`;
}
