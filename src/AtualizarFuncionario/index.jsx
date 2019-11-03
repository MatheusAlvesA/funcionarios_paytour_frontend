import React from 'react';
import Swal from 'sweetalert2'
import { atualizarFuncionario, getFuncionario } from '../api';
import LoadingComponent from '../LoadingComponent';
import getFetchErroComponent from '../errorComponent';

class AtualizarFuncionario extends React.Component {

	id=window.location.pathname.split('/').slice(-1).pop()

	state = {
		foto: null,
		fotoValida: true,
		email: '',
		emailValido: true,
		nome: '',
		nomeValido: true,
		cpf: '',
		cpfValido: true,
		observacoes: '',
		telefone: '',
		telefoneValido: true,
		loading: false,
		loadingInicial: true,
		loadingInicialErro: false
	};

	componentDidMount() {
		this.getDados(this.id);
	}

	getDados = async id => {
		this.setState({
			loadingInicial: true,
			loadingInicialErro: false
		});
		const r = await getFuncionario(id);

		if(r === false) {
			this.setState({
				loadingInicial: false,
				loadingInicialErro: true
			});
		}

		this.setState({
			loadingInicial: false,
			nome: r.nome,
			email: r.email,
			cpf: r.cpf,
			telefone: r.telefone,
			observacoes: r.observacoes
		});
	}

	atualizar = async e => {
		e.preventDefault();
		await this.limparInvalidacoes();
		this.setState({loading: true});

		if(!this.validarCampos()) {
			this.setState({loading: false});
			return;
		}

		const payload = await this.prepararPayload();
		const r = await atualizarFuncionario(this.id, payload);

		if(r === true) {
			this.setState({
				foto: null,
				fotoValida: true,
				emailValido: true,
				nomeValido: true,
				cpfValido: true,
				telefoneValido: true,
				loading: false
			});
			if(document.querySelector('#foto')[0])
				document.querySelector('#foto')[0].value = "";
			Swal.fire({
				title: 'Concluído',
				text: `Funcionário atualizado`,
				type: 'success',
				confirmButtonText: 'ok'
			  });
		} else {
			this.setState({loading: false});
			Swal.fire({
				title: 'Falha',
				text: r.mensagem,
				type: 'error',
				confirmButtonText: 'ok'
			  });
		}
	}

	prepararPayload = async () => {
		const { email, nome, cpf, observacoes, telefone } = this.state;
		let foto = null;
		if(this.state.foto)
			foto = await this.toBase64(this.state.foto);

		return {nome, email, cpf, telefone, observacoes, imagem: foto };
	}

	toBase64 = file => new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result.split(',')[1]);
		reader.onerror = error => reject(error);
	});

	validarCampos = () => {
		let validos = true;
		if(this.state.nome.length <= 0) {
			this.setState({nomeValido: false});
			validos = false;
		}
		if(!this.validarEmail(this.state.email)) {
			this.setState({emailValido: false});
			validos = false;
		}
		if(!/^(\d){11}$/.test(this.state.cpf)) {
			this.setState({cpfValido: false});
			validos = false;
		}
		if(!/^(\d){8,15}$/.test(this.state.telefone)) {
			this.setState({telefoneValido: false});
			validos = false;
		}
		if(this.state.foto !== null && !this.validarFoto(this.state.foto)) {
			this.setState({fotoValida: false});
			validos = false;
		}

		return validos
	}

	validarFoto = arquivo => {
		if(!arquivo)
			return false;
		if(!['image/jpeg', 'image/png'].includes(arquivo.type))
			return false;
		if(arquivo.size < 100 || arquivo.size > 2000000) // Deve estar entre 100 bytes e 2 megas
			return false;
		return true;
	}

	validarEmail = email => {
		if(email === '')
			return false;

		const partes = email.split('@');
		if(partes.length !== 2)
			return false;

		const usuario = partes[0];
		const dominio = partes[1];

		if(usuario === '')
			return false;

		let posicao_ponto = dominio.indexOf('.');
		if(
			posicao_ponto === -1 ||
			posicao_ponto === 0 ||
			posicao_ponto === (dominio.length-1)
		)
			return false;
		
		return true;
	}

	limparInvalidacoes = () => new Promise((res, rej) => {
		this.setState({
			fotoValida: true,
			emailValido: true,
			nomeValido: true,
			cpfValido: true,
			telefoneValido: true
		}, res);
	});

	render() {

		if(this.state.loadingInicial)
			return <LoadingComponent />
		
		if(this.state.loadingInicialErro)
			return getFetchErroComponent(() => this.getDados(this.id));

		return <div className="container-flex ml-1 mr-1"><div className="row mr-0">
			<div className="col-12">
			<h2>Atualizar funcionário</h2>
			<form>
				<div className="form-group">
					<label htmlFor="nome">Nome completo</label>
					<input
						type="text"
						className={"form-control"+(this.state.nomeValido ? '' : ' is-invalid')}
						id="nome"
						placeholder="Nome"
						value={this.state.nome}
						onChange={e => this.setState({nome: e.target.value})}
					/>
					<div className="invalid-feedback">
						 Nome não preenchido
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="cpf">CPF</label>
					<input
						type="text"
						className={"form-control"+(this.state.cpfValido ? '' : ' is-invalid')}
						id="cpf"
						placeholder="cpf"
						value={this.state.cpf}
						onChange={e => this.setState({cpf: e.target.value})}
					/>
					<small className="form-text text-muted">Insira o CPF sem a pontuação</small>
					<div className="invalid-feedback">
						CPF inválido
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="telefone">Telefone</label>
					<input
						type="text"
						className={"form-control"+(this.state.telefoneValido ? '' : ' is-invalid')}
						id="telefone"
						placeholder="Telefone"
						value={this.state.telefone}
						onChange={e => this.setState({telefone: e.target.value})}
					/>
					<small className="form-text text-muted">Insira apenas os numeros do seu telefone</small>
					<div className="invalid-feedback">
						 Telefone inválido
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="email">E-Mail</label>
					<input
						type="email"
						className={"form-control"+(this.state.emailValido ? '' : ' is-invalid')}
						id="email"
						placeholder="email"
						value={this.state.email}
						onChange={e => this.setState({email: e.target.value})}
					/>
					<div className="invalid-feedback">
						Email inválido
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="foto">Sua foto</label>
					<input
						type="file"
						className={"form-control-file"+(this.state.fotoValida ? '' : ' is-invalid')}
						id="foto"
						onChange={e =>  this.setState({foto: e.target.files[0]})}
					/>
					<div className="invalid-feedback">
						Foto inválida
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="observacoes">Observações</label>
					<textarea
						className="form-control"
						id="observacoes"
						rows="3"
						value={this.state.observacoes}
						onChange={e => this.setState({observacoes: e.target.value})}
					>
					</textarea>
				</div>
			</form>
			<div className="d-flex flex-row justify-content-end mb-5">
				<button
					className="btn btn-success"
					onClick={this.atualizar}
					disabled={this.state.loading}
				>{this.state.loading ? 'Aguarde...' : 'Atualizar'}</button>
			</div>
			</div>
		</div></div>;
	}
}

export default AtualizarFuncionario;
