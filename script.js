class MeditationApp {
    constructor() {
        this.backgroundAudio = document.getElementById('background-audio');
        this.bellAudio = document.getElementById('bell-audio');
        this.startBtn = document.getElementById('start-btn');
        this.stopBtn = document.getElementById('stop-btn');
        this.timeDisplay = document.getElementById('time');
        this.timerOptions = document.querySelectorAll('.timer-option');
        
        this.timer = null;
        this.remainingTime = 15 * 60; // Default to 15 minutes
        this.selectedMinutes = 15;
        
        this.initializeEventListeners();
        this.updateDisplay();
    }
    
    initializeEventListeners() {
        this.startBtn.addEventListener('click', () => this.startMeditation());
        this.stopBtn.addEventListener('click', () => this.stopMeditation());
        
        // Timer option buttons
        this.timerOptions.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const minutes = parseInt(e.target.dataset.minutes);
                this.setTimer(minutes);
                this.updateActiveButton(e.target);
            });
        });
    }
    
    updateActiveButton(activeButton) {
        this.timerOptions.forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');
    }
    
    setTimer(minutes) {
        this.selectedMinutes = minutes;
        this.remainingTime = minutes * 60;
        this.updateDisplay();
        
        // Reset buttons if changing time during meditation
        if (this.timer) {
            this.stopMeditation();
        }
    }
    
    startMeditation() {
        if (this.remainingTime <= 0) {
            this.remainingTime = this.selectedMinutes * 60;
            this.updateDisplay();
        }
        
        this.backgroundAudio.play().catch(e => console.log('Audio play failed:', e));
        this.startBtn.disabled = true;
        this.stopBtn.disabled = false;
        
        // Disable timer options during meditation
        this.timerOptions.forEach(btn => btn.disabled = true);
        
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
        this.remainingTime = this.selectedMinutes * 60;
        this.updateDisplay();
    }
    
    endMeditation() {
        clearInterval(this.timer);
        this.backgroundAudio.pause();
        this.backgroundAudio.currentTime = 0;
        
        this.bellAudio.play().catch(e => console.log('Bell audio play failed:', e));
        
        this.startBtn.disabled = false;
        this.stopBtn.disabled = true;
        
        // Re-enable timer options
        this.timerOptions.forEach(btn => btn.disabled = false);
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
