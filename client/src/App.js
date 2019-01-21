import React, { Component } from 'react';
import axios from 'axios';
import shortid from 'shortid';
import './App.css';
import Header from './Header';
import SearchResult from './SearchResult';
import MyMeal from './MyMeal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      myMeals: []
    };

    this.pullMeals = this.pullMeals.bind(this);
  }

  async pullMeals(ingredients) {
    ingredients = ingredients.replace(/\s+/, ',');
    const response = await axios.get('/api/meals/' + ingredients);
    this.setState({
      searchResults: response.data
    });
  }

  async saveMeal(meal) {
    const response = await axios.post('/api/meals', meal);
    meal = response.data;
    this.setState(state => {
      return {
        myMeals: state.myMeals.concat([meal])
      };
    });
  }

  async deleteMeal(id) {
    await axios.delete('/api/meals/' + id);
    const myMeals = this.state.myMeals.filter(meal => meal.id !== id);
    this.setState({ myMeals });
  }

  render() {
    return (
      <main className="App">
        <Header pullMeals={this.pullMeals} />
        <section className="meals">
          <ul className="search-results">
            <h2> Search Results </h2>
            {this.state.searchResults.map(result => (
              <SearchResult
                key={shortid.generate()}
                saveMeal={() => this.saveMeal(result)}
                {...result}
              />
            ))}
          </ul>
          <ul className="my-meals">
            <h2> My Meals </h2>
            {this.state.myMeals.map(meal => (
              <MyMeal
                key={shortid.generate()}
                deleteMeal={() => this.deleteMeal(meal.id)}
                {...meal}
              />
            ))}
          </ul>
        </section>
      </main>
    );
  }
}

export default App;
