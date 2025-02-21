const express = require('express');
const faker = require('faker');

const router = express.Router();

let movies = [
  { id: 1, title: 'Alien', year: 1985, category: 'Sci-Fi' },
  { id: 2, title: 'Death Silence', year: 2004, category: 'Thriller' },
  { id: 3, title: 'The Dark Knight', year: 2008, category: 'Action' },
  { id: 4, title: 'Planet of the Apes', year: 1982, category: 'Sci-Fi' },
  { id: 5, title: 'The man with the Ironmask', year: 2002, category: 'Drama' }
];

router.get('/', (req, res) => {
  res.json(movies);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const movie = movies.find(m => m.id == id);
  if (!movie) return res.status(404).json({ message: 'No Movie Found' });

  return res.json(movie);
});

router.post('/', (req, res) => {
  const { title, year, category } = req.body;
  const maxId = movies.length > 0 ? Math.max(...movies.map(movie => movie.id)) : 0;

  const newMovie = {
    id: maxId + 1,
    title,
    year,
    category
  };

  movies.push(newMovie);

  res.status(201).json({
    message: 'Movie Added',
    data: newMovie
  });
});


router.patch('/:id', (req, res) =>{
  const {id} = req.params.id;
  const {title, year, category} = req.body;
  const movie = movies.find(m => m.id == id);
  if(movie){
    if(title) movie.title=title;
    if(year) movie.year=year;
    if(category) movie.category=category;
    res.json({
      message: 'Movie Updated',
      data: movie
    });
  };
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex(m => m.id == id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'No Movie Found' });
  }
  const deletedMovie = movies.splice(movieIndex, 1);
  res.json({
    message: 'Movie Deleted',
    data: deletedMovie
  });
});

module.exports=router;
