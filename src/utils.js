export function formatarCPF(source) {
	return source.substr(0, 3)
			+'.'+source.substr(3, 3)
			+'.'+source.substr(6, 3)
			+'-'+source.substr(9);
}

export function formatarTelefone(source) {
	return source.substr(0, source.length-4)
			+'-'+source.substr(source.length-4);
}
