prediction1 = "";

Webcam.set({
    width : 350,
    height : 300,
    image_format : "png",
    png_quality : 90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_img" src="'+data_uri+'"/>'
    });
}

console.log("ml5 version", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/wrdiLTvYI/model.json", modelLoaded);

function modelLoaded(){
    console.log("model has loaded")
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The prediction is " + prediction1;
    var utterThis = new SpeachSynthesisUtterance(speak_data_1);
    utterThis.rate = 0.5
    synth.speak(utterThis);
}

function prediction(){
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction1 = results[0].label;
        speak();
        if(results[0].label == "Thumbs Up"){
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if(results[0].label == "Peace Sign"){
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }
        if(results[0].label == "Vulcan Salute"){
            document.getElementById("update_emoji").innerHTML = "&#128406;";
        }
        if(results[0].label == "Rock"){
            document.getElementById("update_emoji").innerHTML = "&#129304;";
        }
        if(results[0].label == "Fist Bump"){
            document.getElementById("update_emoji").innerHTML = "&#9994;";
        }
    }
}