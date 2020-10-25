import React, { Component } from 'react';
import './App.css';

import testData from "./testData.json";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: localStorage.getItem("searchValue") ? JSON.parse(localStorage.getItem("searchValue")) : "",
      filteredInsights: [],
    }
  }

  componentDidMount() {
    this.submitSearch();
  }

  onSearchChange = (searchValue) => {
    this.setState({ searchValue }, () => {
      setTimeout(() => {
        this.submitSearch();
      }, 1000);
    })
  }

  submitSearch = () => {
    localStorage.setItem("searchValue", JSON.stringify(this.state.searchValue));
    console.log(this.state.searchValue);
    if (this.state.searchValue.length < 1) {
      this.setState({ filteredInsights: testData.insights });
    } else {
      const filteredInsights = testData.insights.filter(insight => insight.tags.includes(this.state.searchValue));
      this.setState({ filteredInsights });
    }
  }

  render() {
    const { searchValue, filteredInsights } = this.state;
    console.log(testData);
    return (
      <div className="App">
        <header className="header">
          <div className="title">
            <i className="fas fa-book-reader"></i>
            <h1>Insight</h1>
          </div>
          <div>
            <input
              id="search-input"
              value={searchValue}
              onChange={e => this.onSearchChange(e.target.value)}
              placeholder="Search Insights..."
            />
          </div>
        </header>
        <div className="insights-container">
          {filteredInsights.map((insight, i) => (
            <div key={i} className="insight">
              <div className="insight-banner-container">
                <div className="insight-banner" style={{ backgroundImage: `url(${insight.bannerUrl})` }} />
              </div>
              <h2 className="title">{insight.title}</h2>
              <h3>{insight.authorName}</h3>
              <h4>{insight.tags.join(' | ')}</h4>
              <div className="likes-container">
                <i className="fas fa-heart"></i>
                <p>{insight.likes}</p>
              </div>
            </div>
          ))}
          {filteredInsights.length < 1 && <p>Sorry, there are no results for your search</p>}
        </div>
      </div>
    );
  }
}

export default SearchPage;
