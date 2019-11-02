import { setCookie, deleteCookie } from "./cookiesUtils";

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
			setCookie('expiration', corpo.expires_in.toString(), 1);
			return true;
		}

		return false;
	} catch {
		return false;
	}
}

export function logout() {
	deleteCookie('token');
	return true;
}
