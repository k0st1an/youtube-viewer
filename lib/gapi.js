import request from 'request-promise';
import youTubeAPIKey from '../helpers';

const BASE_URL = 'https://www.googleapis.com/youtube/v3';

async function channelDetail(id) {
  return JSON.parse(await request(`${BASE_URL}/channels?id=${id}&part=snippet,statistics,contentDetails&key=${youTubeAPIKey}`));
}

async function playList(id, results) {
  const max = results || 50;
  return JSON.parse(await request(`${BASE_URL}/playlistItems?key=${youTubeAPIKey}&part=snippet&maxResults=${max}&playlistId=${id}`));
}

async function recieveAllSt(items) {
  const st = items.map(async item => {
    const { videoId } = item.snippet.resourceId;
    return JSON.parse(await request(`${BASE_URL}/videos?key=${youTubeAPIKey}&part=statistics&id=${videoId}`));
  });

  return Promise.all(st);
}

function searchSt(videoId, st = []) {
  for (let i = 0; i < st.length; i += 1) {
    if (st[i].items[0].id === videoId) {
      return st[i].items[0].statistics;
    }
  }

  return {};
}

async function videosSt(pl = []) {
  const videos = [];
  const allSt = await recieveAllSt(pl);

  for (let i = 0; i < pl.length; i += 1) {
    const { videoId } = pl[i].snippet.resourceId;
    const st = searchSt(videoId, allSt);

    if (st) {
      videos.push({
        published: pl[i].snippet.publishedAt,
        title: pl[i].snippet.title,
        picture: pl[i].snippet.thumbnails.medium.url,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        viewCount: st.viewCount,
        likeCount: st.likeCount,
        dislikeCount: st.dislikeCount,
        commentCount: st.commentCount,
      });
    }
  }

  return Promise.all(videos);
}

export {
  channelDetail,
  playList,
  videosSt,
};
