import { useEffect, useState } from 'react';
import useDebounce from './useDebounce';
import axios from 'axios';
import { Repo } from './Repo';

const API_URL = 'http://localhost:8080';
const PAGE_SIZE = 30;

const useGithubAPI = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [areMoreResults, setAreMoreResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 500);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Repo[]>([]);

  useEffect(() => {
    const githubSearch = async (query: string) => {
      const response = await axios(API_URL + '/search', {
        params: { q: query, page, per_page: PAGE_SIZE },
      });
      setAreMoreResults(page * PAGE_SIZE <= response.data.data.total_count);

      return response.data.data.items;
    };

    if (debouncedSearchTerm) {
      setData([]);
      setLoading(true);
      githubSearch(debouncedSearchTerm).then((results) => {
        setLoading(false);
        setData(results);
      });
    } else {
      setAreMoreResults(false);
      setLoading(false);
      setData([]);
    }
  }, [debouncedSearchTerm, page]);

  return {
    loading,
    data,
    searchTerm,
    setSearchTerm,
    setPage,
    page,
    areMoreResults,
  };
};

export default useGithubAPI;
