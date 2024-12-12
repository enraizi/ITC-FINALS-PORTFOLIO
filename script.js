    window.addEventListener('scroll', function() 
    {
        // Get the position of the Skills section
        const skillsSection = document.querySelector('#skills');
        const aboutSection = document.querySelector('#aboutme');

        const nav = document.querySelector('nav');
        const navLinks = document.querySelectorAll('nav a');

        
        const section1Position = aboutSection.getBoundingClientRect().top;
        const section2Position = skillsSection.getBoundingClientRect().top;

        // Change color when the section is in view
        if (section1Position <= window.innerHeight / 10) {
             // Change navbar background
            navLinks.forEach(link => link.style.color = '#ffffff'); // Change link color
        } 
        
        else if (section2Position <= window.innerHeight / 10) {
            // Change navbar background
           navLinks.forEach(link => link.style.color = '#ffffff'); // Change link color
       } 
       
        else {
            nav.style.backgroundColor = 'transparent'; // Revert to original
            navLinks.forEach(link => link.style.color = 'white'); // Revert link color
        }
    });

    // Menu Bar
    const toggleBtn = document.querySelector('.toggle_btn');
        const toggleBtnIcon = document.querySelector('.toggle_btn i');
        const dropDownMenu = document.querySelector('.dropdown_menu');

        toggleBtn.onclick = function(){
            dropDownMenu.classList.toggle('open');
            const isOpen = dropDownMenu.classList.contains('open');

            toggleBtnIcon.classList = isOpen
            ? 'fa-solid fa-xmark'
            : 'fa-solid fa-bars'

        } 

// Star and Comet Animation
let canvas, ctx, w, h, moon, stars = [], meteors = [];

function init(){
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");
    resizeReset();
    moon = new Moon();
    for(let a = 0; a < w * h * 0.0001; a++){
        stars.push(new Star());
    }
    for(let b = 0; b < 2; b++){
        meteors.push(new Meteor());
    }
    animationLoop();
}

function resizeReset(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}

function animationLoop(){
    ctx.clearRect(0, 0, w, h);
    drawScene(); 
    requestAnimationFrame(animationLoop);
}

function drawScene(){
    // moon.update(); // Update moon properties
    // moon.draw();   // Draw moon with updated properties
    stars.map((star) => {
        star.update();
        star.draw();
    });
    meteors.map((meteors) => {
        meteors.update();
        meteors.draw();

    });
}

class Moon {
    constructor() {
        this.x = 150;
        this.y = 150;
        this.size = 70;
        this.blurSpeed = 0.1; // Adjust the speed as needed
        this.shadowBlur = 70;
    }

    draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.shadowColor = "rgba(254, 247, 144, .7)";
        ctx.shadowBlur = this.shadowBlur;
        ctx.fillStyle = "rgba(254, 247, 144, 1)";
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    update() {
        // Update the shadowBlur property
        this.shadowBlur += this.blurSpeed;

        // Reset the shadowBlur when it reaches a certain value
        if (this.shadowBlur > 100 || this.shadowBlur < 50) {
            this.blurSpeed = -this.blurSpeed;
        }
    }
}

class Star{
    constructor(){
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() + 0.5;
        this.blinkChance = 0.005;
        this.alpha = 1;
        this.alphaChange = 0;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.fill();
        ctx.closePath();

    }

    update(){
        if(this.alphaChange === 0 && Math.random() < this.blinkChance){
            this.alphaChange = -1;
        }
        else if(this.alphaChange !== 0){
            this.alpha += this.alphaChange * 0.05;
            if(this.alpha <= 0){
                this.alphaChange = 1;
            }
            else if(this.alpha >= 1){
                this.alphaChange = 0;
            }
        }
    }
}

class Meteor {
    constructor() {
        this.reset();
        
    }

    reset() {
        this.x = Math.random() * w + 300;
        this.y = -100;
        this.size = Math.random() * 2 + 0.5;
        this.speed = (Math.random() + 0.5) * 5;
    }

    draw() {
        ctx.save();
        ctx.strokeStyle = "rgba(255, 255, 255, .1)";
        ctx.lineCap = "round";
        ctx.shadowColor = "white";
        ctx.shadowBlur = 8;
        for (let i = 0; i < 10; i++) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineWidth = this.size;
            ctx.lineTo(this.x + 10 * (i + 1), this.y - 10 * (i + 1));
            ctx.stroke();
            ctx.closePath();
        }
        ctx.restore();
    }

    update() {
        this.x -= this.speed;
        this.y += this.speed;
        if (this.y >= h + 100) {
            this.reset();
        }
    }
}




window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resizeReset);

