class MeditationApp {
    constructor() {
        this.backgroundAudio = document.getElementById('background-audio');
        this.bellAudio = document.getElementById('bell-audio');
        this.startBtn = document.getElementById('start-btn');
        this.stopBtn = document.getElementById('stop-btn');
        this.timeDisplay = document.getElementById('time');
        this.timer = null;
        this.remainingTime = 0;
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        this.startBtn.addEventListener('click', () => this.startMeditation());
        this.stopBtn.addEventListener('click', () => this.stopMeditation());
        
        document.querySelectorAll('.timer-controls button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const minutes = parseInt(e.target.dataset.minutes);
                this.setTimer(minutes);
            });
        });
        
        document.getElementById('start-custom').addEventListener('click', () => {
            const customMinutes = parseInt(document.getElementById('custom-minutes').value);
            if (customMinutes > 0) {
                this.setTimer(customMinutes);
            }
        });
    }
    
    setTimer(minutes) {
        this.remainingTime = minutes * 60;
        this.updateDisplay();
    }
    
    startMeditation() {
        if (this.remainingTime <= 0) return;
        
        this.backgroundAudio.play().catch(e => console.log('Audio play failed:', e));
        this.startBtn.disabled = true;
        this.stopBtn.disabled = false;
        
        this.timer = setInterval(() => {
            this.remainingTime--;
            this.updateDisplay();
            
            if (this.remainingTime <= 0) {
                this.endMeditation();
            }
        }, 1000);
    }
    
    stopMeditation() {
        this.endMeditation();
    }
    
    endMeditation() {
        clearInterval(this.timer);
        this.backgroundAudio.pause();
        this.backgroundAudio.currentTime = 0;
        
        this.bellAudio.play().catch(e => console.log('Bell audio play failed:', e));
        
        this.startBtn.disabled = false;
        this.stopBtn.disabled = true;
        this.timeDisplay.textContent = '00:00';
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.remainingTime / 60);
        const seconds = this.remainingTime % 60;
        this.timeDisplay.textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MeditationApp();
});
