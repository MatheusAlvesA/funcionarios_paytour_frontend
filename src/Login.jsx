import React from 'react';
import { login } from './api';

class Login extends React.Component {

	state = {
		loading: false,
		email: '',
		senha: '',
		erro: ''
	};

	componentDidMount() {
		// TODO
	}

	logar = async e => {
		e.preventDefault();
		this.setState({loading: true});
		const { email, senha } = this.state;
		const r = await login(email, senha);
		if(r) 
			document.location.reload();
		else {
			this.setState({
				loading: false,
				erro: 'Email ou senha inválidos'
			});
		}
	}

	render() {
		return (<div className="row ml-2 mr-2">
		<div 
			className="text-center col-12 col-md-4 offset-md-4 d-flex flex-column justify-content-around"
			style={{
				height: '100vh'
			}}
		>
			<form className="form-signin">
			<img
					className="mb-4"
					src={require('./logo.png')}
					alt=""
					width="72"
					height="72"
			/>
			<h1 className="h3 mb-3 font-weight-normal">Faça Login</h1>
			<label htmlFor="inputEmail" className="sr-only">Email address</label>
			<input
					type="email"
					id="inputEmail"
					className="form-control"
					placeholder="Email"
					value={this.state.email}
					onChange={e => this.setState({email: e.target.value})}
					required
					autoFocus
			/>
			<label htmlFor="inputPassword" className="sr-only">Password</label>
			<input
					type="password"
					id="inputPassword"
					className="form-control"
					placeholder="Senha"
					value={this.state.senha}
					onChange={e => this.setState({senha: e.target.value})}
					required
			/>
			<br />
			{
				this.state.erro !== ''
				?
					<div className="alert alert-danger" role="alert">
						{this.state.erro}
					</div>
				:
					null
			}
			<button
				className="btn btn-lg btn-primary btn-block" type="submit"
				disabled={this.state.loading}
				onClick={this.logar}
			>Entrar</button>
			<p className="mt-5 mb-3 text-muted">&copy; 2019</p>
		</form>
	  </div></div>);
	}
}

export default Login;
