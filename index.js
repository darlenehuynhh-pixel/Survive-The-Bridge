document.addEventListener('DOMContentLoaded', () => {
    /**
     * This is the variables used 
     */
    const car_div = document.getElementById("car"); 
    const accelerate_button= document.getElementById("pedal-gas");
    const stop_button= document.getElementById("pedal-brake"); 
    let intervalId=null;
    let car_status="stopped";
    let x = 20;
    const timer = document.getElementById("time-left");
    let timeLeft= 30;
    let timerIntervalId=null;


    document.addEventListener('keydown',(e) => {
        if(car_status==="stopped"){
            if (e.key === 'ArrowUp') { // 's' is the key
                forwardLoop();
            }
        }
    });
    accelerate_button.addEventListener('click',forwardLoop);
    stop_button.addEventListener('click',stop);
    document.addEventListener('keydown',(e) => {
        if(car_status==="moving"){
            if (e.key === 'ArrowDown') { // 's' is the key
                stop();
            }
        }
    });
    // From here its function used to make the game able to run and make the timer go down. 
    function forwardLoop(){
        if(intervalId==null){
            intervalId=setInterval(goForward, 500);
            if(timerIntervalId === null){
                timerIntervalId = setInterval(() => {
                    timeLeft--;
                    timer.textContent = formatTime(timeLeft);

                    if(timeLeft <= 0){
                        clearInterval(timerIntervalId);
                        timerIntervalId = null;
                        stop();
                        
                    }
                }, 1000);
            }
        }
    }

    function goForward(){
        x+=50;
        /*if the car goes off the screeen on the left it resets on the right*/ 
        if (x > window.innerWidth) {
            x = 0; // reset to the left
            stop();
        }
        car_div.style.left= x+"px";
        car_status="moving"
        
    }

    function stop(){
        clearInterval(intervalId);
        intervalId=null;
        car_status="stopped";
        
    }
    // This funtion was taken from AI and not written by us.
    function formatTime(seconds) {
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = seconds % 60;
        
        // Add leading zeros if needed
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    
});


