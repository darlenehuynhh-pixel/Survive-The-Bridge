document.addEventListener('DOMContentLoaded', () => {
    /**
     * These are the variables used 
     */
    const car_div = document.getElementById("car"); 
    const accelerate_button= document.getElementById("pedal-gas");
    const stop_button= document.getElementById("pedal-brake"); 
    const light= document.getElementById("lights");
    let intervalId=null;
    let car_status="stopped";
    let x = 20;
    const timer = document.getElementById("time-left");
    let timeLeft= 30;
    let timerIntervalId=null;
    let lightStatus = "green"; 
    let lightIntervalId = null
    let gameStarted=false;
    let gameOver=false;

    // These are all the event listeners 
    document.addEventListener('keydown',(e) => {
        if(car_status==="stopped"){
            if (e.key === 'ArrowUp') { // 's' is the key
                forwardLoop();
            }
        }
    });
    // adds a event Listener when the gas button is clicked the car goes forward
    accelerate_button.addEventListener('click',forwardLoop);
    // adds a event Listener when the brake button is clicked the car stops at it spot 
    stop_button.addEventListener('click',stop);
    // this is a event listner 
    document.addEventListener('keydown',(e) => {
        if(car_status==="moving"){
            if (e.key === 'ArrowDown') { // 's' is the key
                stop();
            }
        }
    });

    // From here its function used to make the game able to run and make the timer go down. 
    function forwardLoop(){
        if (gameOver) {
            return;
        }
        if (!gameStarted) {
            gameStarted = true;
            startTimer();
            lightStatus = "green";
            light.style.backgroundColor = "green";
            lightTimeoutId = setTimeout(switchLight, 3000);
        }

        if (intervalId == null) {
            intervalId = setInterval(goForward, 100); // smoother movement
        }
    }
    //This function makes the car go  forwars of 50px 
    function goForward(){
        if (gameOver) {
            return;
        }
        x+=20;
        /*if the car goes off the screeen on the left it resets on the right*/ 
        if (x > window.innerWidth) {
            x = 0; // reset to the left
            stop();
        }
        car_div.style.left= x+"px";
        car_status="moving"
    }
    // This function makes the car stop at the position it is at by stopping the interval.
    function stop(){
        clearInterval(intervalId);
        intervalId=null;
        car_status="stopped";
    }

    function startTimer(){
        if(timerIntervalId === null){
            timerIntervalId = setInterval(() => {
                timeLeft--;
                timer.textContent = formatTime(timeLeft);

                if(timeLeft <= 0){
                    clearInterval(timerIntervalId);
                    timerIntervalId = null;
                    gameover();
                }
            }, 1000);
        }
    }
    // This funtion was taken from AI and not written by us.
    function formatTime(seconds) {
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = seconds % 60;
        
        // Add leading zeros if needed
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    // The switchLight and randomBetween was made by AI not by us
    function switchLight() {
        if (gameOver) {
            return;
        }
        if (lightStatus === "green") {
            lightStatus = "red";
            light.style.backgroundColor="red";
            // if car is still moving → game over
           setTimeout(() => {
                if (car_status === "moving"){
                    gameover();
                }
            }, 400);
            // schedule next green after random delay
            setTimeout(switchLight, randomBetween(2000, 4000));
        } 
        else {
            lightStatus = "green";            
            light.style.backgroundColor="green";
            // schedule next red after random delay
            setTimeout(switchLight, randomBetween(2000, 5000));
        }
    }
    function randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    function gameover(){
        gameOver=true;
        stop();
        clearInterval(timerIntervalId);
        timerIntervalId = null;
        clearTimeout(lightTimeoutId);
    }
});