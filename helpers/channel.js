
const checkPts = (str, patterns) => patterns.find(pattern => str.includes(pattern));
const spliteStr = str => (str.endsWith('/') ? str.slice(0, -1) : str).split('/');

const recieveChannel = str => {
  const spliter = spliteStr(str.trim());
  const patterns = ['https', 'http', 'www.youtube.com', 'channel'];

  if (spliter && !!checkPts(spliter, patterns)) {
    return spliter[spliter.length - 1];
  }
  return str;
};

export default recieveChannel;
