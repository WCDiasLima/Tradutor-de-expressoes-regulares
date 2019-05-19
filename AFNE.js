function noParaAFNE(no) {
	let AFNE = {
		"alfabeto": undefined,
		"qtdEstados": undefined,
		"estadoInicial": undefined,
		"estadosFinais": undefined,
		"delta": undefined
	};
	let v = no.valor;
	if (v === 'ε') {
		AFNE.alfabeto = [];
		AFNE.qtdEstados = 2;
		AFNE.estadoInicial = [0];
		AFNE.estadosFinais = [1];
		AFNE.delta = [
			[
				[1]
			],
			[
				[]
			]
		];
	} else if (v === '∅') {
		AFNE.alfabeto = [];
		AFNE.qtdEstados = 2;
		AFNE.estadoInicial = [0];
		AFNE.estadosFinais = [1];
		AFNE.delta = [
			[
				[]
			],
			[
				[]
			]
		];
	} else if (eOperando(v)) {
		AFNE.alfabeto = [v];
		AFNE.qtdEstados = 2;
		AFNE.estadoInicial = [0];
		AFNE.estadosFinais = [1];
		AFNE.delta = [
			[
				[1],
				[]
			],
			[
				[],
				[]
			]
		];
	} else if (v === '+') {
		let R = noParaAFNE(no.esquerda);
		let S = noParaAFNE(no.direita);
		AFNE.alfabeto = [...(new Set([...R.alfabeto, ...S.alfabeto]))];
		AFNE.qtdEstados = R.qtdEstados + S.qtdEstados + 2;
		AFNE.estadoInicial = [0];
		AFNE.estadosFinais = [AFNE.qtdEstados - 1];
		let delta = [];
		for (let i = 0; i < AFNE.qtdEstados; i++) {
			delta[i] = [];
		}
		for (let i = 0; i < AFNE.alfabeto.length; i++) {
			delta[0][i] = [];
		}
		delta[0][AFNE.alfabeto.length] = [1, R.qtdEstados + 1];
		for (let i = 0; i < R.qtdEstados; i++) {
			for (let j = 0; j < AFNE.alfabeto.length; j++) {
				let posR = R.alfabeto.indexOf(AFNE.alfabeto[j]);
				if (posR === -1) delta[i + 1][j] = [];
				else delta[i + 1][j] = R.delta[i][posR].map(x => x + 1);
			}
			delta[i + 1][AFNE.alfabeto.length] = R.delta[i][R.alfabeto.length].map(x => x + 1);
		}
		for (let i = 0; i < S.qtdEstados; i++) {
			for (let j = 0; j < AFNE.alfabeto.length; j++) {
				let posS = S.alfabeto.indexOf(AFNE.alfabeto[j]);
				if (posS === -1) delta[i + R.qtdEstados + 1][j] = [];
				else delta[i + R.qtdEstados + 1][j] = S.delta[i][posS].map(x => x + R.qtdEstados + 1);
			}
			delta[i + R.qtdEstados + 1][AFNE.alfabeto.length] = S.delta[i][S.alfabeto.length].map(x => x + R.qtdEstados + 1);
		}
		for (let i = 0; i < AFNE.alfabeto.length + 1; i++) {
			delta[AFNE.qtdEstados - 1][i] = [];
		}
		delta[R.estadosFinais[0] + 1][AFNE.alfabeto.length].push(AFNE.estadosFinais[0]);
		delta[S.estadosFinais[0] + R.qtdEstados + 1][AFNE.alfabeto.length].push(AFNE.estadosFinais[0]);
		AFNE.delta = delta;
	} else if (v === '.') {
		let R = noParaAFNE(no.esquerda);
		let S = noParaAFNE(no.direita);
		AFNE.alfabeto = [...(new Set([...R.alfabeto, ...S.alfabeto]))];
		AFNE.qtdEstados = R.qtdEstados + S.qtdEstados + 2;
		AFNE.estadoInicial = [0];
		AFNE.estadosFinais = [AFNE.qtdEstados - 1];
		let delta = [];
		for (let i = 0; i < AFNE.qtdEstados; i++) {
			delta[i] = [];
		}
		for (let i = 0; i < AFNE.alfabeto.length; i++) {
			delta[0][i] = [];
		}
		delta[0][AFNE.alfabeto.length] = [1];
		for (let i = 0; i < R.qtdEstados; i++) {
			for (let j = 0; j < AFNE.alfabeto.length; j++) {
				let posR = R.alfabeto.indexOf(AFNE.alfabeto[j]);
				if (posR === -1) delta[i + 1][j] = [];
				else delta[i + 1][j] = R.delta[i][posR].map(x => x + 1);
			}
			delta[i + 1][AFNE.alfabeto.length] = R.delta[i][R.alfabeto.length].map(x => x + 1);
		}
		for (let i = 0; i < S.qtdEstados; i++) {
			for (let j = 0; j < AFNE.alfabeto.length; j++) {
				let posS = S.alfabeto.indexOf(AFNE.alfabeto[j]);
				if (posS === -1) delta[i + R.qtdEstados + 1][j] = [];
				else delta[i + R.qtdEstados + 1][j] = S.delta[i][posS].map(x => x + R.qtdEstados + 1);
			}
			delta[i + R.qtdEstados + 1][AFNE.alfabeto.length] = S.delta[i][S.alfabeto.length].map(x => x + R.qtdEstados + 1);
		}
		for (let i = 0; i < AFNE.alfabeto.length + 1; i++) {
			delta[AFNE.qtdEstados - 1][i] = [];
		}
		delta[R.estadosFinais[0] + 1][AFNE.alfabeto.length].push(R.qtdEstados + 1);
		delta[S.estadosFinais[0] + R.qtdEstados + 1][AFNE.alfabeto.length].push(AFNE.estadosFinais[0]);
		AFNE.delta = delta;
	} else if (v === '*') {
		let R = noParaAFNE(no.esquerda);
		AFNE.alfabeto = R.alfabeto;
		AFNE.qtdEstados = R.qtdEstados + 2;
		AFNE.estadoInicial = [0];
		AFNE.estadosFinais = [AFNE.qtdEstados - 1];
		let delta = [];
		for (let i = 0; i < AFNE.qtdEstados; i++) {
			delta[i] = [];
		}
		for (let i = 0; i < AFNE.alfabeto.length; i++) {
			delta[0][i] = [];
		}
		delta[0][AFNE.alfabeto.length] = [1];
		for (let i = 0; i < R.qtdEstados; i++) {
			for (let j = 0; j < AFNE.alfabeto.length; j++) {
				delta[i + 1][j] = R.delta[i][j].map(x => x + 1);
			}
			delta[i + 1][AFNE.alfabeto.length] = R.delta[i][R.alfabeto.length].map(x => x + 1);
		}
		for (let i = 0; i < AFNE.alfabeto.length + 1; i++) {
			delta[AFNE.qtdEstados - 1][i] = [];
		}
		delta[1][AFNE.alfabeto.length].push(R.estadosFinais[0] + 1);
		delta[R.estadosFinais[0] + 1][AFNE.alfabeto.length].push(1, AFNE.estadosFinais[0]);
		AFNE.delta = delta;
	}
	return AFNE
}
