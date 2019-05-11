class No {
	constructor(valor) {
		this.valor = valor;
		this.esquerda = null;
		this.direita = null;
	}
}

class Arvore {
	constructor() {
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
