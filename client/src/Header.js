import React, { Component } from 'react';

class Header extends Component {
  state = {
    ingredients: ''
  };

  handleIngredients(ingredients) {
    ingredients = ingredients.replace(/([^a-zA-z\s])/, '');
    this.setState({ ingredients });
  }

  render() {
    return (
      <header className="header">
        <div className="header-content">
          <h1> Meal Saver </h1>
          <input
            type="text"
            value={this.state.ingredients}
            onChange={e => this.handleIngredients(e.target.value)}
          />
          <button onClick={() => this.props.pullMeals(this.state.ingredients)}>
            Pull Meals
          </button>
        </div>
      </header>
    );
  }
}

export default Header;
