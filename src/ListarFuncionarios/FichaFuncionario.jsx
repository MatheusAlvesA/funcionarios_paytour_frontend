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
		  <img
				  className="mr-3"
				  src={rootUrl+"/imagens/"+foto}
				  alt="Foto do(a) funcionário(a)"
				  width="100"
			/>
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
		  <div>
			<button
				className="btn btn-danger"
				onClick={() => this.deletarFuncionario(id, nome)}
			>
				<i className="fas fa-trash"></i>
			</button>
			<Link to={"/editar/"+id}>
				<button className="btn btn-info ml-1">
					<i className="fas fa-edit"></i>
				</button>
			</Link>
		  </div>
		</div>;
	}
}

export default FichaFuncionario;
