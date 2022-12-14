function getLocalStream() {
  console.log("jiinnyy2");
  navigator.mediaDevices
    .getUserMedia({ video: false, audio: true })
    .then((stream) => {
      //        window.localStream = stream; // A
      //        window.localAudio.srcObject = stream; // B
      //      window.localAudio.autoplay = true; // C

      const audioContext = new AudioContext();
      const mediaStreamAudioSourceNode =
        audioContext.createMediaStreamSource(stream);
      const analyserNode = audioContext.createAnalyser();
      mediaStreamAudioSourceNode.connect(analyserNode);

      const pcmData = new Float32Array(analyserNode.fftSize);
      const onFrame = () => {
        analyserNode.getFloatTimeDomainData(pcmData);
        let sumSquares = 0.0;
        for (const amplitude of pcmData) {
          sumSquares += amplitude * amplitude;
        }
        const value = Math.sqrt(sumSquares / pcmData.length);
        // console.log(value.toFixed(5));

        // const target = document.querySelector("#sentence");
        const value2 = Math.min(1, value + 0.1); // 0.1 ~ 1.0
        // console.log(value2);
        const jumpLevel = Number((4 * value2 * 10 * 1.5).toFixed());
        if (jumpLevel > 8) {
          const target = document.querySelector('.soundLevel');
          target.textContent = '사운드 레벨 -> ' + (jumpLevel - 6);
          // document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':32,'which':32}));
          // console.log('jump', jumpLevel);
          if (trex.playing) {
            console.log('Jump');
            // instance.config.GRAVITY = value2 + 0.5;
            trex.startJump(jumpLevel);
          } else {
              console.log('start');
              var e = new Event('keydown');
              e.which = e.keyCode = 32;
              e.code = "Backspace"
              document.dispatchEvent(e);  
            // new KeyboardEvent('keydown',{'keyCode':32,'which':32});
          }
        }

        window.requestAnimationFrame(onFrame);
      };

      window.requestAnimationFrame(onFrame);
    })
    .catch((err) => {
      console.error(`you got an error: ${err}`);
    });
}

getLocalStream();


function changeRex() {
  window.location.href = '/';
}

function changeDongDong() {
  window.location.href = '/#dongdong';
  window.location.reload();
}

function changeGhost() {
  window.location.href = '/#ghost';
  window.location.reload();
}

var timer;
function sayGo() {
  const hash = window.location.hash;
  var say = document.querySelector('.say');

  var sayList = [];

  switch (hash) {
    case '#dongdong':
      sayList = [
        '안녕하세요!!!!',
        '이동근입니다', 
        '나는 시소의 시티오입니다',
        '동근이에 여행 >_<',
        '찡긋',
        '찡긋 >_<',
      ]
      break;
    case '#ghost':
      sayList = [
        '안녕하세요!!!!',
        '시소 알유오케이에 오신걸 환영합니다', 
        '저는 비어 소믈리에 고스트입니다', 
        '맥주를 좋아하시는 분들은', 
        '저와 함께 해요!', 
        '웰컴 투 새촌바~~~', 
        '찡긋',
        '찡긋 >_<',
      ]
      break;
    default:
      sayList = [
        'Hi, I\'m v-rex',
        'Try to make any sounds!', 
        'The v-rex will be moved as noise you make',
        'Have a fun time with v-rex-runner!',
      ]
      break;
  }

  var cnt = 0;
  timer = setInterval(() => {
    const text = sayList[cnt++];
    console.log(text);
    say.textContent = text;

    if (sayList.length < cnt) {
      cnt = 0;
    }
  }, 3000);
}
