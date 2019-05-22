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

let entrada, saida, canvas, ctx, arvore, AFNE, AFD;

function setup() {
	entrada = document.getElementById('er');
	saida = document.getElementById('det');
	canvas = document.getElementById("c");

	arvore = new Arvore();
	ctx = canvas.getContext("2d");

	console.log("ε");
	console.log("∅");
}

function traduzir() {
	arvore.insere_expressao(inParaPos(entrada.value));
	arvore.mostrar(arvore.raiz);

	AFNE = noParaAFNE(arvore.raiz);
	AFD = AFNEParaAFD(AFNE);
	saida.value = JSON.stringify(AFD, null, '\t');
}
