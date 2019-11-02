import React from 'react';

class CadastrarFuncionario extends React.Component {

	state = {
		foto: '',
		email: '',
		nome: '',
		cpf: '',
		observacoes: '',
		telefone: ''
	};

	componentDidMount() {
		// TODO
	}

	render() {
		return <div className="container-flex ml-1 mr-1"><div className="row mr-0">
			<div className="col-12">
			<h2>Cadastrar funcionário</h2>
			<form>
				<div className="form-group">
					<label htmlFor="exampleFormControlInput1">Email address</label>
					<input
						type="email"
						className="form-control"
						id="exampleFormControlInput1"
						placeholder="name@example.com"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="exampleFormControlTextarea1">Example textarea</label>
					<textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
				</div>
			</form>
			</div>
		</div></div>;
	}
}

export default CadastrarFuncionario;
