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
