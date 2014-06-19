/* ------------------------------------------------------------------------
Class: ICA 2 Multimidia
Author: Elvis Tavares Lirio
Author: Laerte Mercier Junior
Version: 1.0.0
-------------------------------------------------------------------------*/
var bateria, bateriaImage, canvas;
var audio = new Audio();

var sons = {
    audioChimbalCaixa: new Audio,
    audioChimbalBumbo: new Audio,
    audioCaixaBumbo: new Audio,
    audioPratoBumbo: new Audio,
    audioBumbo: new Audio,
    audioCaixa: new Audio,
    audioTom: new Audio,
    audioSurdo: new Audio,
    audioChimbal: new Audio,
    audioPrato: new Audio
};


sons.audioChimbalCaixa.src = document.getElementById("audioChimbalCaixa").src;
sons.audioChimbalBumbo.src = document.getElementById("audioChimbalBumbo").src;
sons.audioCaixaBumbo.src = document.getElementById("audioCaixaBumbo").src;
sons.audioPratoBumbo.src = document.getElementById("audioPratoBumbo").src;
sons.audioBumbo.src = document.getElementById("audioBumbo").src;
sons.audioCaixa.src = document.getElementById("audioCaixa").src;
sons.audioTom.src = document.getElementById("audioTom").src;
sons.audioSurdo.src = document.getElementById("audioSurdo").src;
sons.audioChimbal.src = document.getElementById("audioChimbal").src;
sons.audioPrato.src = document.getElementById("audioPrato").src;
var frameIndex = {
    chimbalCaixa: 1,
    chimbalBumbo: 2,
    caixaBumbo: 3,
    pratoBumbo: 4,
    chimbal: 5,
    tom: 6,
    caixa: 7,
    bumbo: 8,
    surdo: 9,
    prato: 10
};
var pecas = { 32: false, 68: false, 71: false, 72: false, 84: false, 89: false };

function animarPeca(frameIndex, a, tempo) {
    audio = a;
    bateria.render(frameIndex);
    audio.play();
    setTimeout("bateria.render(0);audio.pause();audio.currentTime = 0;", tempo);
    console.log('animar pe�a');

}

$(document).keydown(function (e) {

    var isNN = (navigator.appName.indexOf("Netscape") != -1);
    var keyCode = (isNN) ? e.which : e.keyCode;
    if (keyCode in pecas) {
        pecas[keyCode] = true;

        console.clear();
        //execu��o das pe�as. Primeiros verificamos as combina��es, depois as pe�as isoladamente.
        //chimbal e caixa
        if (pecas[84] && pecas[68]) {
            animarPeca(frameIndex.chimbalCaixa, sons.audioChimbalCaixa, 100);
        }
            //chimbal+bumbo
        else if (pecas[84] && pecas[32]) {
            animarPeca(frameIndex.chimbalBumbo, sons.audioChimbalBumbo, 100);
        }
            //caixa+bumbo
        else if (pecas[68] && pecas[32]) {
            animarPeca(frameIndex.caixaBumbo, sons.audioCaixaBumbo, 200);
        }
            //prato+bumbo
        else if (pecas[89] && pecas[32]) {
            animarPeca(frameIndex.pratoBumbo, sons.audioPratoBumbo, 200);
        }
        else if (pecas[32]) {
            animarPeca(frameIndex.bumbo, sons.audioBumbo, 100);
        }
        else if (pecas[68]) {
            animarPeca(frameIndex.caixa, sons.audioCaixa, 200);
        }
        else if (pecas[71]) {
            animarPeca(frameIndex.tom, sons.audioTom, 100);
        }
        else if (pecas[72]) {
            animarPeca(frameIndex.surdo, sons.audioSurdo, 100);
        }
        else if (pecas[84]) {
            animarPeca(frameIndex.chimbal, sons.audioChimbal, 100);
        }
        else if (pecas[89]) {
            animarPeca(frameIndex.prato, sons.audioPrato, 200);
        }

    }
}).keyup(function (e) {
    var isNN = (navigator.appName.indexOf("Netscape") != -1);
    var keyCode = (isNN) ? e.which : e.keyCode;

    if (keyCode in pecas) {
        pecas[keyCode] = false;
    }
}).ready(function () {

    bateriaImage.src = "images/spriteBateria.png";
    setTimeout("bateria.render(11)", 200);

});

// obter canvas
canvas = document.getElementById("animacaoBateria");
canvas.width = 500;
canvas.height = 500;
// Create sprite sheet
bateriaImage = new Image();
// Criar sprite
bateria = sprite({
    context: canvas.getContext("2d"),
    width: 6000,
    height: 500,
    image: bateriaImage,
    numeroDeFrames: 12
});


function sprite(opcoes) {
    var that = {},
    numeroDeFrames = opcoes.numeroDeFrames || 1;
    that.context = opcoes.context;
    that.width = opcoes.width;
    that.height = opcoes.height;
    that.image = opcoes.image;
    that.render = function (frameIndex) {
        // limpa o canvas
        that.context.clearRect(0, 0, that.width, that.height);
        // desenha a imagem
        that.context.drawImage(
                that.image,
                frameIndex * that.width / numeroDeFrames,
                0,
                that.width / numeroDeFrames,
                that.height,
                0,
                0,
                that.width / numeroDeFrames,
                that.height);
    };
    return that;
}