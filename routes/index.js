import Welcome from './welcome';
import ChannelPageNew from './channel';

export default app => {
  app.use(Welcome); app.use(ChannelPageNew);
};
