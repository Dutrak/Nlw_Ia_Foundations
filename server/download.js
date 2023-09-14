import ytdl from 'ytdl-core';
import fs from 'node:fs'

export const download = (VideoId) => new Promise((resolve, reject) => {
  const videoURL = 'https://www.youtube.com/shorts/' + VideoId
  console.log("Download:", VideoId)
  console.log(videoURL)

  ytdl(videoURL, { quality: 'lowestaudio', filter: 'audioonly' }).on("info", (info) => {
    const seconds = info.formats[0].approxDurationMs / 1000;
    if (seconds > 60) {
      throw new Error("Video is too long!");
    }
  }).on('end', () => {
    console.log('finished downloading!');
    resolve();
  }).on('error', (err) => {
    console.log('error', err);
    reject(err);
  }).pipe(fs.createWriteStream("./tmp/audio.mp4"));
})