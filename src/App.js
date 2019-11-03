import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './main.css';
import { logout } from './api.js';
import ListarFuncionarios from './ListarFuncionarios';
import CadastrarFuncionario from './CadastrarFuncionario';
import AtualizarFuncionario from './AtualizarFuncionario';

class App extends React.Component {
	render() {
		return <div className="container-flex ml-1 mr-1"><div className="row mr-0">
		<nav
			className="col-md-2 d-none d-md-block bg-light sidebar"
			style={{height: '100vh'}}
		>

			<img
				className="ml-3 mt-3"
				alt="Logo"
				src={require('./logoWide.svg')}
			/>

			<h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
				Painel de controle
			</h6>
			<ul className="nav flex-column ml-2">
				<Link
					to="/listar"
					style={{
							textDecoration: 'none',
							color: 'inherit'
					}}
				>
					<li
						className="nav-item mb-2 mt-2 borda-houver"
						style={{
							fontSize: '13pt',
							cursor: 'pointer'
						}}
					>
					<i className="fas fa-list-ul mr-1"></i>
						Lista de Funcionários
					</li>
				</Link>
				<Link
					to="/cadastrar"
					style={{
							textDecoration: 'none',
							color: 'inherit'
					}}
				>
					<li
						className="nav-item mb-2 mt-2 borda-houver"
						style={{
							fontSize: '13pt',
							cursor: 'pointer'
						}}
					>
						<i className="fas fa-user-plus mr-1"></i>
						Cadastrar funcionário
					</li>
				</Link>
			</ul>
		</nav>
			
		<main role="main" className="col-md-10">
          <div
		  		className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 pb-2 mb-3 border-bottom"
		 >
            <h2>Dashboard</h2>
            <h6
				style={{cursor: 'pointer'}}
				onClick={() => {
					logout()
					document.location.reload();
				}
			}
			>Sair <i className="fas fa-sign-out-alt"></i></h6>
          </div>
		  <div className="container pl-5 pt-5 bg-light">
			<Switch>
				<Route path="/listar" exact={true} component={ListarFuncionarios} />
				<Route path="/cadastrar" component={CadastrarFuncionario} />
				<Route path="/editar/*" component={AtualizarFuncionario} />
				<Route exact={true} path="/*" component={home} />
			</Switch>
		  </div>
        </main>
		</div></div>;
	}
}

function home() {
	return <div className="d-flex flex-column align-items-center">
				<h2>Bem vindo ao sistema de gerenciamento de funcioários</h2>
				<h3>Escolha uma das opções no menu ao lado</h3>
			</div>;
}

export default App;
