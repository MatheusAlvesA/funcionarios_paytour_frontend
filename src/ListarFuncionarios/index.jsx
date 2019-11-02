import React from 'react';
import { listarFuncionarios } from '../api';
import FichaFuncionario from './FichaFuncionario';
import LoadingComponent from '../LoadingComponent';

class ListarFuncionarios extends React.Component {

	state = {
		loading: true,
		lista: []
	};

	componentDidMount() {
		this.listar();
	}

	listar = async () => {
		let r = await listarFuncionarios();
		this.setState({loading: false});
		if(Array.isArray(r)) {
			this.setState({lista: r});
		}
	}

	render() {
		if(this.state.loading) {
			return <div className="d-flex flex-column justify-content-around"><div className="row mr-0">
				<LoadingComponent />
			</div></div>;
		}

		return <div className="container-flex"><div className="row mr-0">
			<div className="col-12">
				{
					this.state.lista.map(funcionario => <FichaFuncionario key={funcionario.id} dados={funcionario}/>)
				}
			</div>
		</div></div>;
	}
}

export default ListarFuncionarios;
