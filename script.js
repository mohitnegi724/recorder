let audio = document.getElementById("audio");
let record = document.getElementById("record");
let recordingStatus = false;

let recordAudio=()=>{
    console.log("recordingStatus ", !recordingStatus)
    navigator.mediaDevices.getUserMedia({ audio: true}).then(stream => {
        const audioChunks = [];
        const mediaRecorder = new MediaRecorder(stream);
        if(!recordingStatus){
            recordingStatus = true;
            record.innerText = "Stop";
            mediaRecorder.start();
            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });
        }else{
            recordingStatus = false;
            mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks);
                const audioUrl = URL.createObjectURL(audioBlob);
                audio.src = audioUrl;
                audio.play();
            });
            record.innerText = "Record";
            mediaRecorder.stop();
            const audioBlob = new Blob(audioChunks);
            const audioUrl = URL.createObjectURL(audioBlob);
            audio.src = audioUrl;
            audio.play();

        }
    }).catch(err=>console.error())
}