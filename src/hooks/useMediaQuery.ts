import { useEffect, useMemo, useState } from 'react';

export const useMediaQuery = (query: string) => {
  const mediaQuery = useMemo(() => window.matchMedia(query), [query]);
  const [match, setMatch] = useState(mediaQuery.matches);

  useEffect(() => {
    const onChange = () => setMatch(mediaQuery.matches);
    mediaQuery.addEventListener('change', onChange);

    return () => mediaQuery.removeEventListener('change', onChange);
  }, [mediaQuery]);

  return match;
};

export const useMediaQueries = () => {
  const sm = useMediaQuery('(min-width: 600px)');
  const md = useMediaQuery('(min-width: 800px)');
  const lg = useMediaQuery('(min-width: 1200px)');

  return { sm, md, lg };
};
