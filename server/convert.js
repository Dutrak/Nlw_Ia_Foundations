import fs, { readFileSync } from 'node:fs'
import wav from 'node-wav'
import ffmpeg from 'fluent-ffmpeg'
import ffmpegStatic from 'ffmpeg-static'

const filePath = "./tmp/audio.mp4"
const outputPath = "./tmp/audio.wav"

export const convert = () => new Promise((resolve, reject) => { 
  console.log("Convertendo o video...")

  ffmpeg.setFfmpegPath(ffmpegStatic)
  
  ffmpeg().input(filePath).audioFrequency(16000).audioChannels(1).format('wav').on('end', () => {
    const file = readFileSync(outputPath)
    const fileDecoded = wav.decode(file)

    const audioData = fileDecoded.channelData[0]
    const floatArray = new Float32Array(audioData)

    console.log("Video convertido!")

    resolve(floatArray)
    fs.unlinkSync(outputPath)

  }).on('error', (err) => { 
    console.log('Erro ao converter o video', err);
    reject(err);
  }).save(outputPath);
})