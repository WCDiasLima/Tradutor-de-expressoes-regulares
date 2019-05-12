function inParaPos(caracter) {

	var pilha = [];
	var prioridade = 0;
	var resultado = "";
	let i, aux;

	for (i = 0; i < caracter.length; i++) {

		if (eOperando(caracter[i]) || caracter[i] == '*') resultado += caracter[i];
		else if (operadoresB.has(caracter[i])) {
			prioridade = obterPrioridade(caracter[i]);
			aux = pilha[pilha.length - 1];
			let prioridade2 = obterPrioridade(aux);
			if (aux !== 'undefined') {
				while ((pilha.length > 0) && (prioridade2 >= prioridade)) {
					resultado += pilha.pop();
					prioridade2 = obterPrioridade(pilha[pilha.length - 1]);
				}
			}
			pilha.push(caracter[i]);
		} else if ('(' === caracter[i]) pilha.push(caracter[i]);
		else if (')' === caracter[i]) {
			var item = pilha.pop();
			while ((item != '(') && (item != undefined)) {
				resultado += item;
				item = pilha.pop();
			}
		}
	}
	while (pilha.length > 0) {
		resultado += pilha.pop();
	}
	return resultado
}

function eOperando(caracter) {
	var letras = /^[a-zA-Z]+$/;
	var numeros = /^[0-9]+$/;
	if (letras.test(caracter) || numeros.test(caracter) || caracter === 'ε' || caracter === '∅') return true;
	else return false;
}

function obterPrioridade(caracter) {
	var retorno = 0;
	if ('(' == caracter) retorno = 1;
	else if ('+' == caracter) retorno = 2;
	else if ('.' == caracter) retorno = 3;
	return retorno;
}

const operadoresB = new Set(['+', '.']);
