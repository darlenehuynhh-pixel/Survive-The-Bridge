document.addEventListener('DOMContentLoaded', () => {
    const car_div = document.getElementById("car"); 
    const accelerate_button= document.getElementById("pedal-gas");
    const stop_button= document.getElementById("pedal-brake"); 
    let intervalId=null;
    let car_status="stopped";

    document.addEventListener('keydown',(e) => {
        if(car_status==="stopped"){
            if (e.key === 'ArrowUp') { // 's' is the key
                forwardLoop();
            }
        }
    });
    
    accelerate_button.addEventListener("click",forwardLoop);

    
    stop_button.addEventListener("click",stop);

    document.addEventListener('keydown',(e) => {
        if(car_status==="moving"){
            if (e.key === 'ArrowDown') { // 's' is the key
                stop();
            }
        }
    });

    function forwardLoop(){
        if(intervalId==null){
            intervalId=setInterval(goForward, 500);
        }
    }


    let x = 0;

    function goForward(){
        x+=50;
        /*if the car goes off the screeen on the left it resets on the right*/ 
        if (x > window.innerWidth) {
            x = 0; // reset to THleft
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

    function checkStatus(){
        
    }
});


