import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useAPI = (endpoint) => {
  const [data, setData] = useState([]); // initial state empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [creating, setCreating] = useState(false);
  const [stateVersion, setStateVersion] = useState(0);

  const create = useCallback(async (newToDo) => {
    try {
      setCreating(true);
      setError(null);
      await axios.post(endpoint, newToDo);
      setStateVersion((v) => v + 1);
    } catch (err) {
      setError(err);
    } finally {
      setCreating(false);
    }
  }, []);

  const edit = useCallback(async (id, text) => {
    try {
      setCreating(true);
      setError(null);
      await axios.patch(endpoint + id, { text });
      setStateVersion((v) => v + 1);
    } catch (err) {
      setError(err);
    } finally {
      setCreating(false);
    }
  }, []);

  const deleteByID = useCallback(async (id) => {
    try {
      setCreating(true);
      setError(null);
      await axios.delete(endpoint + id);
      setStateVersion((v) => v + 1);
    } catch (err) {
      setError(err);
    } finally {
      setCreating(false);
    }
  }, []);

  //To call data when component is mounted,
  useEffect(() => {
    let didCancel = false;
    setError(null);
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get(endpoint);
        if (!didCancel) {
          setData(response.data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      didCancel = true;
    };
  }, [endpoint, stateVersion]);

  return { data, loading, error, create, creating, edit, delete: deleteByID };
};

export default useAPI;
