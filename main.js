Webcam.set({
    width: 350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');
function snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/G0uz0p846/model.json', modelLoaded);
function modelLoaded(){
    console.log("modelLoaded");
}
function speak(){
    var  synth = window.speechSynthesis;
    speak_data1 = "the first prediction is" +prediction_1;
    speak_data2 = "and the second prediction is" +prediction_2;
    var utterthis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterthis);
}
function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, got_results);
}
function got_results(error, results){
if(error){
    console.error(error);
}
else{
    console.log(results);
    document.getElementById("result_gesture_name").innerHTML = results[0].label;
    document.getElementById("result_gesture_name2").innerHTML = results[1].label;
    prediction_1 = results[0].label;
    prediction_2 = results[1].label;
    speak();
    if(results[0].label == "this is lookin amazing"){
        document.getElementById("update_gesture").innerHTML = "&#128076;";
    }
    if(results[0].label == "all the best"){
        document.getElementById("update_gesture").innerHTML = "&#128077;";
    }
    if(results[0].label == "this was a marvolous victory"){
        document.getElementById("update_gesture").innerHTML = "&#9996;";
    }
    if(results[1].label == "this is looking amazing"){
        document.getElementById("update_gesture2").innerHTML = "&#128076;";
    }
    if(results[1].label == "all the best"){
        document.getElementById("update_gesture2").innerHTML = "&#128077;";
    }
    if(results[1].label == "this was a marvelous victory"){
        document.getElementById("update_gesture2").innerHTML = "&#9996;";
    }
}
}