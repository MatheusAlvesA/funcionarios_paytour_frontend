import { setCookie, getCookie, deleteCookie } from "./cookiesUtils";

export const endpoint = 'http://localhost/api';

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
	deleteCookie('token');
	return true;
}
