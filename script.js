window.addEventListener('load',function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d')
    console.log(ctx.fillStyle)
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //canvas setting
    ctx.strokeStyle = '#d62828';
    ctx.lineCap = 'round';
    
    //effect setting

    let size = canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.3;
    console.log(size)
    let sides = 8;
    let maxLevel = 8;
    let spread = 1;
    let branches = 2;
    let scale = 0.5;
    let color = 'hsl('+ Math.random() * 360 +' , 100% , 50%)';
    let lineWidth = Math.floor(Math.random() * 20 + 10);
    
    //controls
    const randomizeButton = document.getElementById('randomizeButton')
    const resetButton = document.getElementById('resetButton')

    const slider_spread = this.document.getElementById('spread');
    const label_spread = this.document.querySelector('[for="spread"]');
    
    slider_spread.addEventListener('change', function(e){
        console.log(e.target.value)
        spread = e.target.value
        updateSliders()
        drawFractal()
    })
    const sides_spread = this.document.getElementById('sides')
    const label_sides = this.document.querySelector('[for="sides"]');
    sides_spread.addEventListener('change', function(e){
        console.log(e.target.value)
        sides = e.target.value
        updateSliders()
        drawFractal()
    })
    //lines

    function drawBranch(level) {
        if(level > maxLevel) return ;
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(size,0)
        ctx.stroke();
        for(let i=0; i < branches ; i++){
            ctx.save();
            ctx.translate(size - (size/branches) * i,0);
            ctx.scale(scale,scale);

            ctx.save();
            
            ctx.rotate(spread);
            
            drawBranch(level+1);
            ctx.restore(); 

            ctx.restore(); 

        }
        ctx.beginPath();
        ctx.arc(0,size,size * 0.1,0,Math.PI * 2)
        ctx.fillStyle = color;
        ctx.fill();

        
    }
    


    function drawFractal() {
        ctx.clearRect(0,0,canvas.width,canvas.height)
        ctx.strokeStyle = color
        ctx.lineWidth = lineWidth;
        randomizeButton.style.background = color;
        //shadoweffects
        ctx.shadowColor = color;
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;
        ctx.shadowBlur = 20;
        ctx.save();
        ctx.translate(canvas.width/2,canvas.height/2)
        ctx.scale(0.5,0.7);
        ctx.rotate(-0.4);
        //ctx.fillRect(0,0,canvas.width,canvas.height);
    for(let i = 0; i < sides ; i++) {
    
       ctx.rotate(Math.PI * 2/sides)
        drawBranch(0)

        }
        
        
        ctx.restore()
    }

    drawFractal()


    function randomizeFractal(){
        
        randomizeButton.style.background = color;
        lineWidth = Math.floor(Math.random() * 20 + 5);
        sides = Math.floor(Math.random() * 7 + 2);
        spread =Math.random() * 0.2 + 0.4;
        scale = Math.random() * 0.2 + 0.4;
        color = 'hsl('+ Math.random() * 360 +' , 100% , 50%)';



        }
    randomizeButton.addEventListener('click', function() {
        updateSliders()
        randomizeFractal()
        drawFractal();
});

function updateSliders() {

    slider_spread.value = spread;
    label_spread.innerText = 'Spread ' + Number(spread).toFixed(2);
    label_sides.innerText = 'Sides ' + sides;
}

function resetFractal() {
    lineWidth = 10;
    sides = 4;
    spread = 0.2;
    scale = 0.1;
    color = 'hsl(155 , 100% , 50%)';

}
    resetButton.addEventListener('click',function(){
    resetFractal();
    updateSliders();
    drawFractal();

    window.addEventListener('resize',function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        size = canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.3;
        drawFractal();
    })
});

});