import React from 'react';
import { listarFuncionarios } from '../api';
import FichaFuncionario from './FichaFuncionario';
import LoadingComponent from '../LoadingComponent';
import getFetchErroComponent from '../errorComponent'

class ListarFuncionarios extends React.Component {

	state = {
		loading: true,
		loadingError: false,
		lista: []
	};

	componentDidMount() {
		this.listar();
	}

	listar = async () => {
		this.setState({loading: true, loadingError: false});
		let r = await listarFuncionarios();
		this.setState({loading: false});
		if(Array.isArray(r)) {
			this.setState({lista: r});
		} else {
			this.setState({loadingError: true});
		}
	}

	render() {
		if(this.state.loading) {
			return <div className="d-flex flex-column justify-content-around"><div className="row mr-0">
				<LoadingComponent />
			</div></div>;
		}

		if(this.state.loadingError)
			return getFetchErroComponent(this.listar);

		return <div className="container-flex"><div className="row mr-0">
			<div className="col-12">
				{
					this.state.lista.length > 0
					? this.state.lista.map(funcionario => <FichaFuncionario key={funcionario.id} dados={funcionario}/>)
					: <h1>Nenhum funcionário cadastrado</h1>
				}
			</div>
		</div></div>;
	}
}

export default ListarFuncionarios;
