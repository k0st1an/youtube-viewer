import express from 'express';
import { replace } from 'ramda';
import { WELCOME, CHANNEL_PAGE } from './urls';
import { recieveChannel } from '../helpers';

const router = express.Router();

const Welcome = router
  .get(WELCOME, (req, res) => res.render('welcome'))
  .post(WELCOME, (req, res) => {
    const { url } = req.body;
    const id = recieveChannel(url);

    res.redirect(replace(':id', id, CHANNEL_PAGE));
  });

export default Welcome;
