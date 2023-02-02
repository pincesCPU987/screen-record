var video = document.querySelector('.recording');
var aud = document.querySelector('.recording2');
var output = document.querySelector('.output');
var output2 = document.querySelector('.output2');
var start = document.querySelector('.start-btn');
var stop = document.querySelector('.stop-btn');
var anc = document.querySelector(".download-anc");
var anc2 = document.querySelector(".download-anc2");
var data = [];
var data2 = [];
  
// In order record the screen with system audio

var recording = navigator.mediaDevices.getDisplayMedia({
    video: {
        mediaSource: 'screen',
    },
    audio: true,
})
    .then(async (e) => {
  
        // For recording the mic audio
        let audio = await navigator.mediaDevices.getUserMedia({ 
            audio: true, video: false })
  
        // Assign the recorded mediastream to the src object 
        video.srcObject = e;
  
        // Combine both video/audio stream with MediaStream object
        let combine = new MediaStream(
            [...e.getTracks()])
        let combine2 = new MediaStream([...audio.getTracks()])
        /* Record the captured mediastream
           with MediaRecorder constructor */
        let recorder = new MediaRecorder(combine);
        let recorder2 = new MediaRecorder(combine2);
        start.addEventListener('click', (e) => {
  
            // Starts the recording when clicked
            recorder.start();
          recorder2.start();
  
            // For a fresh start
            data = []
          data2 = []
        });
  
        stop.addEventListener('click', (e) => {
  
            // Stops the recording  
            recorder.stop();
          recorder2.stop();
            alert("recording stopped")
        });
  
        /* Push the recorded data to data array 
          when data available */
        recorder.ondataavailable = (e) => {
            data.push(e.data);
        };
      recorder2.ondataavailable = (e) => {
            data2.push(e.data);
        };
  
        recorder.onstop = () => {
  
            /* Convert the recorded audio to 
               blob type mp4 media */
            let blobData = new Blob(data, { type: 'video/mp4' });
  
            // Convert the blob data to a url
            let url = URL.createObjectURL(blobData)
  
            // Assign the url to the output video tag and anchor 
            output.src = url
            anc.href = url
        };
      recorder2.onstop = () => {
  
            /* Convert the recorded audio to 
               blob type mp4 media */
            let blobData = new Blob(data2, { type: 'audio/mp3' });
  
            // Convert the blob data to a url
            let url = URL.createObjectURL(blobData)
  
            // Assign the url to the output video tag and anchor 
            output2.src = url
            anc2.href = url
        };
    });
var myvideo = document.getElementById("output");
    var myaudio = document.getElementById("output2");
aud.controls = false;
    var change_time_state = true;

    myvideo.onplay = function(){
        myaudio.play();
        if(change_time_state){
            myaudio.currentTime = myvideo.currentTime;
            change_time_state = false;
        }
    }

    myvideo.onpause = function(){
        myaudio.pause();
        change_time_state = true;
    }
