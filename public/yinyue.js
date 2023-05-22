// 创建 AudioContext 对象
const audioContext = new AudioContext();

// 加载音乐文件
function loadMusic(file) {
  return fetch(file)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer));
}

// 播放音乐
function playMusic(buffer) {
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start(0);
}

// 在适当的地方调用加载和播放音乐的函数
loadMusic('bg_music.mp3')
  .then(buffer => {
    // 加载成功，可以播放音乐
    playMusic(buffer);
  })
  .catch(error => {
    // 加载失败，处理错误
    console.error('Failed to load music:', error);
  });