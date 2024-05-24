/* eslint-disable */
const IDS = [
];

async function query(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.data.result.items.nodes.map(v => {
    if (!IDS.length) {
      throw new Error('NO IDS');
    }
    return {
      id: IDS.pop(),
      length: v.duration,
      title: v.title,
      url: v.audios[0].url,
    };
  });
}
