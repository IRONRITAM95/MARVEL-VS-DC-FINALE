marvel = "" ;
dc = "" ; 
leftwristx = "" ;
leftwristy = "" ;
rightwristx = "" ;
rightwristy = "" ;
leftwristscore = 0;
rightwristscore = 0;
status = "";
status2 ="";

function preload(){
    marvel = loadSound("MCU.mp3");
    dc = loadSound("DCEU.mp3");
}

function setup(){
    canvas = createCanvas(680,440);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video,modelLoaded);
    posenet.on('pose',posegot);
}

function modelLoaded(){
    console.log("POSENET INITIALIZED");
}

function posegot(results){
if(results.length>0){
    console.log(results);
    leftwristx = results[0].pose.leftWrist.x ;
    leftwristy = results[0].pose.leftWrist.y ;
    rightwristx = results[0].pose.rightWrist.x ;
    rightwristy = results[0].pose.rightWrist.y ;
    leftwristscore = results[0].pose.keypoints[9].score ;
    rightwristscore = results[0].pose.keypoints[10].score ;
}
}

function draw(){
    image(video,0,0, 680,440);
    fill("red");
    stroke("red");
    status = marvel.isPlaying();

    if(leftwristscore > 0.2){
        circle(leftwristx.leftwristy,20);
        dc.stop();
        if(status == false){
            marvel.play();
            document.getElementById("name").innerHTML = "SONG PLAYING= MARVEL" ;
        }
    }

    status2 = dc.isPlaying() ;

    if(rightwristscore > 0.2){
        circle(rightwristx,rightwristy,20);
        marvel.stop();
        if(status2 == false){
            dc.play();
            document.getElementById("name").innerHTML = "SONG PLAYING = DC";
        }
    }
}