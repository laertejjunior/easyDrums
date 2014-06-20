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
   audioBase: [new Audio],   
   init: function () {
        this.i = 0;
		this.audioBase =  [new Audio];
        for (j=0;j <= 15; j++){
            this[j] = new Audio;
        }
        return (this);
    },
	getAudio: function () {
		this.i = 0;
		while(!this.audioBase[this.i].paused) {
			this.audioBase.push(new Audio);
			this.audioBase[this.i+1].src = this.audioBase[this.i].src;
			this.i++;
		}
		return this.audioBase[this.i];
    }
}

var sons = {
    audioChimbalCaixa: Object.create(baseSom).init(),
    audioChimbalBumbo: Object.create(baseSom).init(),
    audioCaixaBumbo: Object.create(baseSom).init(),
    audioPratoBumbo: Object.create(baseSom).init(),
    audioBumbo: Object.create(baseSom).init(),
    audioCaixa: Object.create(baseSom).init(),
    audioTom: Object.create(baseSom).init(),
    audioSurdo: Object.create(baseSom).init(),
    audioChimbal: Object.create(baseSom).init(),
    audioPrato: Object.create(baseSom).init()
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

sons.audioChimbalCaixa.audioBase[0].src = document.getElementById("audioChimbalCaixa").src;
sons.audioChimbalBumbo.audioBase[0].src = document.getElementById("audioChimbalBumbo").src;
sons.audioCaixaBumbo.audioBase[0].src = document.getElementById("audioCaixaBumbo").src;
sons.audioPratoBumbo.audioBase[0].src = document.getElementById("audioPratoBumbo").src;
sons.audioBumbo.audioBase[0].src = document.getElementById("audioBumbo").src;
sons.audioCaixa.audioBase[0].src = document.getElementById("audioCaixa").src;
sons.audioTom.audioBase[0].src = document.getElementById("audioTom").src;
sons.audioSurdo.audioBase[0].src = document.getElementById("audioSurdo").src;
sons.audioChimbal.audioBase[0].src = document.getElementById("audioChimbal").src;
sons.audioPrato.audioBase[0].src = document.getElementById("audioPrato").src;

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
            animarPeca(frameIndex.chimbalCaixa, sons.audioChimbalCaixa.getAudio());
        }
            //chimbal+bumbo
        else if (pecas[84] && pecas[32]) {
            animarPeca(frameIndex.chimbalBumbo, sons.audioChimbalBumbo.getAudio());
        }
            //caixa+bumbo
        else if (pecas[68] && pecas[32]) {
            animarPeca(frameIndex.caixaBumbo, sons.audioCaixaBumbo.getAudio());
        }
            //prato+bumbo
        else if (pecas[89] && pecas[32]) {
            animarPeca(frameIndex.pratoBumbo, sons.audioPratoBumbo.getAudio());
        }
        else if (pecas[32]) {
            animarPeca(frameIndex.bumbo, sons.audioBumbo.getAudio());
        }
        else if (pecas[68]) {
            animarPeca(frameIndex.caixa, sons.audioCaixa.getAudio());
        }
        else if (pecas[71]) {
            animarPeca(frameIndex.tom, sons.audioTom.getAudio());
        }
        else if (pecas[72]) {
            animarPeca(frameIndex.surdo, sons.audioSurdo.getAudio());
        }
        else if (pecas[84]) {
            animarPeca(frameIndex.chimbal, sons.audioChimbal.getAudio());
        }
        else if (pecas[89]) {
            animarPeca(frameIndex.prato, sons.audioPrato.getAudio());
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
