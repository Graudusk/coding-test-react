import cors from 'cors';
import express from 'express';
import { Octokit } from '@octokit/core';
import Bottleneck from 'bottleneck';

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 3000,
});
const octokit = new Octokit();
const app = express();

app.use(
  cors({
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Access-Control-Allow-Headers',
    ],
  })
);
app.set('trust proxy', true);
app.use(express.json());

app.get('/search', async (req, res) => {
  const { q, page, per_page } = req.query;
  const response = await limiter.schedule(() =>
    octokit.request('GET /search/repositories', {
      q: typeof q === 'string' ? q : '',
      page: typeof page === 'number' ? page : 1,
      per_page: typeof per_page === 'number' ? per_page : 30,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
  );

  res.json(response);
});

app.listen(8080, () => {
  console.log('listening on port 8080');
});
