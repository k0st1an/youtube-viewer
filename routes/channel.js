import express from 'express';
import { CHANNEL_PAGE } from './urls';
import { videosSt, channelDetail, playList } from '../lib/gapi';

const router = express.Router();

const ChannelPageNew = router.get(CHANNEL_PAGE, async (req, res) => {
  const { id } = req.params;

  try {
    const resCh = await channelDetail(id);
    const { uploads } = resCh.items[0].contentDetails.relatedPlaylists;
    const resPl = await playList(uploads);

    res.render('channel/detail', {
      id: resCh.items[0].id,
      picture: resCh.items[0].snippet.thumbnails.default.url,
      title: resCh.items[0].snippet.title,
      publishedAt: resCh.items[0].snippet.publishedAt,
      description: resCh.items[0].snippet.description,
      subscriberCount: resCh.items[0].statistics.subscriberCount,
      videoCount: resCh.items[0].statistics.videoCount,
      viewCount: resCh.items[0].statistics.viewCount,
      videoItems: await videosSt(resPl.items),
    });
  } catch (error) {
    res.render('error', { error });
  }
});

export default ChannelPageNew;
