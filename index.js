/*
   var snow_intensity = 50; // smaller number = more snowflakes;
   
   function Snowflake(){
     var snowflake = this;
     snowflake.x = (Math.random() * $(document).width());
     snowflake.size = (Math.random() * 35) + 10;
     snowflake.opacity = Math.random();
     snowflake.body = $("<em class='snowflake'>*</em>");
     snowflake.body.css({'font-size': this.size + 'px', 'left': this.x +'px', opacity: this.opacity });
     snowflake.fall = function(){
       var that = this;
       var $snowflake = this.body;
       var swing_direction = 1;
       var swing_wave = Math.random() * 100;
       var interval = setInterval(function(){
         $snowflake.css({left: that.x + (swing_direction * swing_wave)});
         swing_direction = - swing_direction;
       }, 1000);
       var speed = (Math.random() * 3000) + 3000;
       $snowflake.animate({top: '100vh'}, speed, function(){
         clearInterval(interval);
         $snowflake.remove();
       });    
     }
     $('body').append(snowflake.body);
     snowflake.fall();
   }

   var snow = window.setInterval(function () {
      new Snowflake();
   }, snow_intensity);

   document.onkeypress = function () {
     window.clearInterval(snow);
   };
   
   function newCoords(max) {
    return Math.floor(((max+1)*Math.random()));
   }
   
   function moveSmoothly(element, newLeft, newTop) {
    const steps = 10;
    const timeSecs = 1;
    const stepTime = timeSecs / steps;
    let positionTop = 0;
    let positionLeft = 0;

let interval = setInterval(function() {
  const { bottom, right } = element.getBoundingClientRect();
  const clientW = window.innerWidth;
  const clientH = window.innerHeight;
  if (clientH - bottom !== newTop) {
    positionTop += 1;
    element.style.top = positionTop + 'px';
  }
  if (clientW - right !== newLeft) {
    positionLeft += 1;
    element.style.left = positionLeft + 'px';
  }
  //if (right === clientW && bottom === clientH) { clearInterval(interval); }
  if (right === clientW && bottom === clientH) { clearInterval(interval); }
}, stepTime*1000);
    //element.style.left = newLeft;
    //element.style.top = newTop;
   }
   
   function moveStars() {
    const stars = document.querySelectorAll('.star');
    stars.forEach( star => moveSmoothly(star, newCoords(90)+'%', newCoords(90)+'%') )
   }

   window.addEventListener('click', event => moveStars());
*/
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const snowflakes = [];
for (let i = 0; i < 200; i++) {
    snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 2 + 0.5,
    });
}

function drawSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snowflakes.forEach((flake) => {
        const gradient = ctx.createRadialGradient(
            flake.x,
            flake.y,
            0,
            flake.x,
            flake.y,
            flake.radius
        );
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.8)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

function updateSnowflakes() {
    snowflakes.forEach((flake) => {
        flake.y += flake.speed;
        if (flake.y > canvas.height) {
            flake.y = 0;
            flake.x = Math.random() * canvas.width;
        }
    });
}

function animate() {
    drawSnowflakes();
    updateSnowflakes();
    requestAnimationFrame(animate);
}

animate();
