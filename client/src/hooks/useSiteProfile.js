import { useCallback, useEffect, useState } from 'react';
import { BACKEND_URL } from '../config';
import { DEFAULT_SITE_PROFILE } from '../constants/defaultSiteProfile';

export function useSiteProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/api/site-profile`, { cache: 'no-store' });
      const data = await res.json();
      setProfile({ ...DEFAULT_SITE_PROFILE, ...data });
    } catch (err) {
      setError(err.message || 'Failed to load profile');
      setProfile(DEFAULT_SITE_PROFILE);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile: profile || DEFAULT_SITE_PROFILE,
    loading,
    error,
    refresh: fetchProfile
  };
}
