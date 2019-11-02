import React from 'react';

export default function getFetchErroComponent(tryagain) {
	return (
		<div
			style={{
				padding: '20px'
			}}
		>
			<h2 className="text-muted">
				Falha ao obter dados do servidor
			</h2>
			<button 
				className="btn btn-outline-info"
				onClick={() => tryagain()}
			>
				Tentar novamente
			</button>
		</div>
	);
}
