import React, { Component } from 'react';
import Search from './Search';
import Results from './Results';
import ErrorBoundary from './ErrorBoundary';

interface Result {
  name: string;
  description: string;
  birth_year: string;
}

interface AppState {
  searchTerm: string;
  results: Result[];
  loading: boolean;
  error: string | null;
}

class App extends Component<object, AppState> {
  state: AppState = {
    searchTerm: localStorage.getItem('searchTerm') || '',
    results: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.fetchResults(this.state.searchTerm);
  }

  fetchResults = (searchTerm: string) => {
    this.setState({ loading: true, error: null });
    const query = searchTerm.trim() ? `?search=${searchTerm.trim()}` : '';
    fetch(`https://swapi.dev/api/people/${query}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const results = data.results.map((item: Result) => ({
          name: item.name,
          description: item.birth_year, // or any other property for description
        }));
        this.setState({ results, loading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
        console.error('Error fetching data: ', error);
      });
  };

  handleSearch = (searchTerm: string) => {
    this.setState({ searchTerm }, () => {
      localStorage.setItem('searchTerm', searchTerm);
      this.fetchResults(searchTerm);
    });
  };

  render() {
    const { searchTerm, results, loading, error } = this.state;

    return (
      <ErrorBoundary>
        <div>
          <div className={'search-box-main'}>
            <Search searchTerm={searchTerm} onSearch={this.handleSearch} />
          </div>
          <div className={'results-box-main'}>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              <Results results={results} />
            )}
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
