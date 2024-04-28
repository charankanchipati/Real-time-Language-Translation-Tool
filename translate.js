let langoption=document.querySelectorAll("select");
let fromtext=document.querySelector(".fromtext");
let translated=document.querySelector(".totext");
let fromVoice=document.querySelector(".from");
let ToVoice=document.querySelector(".to");
let cpy=document.querySelector(".bx-copy");
let count=document.querySelector(".text_lenght");
let exchane=document.querySelector(".bx-transfer");
let voicetoText=document.querySelector(".bx-microphone");
// selection is language
langoption.forEach((get,con) => {
    for(let code in language){
        let selected;
        if(con==0&&code=="en-GB"){
            selected="selected";
        }
        else if(con==1&&code=="te-IN"){
            selected="selected";
        }
        let option=`<option value="${code}" ${selected}>${language[code]}</option>`;
        get.insertAdjacentHTML("beforeend",option)
    }
});
// transulation of language
fromtext.addEventListener('input',function(){
    let cont=fromtext.value;
    fromCont=langoption[0].value;
    ToCont=langoption[1].value;
    let transu=`https://api.mymemory.translated.net/get?q=${cont}!&langpair=${fromCont}|${ToCont}`;
    fetch(transu).then(translated => translated.json()).then(data =>{
        translated.value=data.responseData.translatedText;
    })
})
// Voice of Text
fromVoice.addEventListener('click',function(){
    let voice;  
    voice=new SpeechSynthesisUtterance(fromtext.value);
    voice.lang=langoption[0].value;
    speechSynthesis.speak(voice);
})
// Voice of transulated text
ToVoice.addEventListener('click',function(){
    let voice;  
    voice=new SpeechSynthesisUtterance(translated.value);
    voice.lang=langoption[1].value;
    speechSynthesis.speak(voice);
})
// copy of text
cpy.addEventListener('click',function(){
    navigator.clipboard.writeText(translated.value); 
})
// counting of letters
fromtext.addEventListener('keyup',function(){
    count.innerHTML=`${fromtext.value.length}/10,000`;
})
// transfer(exchange) of languages
exchane.addEventListener('click',function(){
    let temp=fromtext.value;
    fromtext.value=translated.value;
    translated.value=temp;

    let tempoption=langoption[0].value;
    langoption[0].value=langoption[1].value;
    langoption[1].value=tempoption;
})
// Voice to Text
voicetoText.addEventListener('click',function(){
    var speech = true;
    window.SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')
        document.getElementById("convert").innerHTML = transcript;
        console.log(transcript);
    });
    if (speech == true) {
        recognition.start();
    }
})