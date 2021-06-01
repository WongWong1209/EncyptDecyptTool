function CyptRadio() {
    var enterTitle = document.getElementById("enterTitle");
    var cyptBtn = document.getElementById("cyptBtn");

    if(document.getElementsByName("cypt")[0].checked) {
        enterTitle.innerHTML = "輸入要加密的文字(限英文)：";
        cyptBtn.innerHTML = "加密";
    }
    else if(document.getElementsByName("cypt")[1].checked) {
        enterTitle.innerHTML = "輸入要解密的文字(限英文)：";
        cyptBtn.innerHTML = "解密";
    }
}


function StartCypt() {
    if(document.getElementsByName("cypt")[0].checked) {
        Encrypt();
    }
    else if(document.getElementsByName("cypt")[1].checked) {
        Decrypt();
    }
}

var keyInt = 0;
var sentence = "";
var sentenceTran = "";
var isInSample = false;
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var alphabetTran = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

function Encrypt() {
    sentence = document.getElementById("enterBox").value;

    TranTheAlphabet();

    TranTheSentence();

    document.getElementById("outputBox").value = sentenceTran;

    VariableInit();
}

function Decrypt() {
    sentenceTran = document.getElementById("enterBox").value;

    DeTranTheAlphabet();

    DeTranSentence();

    document.getElementById("outputBox").value = sentence;

    VariableInit();
}

function TranTheAlphabet() {
    keyInt = getRandomInt(2, 27);

    for(var i=0; i<alphabet.length-keyInt+1; i++) {
        alphabetTran[i] = alphabet[keyInt-1+i];
    }
    for(var i=0; i<keyInt-1; i++) {
        alphabetTran[alphabet.length-keyInt+1+i] = alphabet[i];
    }
}

function TranTheSentence() {
    isInSample = false;

    sentenceTran += alphabet[keyInt-1];

    for(var i=0; i<sentence.length; i++) {
        for(var j=0; j<alphabet.length; j++) {
            if(sentence[i].toString() == alphabet[j]) {
                sentenceTran += alphabetTran[j];
                isInSample = true;
            }
        }
        
        if(!isInSample) {
            sentenceTran += sentence[i];
        }

        isInSample = false;
    }
}

function DeTranTheAlphabet() {
    for(var i=0; i<alphabet.length; i++) {
        if(sentenceTran[0].toString() == alphabet[i]) {
            keyInt = i+1;
        }
    }
    
    for(var i=0; i<alphabet.length-keyInt+1; i++) {
        alphabetTran[i] = alphabet[keyInt-1+i];
    }
    for(var i=0; i<keyInt-1; i++) {
        alphabetTran[alphabet.length-keyInt+1+i] = alphabet[i];
    }
}

function DeTranSentence() {
    isInSample = false;

    var newSentenceTran = "";
    for(var i=0; i<sentenceTran.length-1; i++) {
        newSentenceTran += sentenceTran[i+1];
    }

    for(var i=0; i<newSentenceTran.length; i++) {
        for(var j=0; j<alphabetTran.length; j++) {
            if(newSentenceTran[i].toString() == alphabetTran[j]) {
                sentence += alphabet[j];
                isInSample = true;
            }
        }
        
        if(!isInSample) {
            sentence += newSentenceTran[i];
        }

        isInSample = false;
    }
}

function VariableInit() {
    keyInt = 0;
    sentence = "";
    sentenceTran = "";
    isInSample = false;
    alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    alphabetTran = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function ClearBox() {
    document.getElementById("enterBox").value = "";
    document.getElementById("outputBox").value = "";
}

function Copy() {
  var copyText = document.getElementById("outputBox");

  copyText.select();
  copyText.setSelectionRange(0, 99999);

  document.execCommand("copy");
}