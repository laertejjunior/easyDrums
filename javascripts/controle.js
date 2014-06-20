/* ------------------------------------------------------------------------
Class: ICA 2 Multimidia
Author: Elvis Tavares Lirio
Author: Laerte Mercier Junior
Version: 1.0.0
-------------------------------------------------------------------------*/
var bateria, bateriaImage, canvas;

var pecas = { 32: false, 68: false, 71: false, 72: false, 84: false, 89: false };

var baseSom = {
    i: 0,
    init: function () {
        this.i = 0;
        for (j=0;j <= 15; j++){
            this[j] = new Audio;
        }
        return (this);
    },
    ponteiro: function () {
        if (i > 14) {
            i = 0;
        }
        return i++;
    },
    0: new Audio, 1: new Audio, 2: new Audio, 3: new Audio, 4: new Audio, 5: new Audio, 6: new Audio,
    7: new Audio, 8: new Audio, 9: new Audio, 10: new Audio, 11: new Audio, 12: new Audio, 13: new Audio,
    14: new Audio, 15: new Audio
}

var sons = {
    audioChimbalCaixas: Object.create(baseSom).init(),
    audioChimbalBumbos: Object.create(baseSom).init(),
    audioCaixaBumbos: Object.create(baseSom).init(),
    audioPratoBumbos: Object.create(baseSom).init(),
    audioBumbos: Object.create(baseSom).init(),
    audioCaixas: Object.create(baseSom).init(),
    audioTons: Object.create(baseSom).init(),
    audioSurdos: Object.create(baseSom).init(),
    audioChimbals: Object.create(baseSom).init(),
    audioPratos: Object.create(baseSom).init()
};

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

inicializaAudio(sons.audioChimbalCaixas, document.getElementById("audioChimbalCaixa").src, 15);
inicializaAudio(sons.audioChimbalBumbos, document.getElementById("audioChimbalBumbo").src, 15);
inicializaAudio(sons.audioCaixaBumbos, document.getElementById("audioCaixaBumbo").src, 15);
inicializaAudio(sons.audioPratoBumbos, document.getElementById("audioPratoBumbo").src, 15);
inicializaAudio(sons.audioBumbos, document.getElementById("audioBumbo").src, 15);
inicializaAudio(sons.audioCaixas, document.getElementById("audioCaixa").src, 15);
inicializaAudio(sons.audioTons, document.getElementById("audioTom").src, 15);
inicializaAudio(sons.audioSurdos, document.getElementById("audioSurdo").src, 15);
inicializaAudio(sons.audioChimbals, document.getElementById("audioChimbal").src,15);
inicializaAudio(sons.audioPratos, document.getElementById("audioPrato").src, 15);

function inicializaAudio(lsSons, source, count) {
     for (i = 0; i < count; i++) {
        lsSons[i].src = source;
    }
}

function animarPeca(frameIndex, audio) {
    bateria.render(frameIndex);
    audio.play();
    setTimeout("bateria.render(0);", 150);
}

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

$(document).keydown(function (e) {

    var isNN = (navigator.appName.indexOf("Netscape") != -1);
    var keyCode = (isNN) ? e.which : e.keyCode;
    if (keyCode in pecas) {
        pecas[keyCode] = true;
        //chimbal e caixa
        if (pecas[84] && pecas[68]) {
            animarPeca(frameIndex.chimbalCaixa, sons.audioChimbalCaixas[sons.audioChimbalCaixas.ponteiro()]);
        }
            //chimbal+bumbo
        else if (pecas[84] && pecas[32]) {
            animarPeca(frameIndex.chimbalBumbo, sons.audioChimbalBumbos[sons.audioChimbalBumbos.ponteiro()]);
        }
            //caixa+bumbo
        else if (pecas[68] && pecas[32]) {
            animarPeca(frameIndex.caixaBumbo, sons.audioCaixaBumbos[sons.audioCaixaBumbos.ponteiro()]);
        }
            //prato+bumbo
        else if (pecas[89] && pecas[32]) {
            animarPeca(frameIndex.pratoBumbo, sons.audioPratoBumbos[sons.audioPratoBumbos.ponteiro()]);
        }
        else if (pecas[32]) {
            animarPeca(frameIndex.bumbo, sons.audioBumbos[sons.audioBumbos.ponteiro()]);
        }
        else if (pecas[68]) {
            animarPeca(frameIndex.caixa, sons.audioCaixas[sons.audioCaixas.ponteiro()]);
        }
        else if (pecas[71]) {
            animarPeca(frameIndex.tom, sons.audioTons[sons.audioTons.ponteiro()]);
        }
        else if (pecas[72]) {
            animarPeca(frameIndex.surdo, sons.audioSurdos[sons.audioSurdos.ponteiro()]);
        }
        else if (pecas[84]) {
            animarPeca(frameIndex.chimbal, sons.audioChimbals[sons.audioChimbals.ponteiro()]);
        }
        else if (pecas[89]) {
            animarPeca(frameIndex.prato, sons.audioPratos[sons.audioPratos.ponteiro()]);
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
    setTimeout("bateria.render(11)", 2000);

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


