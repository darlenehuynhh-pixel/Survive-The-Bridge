document.addEventListener('DOMContentLoaded', () => {
    const car_div = document.getElementById("car"); 
    const accelerate_button= document.getElementById("gas");
    const stop_button= document.getElementById("break"); 
    let intervalId=null;
    accelerate_button.addEventListener("click",()=>{
        if(intervalId==null){
            intervalId=setInterval(goForward, 500);
        }
    });
    stop_button.addEventListener("click",stop)
    let x = 0;
    function goForward(){
        x+=50;
        /*if the car goes off the screeen on the left it resets on the right*/ 
        if (x > window.innerWidth) {
            x = 0; // reset to just off-screen left
            stop();
        }
        car_div.style.left= x+"px";
        console.log(x);
    }

    function stop(){
        clearInterval(intervalId);
        intervalId=null;
        console.log("stopped");
    }



});


