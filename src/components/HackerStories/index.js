import React from "react";
import { useLoacalStorageState } from "../MyHooks/useLocalStorageState";
import axios from "axios";
import { SearchForm } from "./SearchForm";
import { List } from "./List";
import MySpinner from "./../MySpinner/MySpinner";
import './style.css'

const API_BASE = "https://hn.algolia.com/api/v1";
const API_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const PARAM_PAGE = "page=";
// careful: notice the ? in between
const getUrl = (searchTerm, page) =>
  `${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;

const extractSearchTerm = (url) =>
  url
    .substring(url.lastIndexOf("?") + 1, url.lastIndexOf("&"))
    .replace(PARAM_SEARCH, "")
    .trim();

const getLastSearches = (urls) =>
  urls
    .reduce((result, url, index) => {
      const searchTerm = extractSearchTerm(url);

      if (index === 0) {
        return result.concat(searchTerm);
      }

      const previousSearchTerm = result[result.length - 1];

      if (searchTerm === previousSearchTerm) {
        return result;
      } else {
        return result.concat(searchTerm);
      }
    }, [])
    .slice(-6)
    .slice(0, -1);

const StoriesActionTypes = {
  STORIES_FETCH_INIT: "STORIES_FETCH_INIT",
  STORIES_FETCH_SUCCESS: "STORIES_FETCH_SUCCESS",
  STORIES_FETCH_FAILURE: "STORIES_FETCH_FAILURE",
  REMOVE_STORIES: "REMOVE_STORIES",
};

const storiesReducer = (state, action) => {
  switch (action.type) {
    case StoriesActionTypes.STORIES_FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case StoriesActionTypes.STORIES_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data:
          action.payload.page === 0
            ? action.payload.list
            : state.data.concat(action.payload.list),
        page: action.payload.page,
      };
    case StoriesActionTypes.STORIES_FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case StoriesActionTypes.REMOVE_STORIES:
      return {
        ...state,
        data: state.data.filter(
          (story) => story.objectID !== action.payload.objectID
        ),
      };

    default:
      return state;
  }
};

const HackerStories = () => {
  const [searchTerm, setSearchTerm] = useLoacalStorageState("search", "React");
  const [urls, setUrls] = React.useState([getUrl(searchTerm, 0)]);
  const [stories, dispatchStories] = React.useReducer(storiesReducer, {
    isLoading: false,
    isError: false,
    data: [],
    page: 0
  });

  const handleFetchStories = React.useCallback(async () => {
    dispatchStories({ type: StoriesActionTypes.STORIES_FETCH_INIT });
 
    try {
      const lastUrl = urls[urls.length - 1];
      const result = await axios.get(lastUrl);

      dispatchStories({
        type: StoriesActionTypes.STORIES_FETCH_SUCCESS,
        payload: {
          list: result.data.hits,
          page: result.data.page,
        },
      });
    } catch {
      dispatchStories({ type: StoriesActionTypes.STORIES_FETCH_FAILURE });
    }
  }, [urls]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: item,
    });
  };

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    handleSearch(searchTerm, 0);
    event.preventDefault();
  };

  const handleLastSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    handleSearch(searchTerm, 0);
  };

  const handleMore = () => {
    const lastUrl = urls[urls.length - 1];
    const searchTerm = extractSearchTerm(lastUrl);
    console.log(searchTerm);
    handleSearch(searchTerm, stories.page + 1);
  };

  const handleSearch = (searchTerm, page) => {
    const url = getUrl(searchTerm, page);
    setUrls(urls.concat(url));
  };

  const lastSearches = getLastSearches(urls);
  console.log(searchTerm);

  return (
    <div className="container-hacker-stories">
      <h1 className="headline-primary">My Hacker Stories</h1>
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />
      <LastSearches
        lastSearches={lastSearches}
        onLastSearch={handleLastSearch}
      />

      {stories.isError && <p className="danger">Something went wrong ...</p>}

      <List list={stories.data} onRemoveItem={handleRemoveStory} />

      {stories.isLoading ? (
        <MySpinner />
      ) : (
        <button type="button" className="button button_large" onClick={handleMore}>
          More
        </button>
      )}
    </div>
  );
};

const LastSearches = ({ lastSearches, onLastSearch }) => (
  <>
    {lastSearches.map((searchTerm, index) => (
      <button
        key={searchTerm + index}
        type="button"
        className="button button_large"
        onClick={() => onLastSearch(searchTerm)}
      >
        {searchTerm}
      </button>
    ))}
  </>
);

export default HackerStories;
