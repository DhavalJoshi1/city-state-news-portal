import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

/**
 * Custom Hook: useFetch
 * Features: Auto-fetch, Manual Refresh, Abort Controller, and Error Tracking.
 */
export const useFetch = (url, autoFetch = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);

  // Memoized fetchData function to prevent infinite loops
  const fetchData = useCallback(async (customUrl) => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(customUrl || url, {
        signal: controller.signal,
        // Yahan aap common headers bhi dal sakte hain
      });
      setData(response.data);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Request canceled:', err.message);
      } else {
        setError(err.response?.data?.message || 'Something went wrong');
      }
    } finally {
      setLoading(false);
    }

    return () => controller.abort(); // Cleanup
  }, [url]);

  // Initial fetch on mount
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [fetchData, autoFetch]);

  return { 
    data, 
    loading, 
    error, 
    reFetch: fetchData, // For "Pull to Refresh" or manual triggers
    setData // Sometimes we need to update data locally (e.g., after a delete)
  };
};

export default useFetch;