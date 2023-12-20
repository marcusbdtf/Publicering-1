const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const getRandomSuperhero = async () => {
  const BASE_API_URL = `https://superheroapi.com/api/10232228892935634/`;
  const MAX_SUPERHERO_ID = 50; 
  const randomIndex = Math.floor(Math.random() * MAX_SUPERHERO_ID) + 1;

  const apiURL = `${BASE_API_URL}${randomIndex}`;
  console.log(`Fetching random superhero from ${apiURL}`);

  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    const superheroDetails = {
      name: data.name,
      intelligence: data.powerstats.intelligence,
      strength: data.powerstats.strength,
      fullName: data.biography['full-name'],
      aliases: data.biography.aliases.join(', '),
      occupation: data.work.occupation
    };
    return superheroDetails;
  } catch (error) {
    console.error('Error fetching random superhero:', error);
    return null;
  }
};

app.get('/', async (req, res) => {
  const superheroDetails = await getRandomSuperhero();
  if (!superheroDetails) {
    res.status(500).send('Failed to fetch random superhero');
    return;
  }

  const output = `Random Superhero: ${superheroDetails.name}, Intelligence: ${superheroDetails.intelligence}, Strength: ${superheroDetails.strength}, Full Name: ${superheroDetails.fullName}, Aliases: ${superheroDetails.aliases}, Occupation: ${superheroDetails.occupation}`;
  console.log(output);
  res.json({ message: output });
});

app.listen(port, () => {
  console.log(`Random Superhero API listening at http://localhost:${port}`);
});
