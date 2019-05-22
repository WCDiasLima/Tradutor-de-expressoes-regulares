let deslocX = new Array(30);

class No {
	constructor(valor) {
		this.valor = valor;
		this.esquerda = null;
		this.direita = null;
	}

	mostrar() {
		if (this.esquerda) {
			ctx.beginPath();
			ctx.moveTo(this.x, this.y);
			ctx.lineWidth = 2;
			ctx.lineTo(this.esquerda.x, this.esquerda.y);
			ctx.stroke();
			this.esquerda.mostrar();
		}
		ctx.beginPath();
		ctx.arc(this.x, this.y, 20, 0, Math.PI * 2);
		ctx.fillStyle = '#000000';
		ctx.fill();
		ctx.stroke();
		ctx.beginPath();
		ctx.fillStyle = '#000000';
		ctx.stroke();
		if (this.direita) {
			ctx.beginPath();
			ctx.moveTo(this.x, this.y);
			ctx.lineWidth = 2;
			ctx.lineTo(this.direita.x, this.direita.y);
			ctx.stroke();
			this.direita.mostrar();
		}
		ctx.font = "20px Georgia";
		ctx.fillStyle = '#ffffff';
		ctx.fillText(this.valor, this.x - 6, this.y + 6);
	}
	definePos(profundidade) {
		let esqX, dirX;
		if (this.esquerda) esqX = this.esquerda.definePos(profundidade + 1);
		if (this.direita) dirX = this.direita.definePos(profundidade + 1);
		this.y = profundidade * 50 + 25;
		if (!esqX && !dirX) this.x = deslocX[profundidade] + 50;
		else {
			if (!esqX) this.x = dirX;
			else if (!dirX) this.x = esqX;
			else this.x = (esqX + dirX) / 2;
			if (this.x < deslocX[profundidade] + 50) this.moverX(deslocX[profundidade] + 50 - this.x, true, profundidade);
		}
		deslocX[profundidade] = this.x;
		return this.x;
	}
	moverX(dist, direita, profundidade) {
		this.x += dist;
		if (this.esquerda) this.esquerda.moverX(dist, false, profundidade + 1);
		if (this.direita) this.direita.moverX(dist, true, profundidade + 1);
		if (direita) deslocX[profundidade] += dist;
	}
}

class Arvore {
	constructor() {
		this.x = null;
		this.y = null;
		this.raiz = null;
	}

	insere_expressao(expressao) {
		var pilha = [];
		for (let i = 0; i < expressao.length; i++) {
			var novoNo = new No(expressao[i]);
			if (i === expressao.length - 1) {
				this.raiz = novoNo;
			}
			if (eOperando(expressao[i])) pilha.push(novoNo);
			else if (operadoresB.has(expressao[i])) {
				let ar1 = pilha.pop();
				let ar2 = pilha.pop();
				novoNo.direita = ar1;
				novoNo.esquerda = ar2;
				pilha.push(novoNo);
			} else if (expressao[i] == '*') {
				let ar3 = pilha.pop();
				novoNo.esquerda = ar3;
				pilha.push(novoNo);
			}
		}

		deslocX.fill(0);
		this.raiz.definePos(0);
	}
	mostrar() {
		canvas.height = window.innerHeight * 0.65;
		canvas.width = window.innerWidth * 0.4;
		ctx.fillStyle = "White";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		this.raiz.mostrar();
	}
}
