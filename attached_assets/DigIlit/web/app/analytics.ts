"use client";
import posthog from 'posthog-js';
import { useEffect } from 'react';

export function useAnalytics() {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';
    if (key) {
      posthog.init(key, { api_host: host });
    }
  }, []);
}
