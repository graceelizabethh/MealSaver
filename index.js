const express = require('express');
const axios = require('axios');
const shortid = require('shortid');

const app = express();
app.use(express.json());

const recipePuppy = 'http://recipepuppy.com/api';

let myMeals = [];

app.get('/api/meals/:ingredients', async (req, res) => {
  const { ingredients } = req.params;
  const puppyRequest = `${recipePuppy}/?i=${ingredients}`;
  const puppyResponse = await axios.get(puppyRequest);
  const meals = puppyResponse.data.results;
  res.send(meals);
});

app.post('/api/meals', (req, res) => {
  const meal = req.body;
  meal.id = shortid.generate();
  myMeals.push(meal);
  res.send(meal);
});

app.delete('/api/meals/:id', (req, res) => {
  const id = req.params.id;
  myMeals = myMeals.filter(meal => meal.id !== id);
  res.send();
});

app.listen('5000', () => {
  console.log('Listening');
});
