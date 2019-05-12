function AFNEParaAFD(AFNE) {
	let AFD = {
		"alfabeto": undefined,
		"qtdEstados": undefined,
		"estadoInicial": 0,
		"estadosFinais": undefined,
		"delta": undefined
	}
	AFD.alfabeto = AFNE.alfabeto;
	AFD.estadosFinais = [];
	AFD.delta = [];

	let estados = [];
	let falta = [];
	let temp = [];

	falta.push(Efecho(AFNE.delta, AFNE.estadoInicial));
	while (falta.length !== 0) {
		estados.push(falta[0]);
		temp[temp.length] = [];
		for (let i = 0; i < AFD.alfabeto.length; i++) {
			temp[temp.length - 1][i] = new Set();
			for (let ele of falta[0]) {
				temp[temp.length - 1][i] = new Set([...temp[temp.length - 1][i], ...AFNE.delta[ele][i]]);
			}
			temp[temp.length - 1][i] = Efecho(AFNE.delta, temp[temp.length - 1][i]);
			if (!estados.contconj(temp[temp.length - 1][i]) && !falta.contconj(temp[temp.length - 1][i]))
				falta.push(temp[temp.length - 1][i]);
		}
		falta.shift();
	}

	for (let i = 0; i < estados.length; i++) {
		if ([...(estados[i])].filter(u => AFNE.estadosFinais.includes(u))
			.length > 0) AFD.estadosFinais.push(i);
	}

	for (let i = 0; i < temp.length; i++) {
		AFD.delta[i] = [];
		for (let j = 0; j < temp[i].length; j++) {
			AFD.delta[i][j] = estados.indiceconj(temp[i][j]);
		}
	}

	AFD.qtdEstados = AFD.delta.length;
	return AFD;
}

function Efecho(delta, estados) {
	let Ef = [...estados];
	for (let i = 0; i < Ef.length; i++) {
		for (let j of delta[Ef[i]][delta[Ef[i]].length - 1]) {
			if (!Ef.includes(j)) Ef.push(j);
		}
	}
	return new Set(Ef);
}

Set.prototype.igual = function(a) { //Igualdade entre conjuntos
	if (this.size !== a.size) return false;
	for (let ele of this)
		if (!a.has(ele)) return false;
	return true;
};
Array.prototype.contconj = function(a) { //Array contém conjunto
	for (let ele of this) {
		if (ele instanceof Set && ele.igual(a)) return true;
	}
	return false;
};
Array.prototype.indiceconj = function(a) { //Índice de um conjunto em um array
	for (let i = 0; i < this.length; i++) {
		if (this[i].igual(a)) return i;
	}
};
