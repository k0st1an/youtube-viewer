import express from 'express';
import { replace } from 'ramda';
import { WELCOME, CHANNEL_PAGE } from './urls';

const router = express.Router();

const Welcome = router
  .get(WELCOME, (req, res) => res.render('welcome'))
  .post(WELCOME, (req, res) => {
    const re = /([\w-]+){8,}/g;

    try {
      const id = re.exec(req.body.url)[0];

      res.redirect(replace(':id', id, CHANNEL_PAGE));
    } catch (error) {
      res.render('error', { massage: 'Что-то пошло не так :(', error });
    }
  });

export default Welcome;
