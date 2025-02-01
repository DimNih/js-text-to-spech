function speakText() {
    const text = document.getElementById('text-input').value.trim();
    if (!text) {
        showToast('Silakan masukkan teks terlebih dahulu', 'error');
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = document.getElementById('voice-select').value;
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices.find(voice => voice.name === selectedVoice);

    utterance.onstart = () => {
        document.querySelectorAll('button').forEach(btn => btn.disabled = true);
    };

    utterance.onend = () => {
        document.querySelectorAll('button').forEach(btn => btn.disabled = false);
    };

    speechSynthesis.speak(utterance);
}

// Voice Selection
window.speechSynthesis.onvoiceschanged = () => {
    const voices = speechSynthesis.getVoices();
    const voiceSelect = document.getElementById('voice-select');
    voiceSelect.innerHTML = voices.map(voice => 
        `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
    ).join('');
};

// Audio Recording
let mediaRecorder;
let audioChunks = [];
const statusIndicator = document.querySelector('.status-indicator');

document.getElementById('record-btn').addEventListener('click', async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        
        mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
        
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            
            document.getElementById('audio-playback').src = audioUrl;
            document.getElementById('download-link').href = audioUrl;
            document.getElementById('download-link').classList.remove('hidden');
            audioChunks = [];
            statusIndicator.classList.add('hidden');
        };

        mediaRecorder.start();
        toggleRecordingState(true);
        showToast('Sedang merekam...', 'info');
        statusIndicator.classList.remove('hidden');
        statusIndicator.classList.add('recording');
    } catch (error) {
        showToast('Akses mikrofon diperlukan', 'error');
    }
});

document.getElementById('stop-btn').addEventListener('click', () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        toggleRecordingState(false);
        showToast('Rekaman berhasil disimpan', 'success');
    }
});

// Helper Functions
function toggleRecordingState(isRecording) {
    document.getElementById('record-btn').disabled = isRecording;
    document.getElementById('stop-btn').disabled = !isRecording;
}

function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 3000);
}

// Initialization
window.onload = () => {
    if (!('speechSynthesis' in window)) {
        showToast('Browser tidak mendukung fitur text-to-speech', 'error');
    }
};