import { useState, useCallback } from 'react';
import axios from 'axios';

function useFetch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (url, method = 'GET', body = null) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        url,
        method,
        data: body,
        timeout: 10000,
      });
      return response.data;
    } catch (err) {
      setError(err);
      console.error('API 요청 실패:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, fetchData };
}

export default useFetch;
