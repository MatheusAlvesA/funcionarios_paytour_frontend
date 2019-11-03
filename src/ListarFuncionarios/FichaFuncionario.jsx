import React from 'react';
import Swal from 'sweetalert2'
import { rootUrl, deletarFuncionario } from '../api';
import { formatarCPF, formatarTelefone } from '../utils';
import { Link } from 'react-router-dom';

class FichaFuncionario extends React.Component {

	state = {
		deletado: false
	};

	deletarFuncionario = async (id, nome) => {
		const r = await Swal.fire({
			title: 'Deletar',
			text: `Tem certeza que deseja remover ${nome}?`,
			type: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Sim',
			cancelButtonText: 'Não'
		  });

		  if(r.value) {
			await deletarFuncionario(id);
			this.setState({deletado: true});
		  }
	}

	render() {
		if(this.state.deletado)
			return null;

		const {
				id,
				foto,
				email,
				nome,
				cpf,
				observacoes,
				telefone
			} = this.props.dados;

		return <div className="media border-bottom mb-4 pb-1">
			<div
				className="row"
				style={{width: '100%'}}
			>
				<div className="col-4 col-md-2 text-center">
					<img
						className="mr-auto ml-auto"
						src={rootUrl+"/imagens/"+foto}
						alt="Foto do(a) funcionário(a)"
						width="100"
					/>
				</div>
				<div className="col-5 col-md-7">
					<div className="media-body">
						<h5 className="mt-0">{nome}</h5>
						<b>Email: </b>{email}
						<br />
						<b>CPF: </b>{formatarCPF(cpf)}
						<br />
						<b>Telefone: </b>{formatarTelefone(telefone)}
						<br />
						<b>Observações: </b><br />{observacoes}
					</div>
				</div>
				<div className="col-3 col-md-3">
					<div
							className="d-flex justify-content-between nowrap"
							style={{
								width: '90px'
							}}
						>
						<Link to={"/editar/"+id}>
							<button title="Editar" className="btn btn-info">
								<i className="fas fa-edit"></i>
							</button>
						</Link>
						<button
							title="Apagar"
							className="btn btn-danger"
							onClick={() => this.deletarFuncionario(id, nome)}
						>
							<i className="fas fa-trash"></i>
						</button>
					</div>
				</div>
			</div>
		</div>;
	}
}

export default FichaFuncionario;
