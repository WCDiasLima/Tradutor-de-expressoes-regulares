/*
 Copyright 2019 Joyce Emanuele, Wellington Cesar

 This file is part of Tradutor de expressões regulares (TdER).

 TdER is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 TdER is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with TdER. If not, see <https://www.gnu.org/licenses/>.
*/

let entrada, saida, AFD, arvore;

function setup() {
	entrada = document.getElementById('er');
	saida = document.getElementById('det');
	arvore = new Arvore();

	AFD = {
		"alfabeto": undefined,
		"qtdEstados": undefined,
		"estadoInicial": 0,
		"estadosFinais": undefined,
		"delta": undefined
	};
}

function traduzir() {
	arvore.insere_expressao(inParaPos(entrada.value));
	console.log(arvore);
}

function inParaPos(caracter) {

	var pilha = [];
	var prioridade = 0;
	var resultado = "";
	let i, aux;

	for (i = 0; i < caracter.length; i++) {

		if (operando(caracter[i]) || caracter[i] == '*') resultado += caracter[i];
		else if (operadoresB.has(caracter[i])) {
			prioridade = obterPrioridade(caracter[i]);
			aux = pilha.pop();
			let prioridade2 = obterPrioridade(aux);
			pilha.push(aux);
			if (aux !== 'undefined') {
				while ((pilha.length > 1) && (prioridade2 >= prioridade)) {
					resultado += pilha.pop();
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
	while (pilha.length > 1) {
		resultado += pilha.pop();
	}
	return resultado;
}

function eOperando(caracter) {
	var letras = /^[a-zA-Z]+$/;
	var numeros = /^[0-9]+$/;
	if (letras.test(caracter) || numeros.test(caracter)) return true;
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
