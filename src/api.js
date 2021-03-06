import { setCookie, getCookie, deleteCookie } from "./cookiesUtils";

export const rootUrl = 'http://api.paytour.matheusalves.com.br';
export const endpoint = rootUrl+'/api';

export async function listarFuncionarios() {
	const config = {
		method: 'GET',
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer "+getToken()
		},
		mode: 'cors',
		redirect: 'follow'
	};

	try {
		const r = await fetch(endpoint+'/funcionario', config);
		if(r.ok) {
			const corpo = await r.json();
			if(corpo.erro)
				return false;
			return corpo;
		}

		return false;
	} catch {
		return false;
	}
}

export async function getFuncionario(id) {
	const config = {
		method: 'GET',
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer "+getToken()
		},
		mode: 'cors',
		redirect: 'follow'
	};

	try {
		const r = await fetch(endpoint+'/funcionario/'+id, config);
		if(r.ok) {
			const corpo = await r.json();
			if(corpo.erro)
				return false;
			return corpo;
		}

		return false;
	} catch {
		return false;
	}
}

export async function deletarFuncionario(id) {
	const config = {
		method: 'DELETE',
		headers: {
			"Authorization": "Bearer "+getToken()
		},
		mode: 'cors',
		redirect: 'follow'
	};

	try {
		const r = await fetch(endpoint+'/funcionario/'+id, config);
		if(r.ok) {
			const corpo = await r.json();
			if(corpo.erro)
				return false;
			return true;
		}

		return false;
	} catch {
		return false;
	}
}

export async function cadastrarFuncionario(payload) {
	const config = {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer "+getToken()
		},
		mode: 'cors',
		redirect: 'follow',
		body: JSON.stringify(payload)
	};

	try {
		const r = await fetch(endpoint+'/funcionario', config);
		const corpo = await r.json();
		if(r.ok) {
			if(corpo.erro)
				return corpo;
			return true;
		}
		return corpo;
	} catch {
		return false;
	}
}

export async function atualizarFuncionario(id, payload) {
	const config = {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer "+getToken()
		},
		mode: 'cors',
		redirect: 'follow',
		body: JSON.stringify(payload)
	};

	try {
		const r = await fetch(endpoint+'/funcionario/'+id, config);
		const corpo = await r.json();
		if(r.ok) {
			if(corpo.erro)
				return corpo;
			return true;
		}
		return corpo;
	} catch {
		return false;
	}
}

export async function login(email, senha) {
	const payload = {
		email,
		password: senha
	};

	const config = {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		},
		mode: 'cors',
		redirect: 'follow',
		body: JSON.stringify(payload)
	};

	try {
		const r = await fetch(endpoint+'/login', config);
		if(r.ok) {
			const corpo = await r.json();
			if(corpo.erro)
				return false;

			setCookie('token', corpo.access_token, 1);
			const agora = (new Date()).getTime();
			setCookie('expiration', (agora+(corpo.expires_in*1000)).toString(), 1);
			return true;
		}

		return false;
	} catch {
		return false;
	}
}

export function estaLogado() {
	const expiration = Number(getCookie('expiration'));
	if(isNaN(expiration) || expiration === 0 || expiration < (new Date()).getTime())
		return false;
	return true;
}

export function logout() {
	const tk = getCookie('token');

	const config = {
		method: 'GET',
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer "+tk
		},
		mode: 'cors',
		redirect: 'follow'
	};

	try { fetch(endpoint+'/logout', config); }
	catch {/* EMPTY */}

	deleteCookie('token');
	deleteCookie('expiration');
	return true;
}

function getToken() {
	const expiration = Number(getCookie('expiration'));
	if(isNaN(expiration) || expiration === 0 || expiration < (new Date()).getTime()+600000)
		renovarToken();
	
	return getCookie('token');
}

async function renovarToken() {
	const tk = getCookie('token');

	const config = {
		method: 'GET',
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer "+tk
		},
		mode: 'cors',
		redirect: 'follow'
	};

	try {
		const r = await fetch(endpoint+'/refresh', config);
		if(r.ok) {
			const corpo = await r.json();
			if(corpo.erro)
				return false;

			setCookie('token', corpo.access_token, 1);
			const agora = (new Date()).getTime();
			setCookie('expiration', (agora+(corpo.expires_in*1000)).toString(), 1);
			return true;
		}

		return false;
	} catch {
		return false;
	}
}
