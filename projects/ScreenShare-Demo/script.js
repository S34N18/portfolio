let mediaStream = null;
let audioContext = null;
let audioDestination = null;

async function startScreenShare() {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true, // You can enable audio capture if needed
        });
        
        mediaStream = stream;
        const videoElement = document.getElementById('screen-preview');
        videoElement.srcObject = stream;
        

          //audio implementation
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioDestination = audioContext.createMediaStreamDestination();

        stream.getAudioTracks().forEach(track => {
            const audioNode = audioContext.createMediaStreamSource(track);
            audioNode.connect(audioDestination);
        });

        videoElement.srcObject = new MediaStream([
            stream.getVideoTracks()[0],
            audioDestination.stream.getAudioTracks()[0]
        ])




        // Toggle buttons
        document.getElementById('startBtn').style.display = 'none';
        document.getElementById('stopBtn').style.display = 'block';

        // Listen for stopped event to clean up
        stream.getVideoTracks()[0].addEventListener('ended', () => {
            stopScreenShare();
        });

    } catch (error) {
        console.error('Error accessing screen share:', error);
        document.getElementById('error-message').textContent = 'Could not access screen share. Please try again.';
    }
}

function stopScreenShare() {
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        mediaStream = null;


        if (audioContext) {
            audioContext.close();
            audioContext = null;
        }

        // Toggle buttons
        document.getElementById('startBtn').style.display = 'block';
        document.getElementById('stopBtn').style.display = 'none';
    }
}
