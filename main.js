video="";
status="";
objects=[];
function preload(){
   video=createVideo("video.mp4");
  
}
function setup(){
   canvas=createCanvas(600,600);
   video.hide();
}
function draw(){
   image(video,0,0,600,600);
   if(status!=""){
      objectDetector.detect(video,gotResults);
      for(i=0;i<objects.length;i++){
         document.getElementById("status").innerHTML="Status: Objects Detected!";
         document.getElementById("num_obj").innerHTML="Number of objects detected are"+objects.length;
         fill("skyblue");
         stroke("skyblue");
         noFill();
         percent=floor(objects[i].confidence*100)
         text(objects[i].label+""+percent+"%", objects[i].x+15,objects[i].y+15)
         rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
      }
   }
}
function start(){
   document.getElementById("status").innerHTML="Status: Detecting Objects...";
   objectDetector=ml5.objectDetector('cocossd', modelLoaded);
}
function modelLoaded(){
   console.log("Model Loaded!");
   status=true;
   video.loop();
   video.speed(1);
   video.volume(1);
}
function gotResults(error, results){
   if(error){
      console.error(error);
   }
   else{
      console.log(results);
      objects=results;
   }
}
