class No {
	constructor(valor) {
		this.valor = valor;
		this.esquerda = null;
		this.direita = null;
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
	}
}

function definePos(arvore, i, j) {
	arvore.x = (canvas.height / 2) + i;
	arvore.y = 50 + j;
	iie -= 10;
	iid += 10;
	arvore.esquerda && definePos(arvore.esquerda, i - iie, j + 50);
	arvore.direita && definePos(arvore.direita, i + iid, j + 50);
}

function arv_mostrar(arvore) {
	if (arvore.esquerda) {
		ctx.beginPath();
		ctx.moveTo(arvore.x, arvore.y);
		ctx.lineWidth = 2;
		ctx.lineTo(arvore.esquerda.x, arvore.esquerda.y);
		ctx.stroke();
		arv_mostrar(arvore.esquerda);
	}
	ctx.beginPath();
	ctx.arc(arvore.x, arvore.y, 20, 0, Math.PI * 2);
	ctx.fillStyle = '#000000';
	ctx.fill();
	ctx.stroke();
	ctx.beginPath();
	ctx.font = "20px Georgia";
	ctx.fillStyle = '#8ebf42';
	ctx.fillText(arvore.valor, arvore.x, arvore.y);
	ctx.fillStyle = '#000000';
	ctx.stroke();
	if (arvore.direita) {
		ctx.beginPath();
		ctx.moveTo(arvore.x, arvore.y);
		ctx.lineWidth = 2;
		ctx.lineTo(arvore.direita.x, arvore.direita.y);
		ctx.stroke();
		arv_mostrar(arvore.direita);
	}
}
