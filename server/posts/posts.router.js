const express = require('express');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');
const { default: axios } = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await fetchPosts(req.query);

  const postsWithImages = await posts.reduce(async(acc, post) => {
    // TODO use this route to fetch photos for each post
    // axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
    
    const accPromise = await acc;
    const photos = await axios.get(
      `https://jsonplaceholder.typicode.com/albums/${post.id}/photos`
    );
    
    return [
      ...accPromise,
      {
        ...post,
        images: photos.data.slice(0,3).map((photo) => ({ url: photo.url })),
      },
    ];
  }, Promise.resolve([]));

  res.json(postsWithImages);
});

module.exports = router;
