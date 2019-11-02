import React from 'react';
import './main.css';

class App extends React.Component {

	state = {};

	componentDidMount() {
		// TODO
	}

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
			</ul>
		</nav>
			
		<main role="main" className="col-md-10">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
            <h1 className="h2">Dashboard</h1>
            <h6>Sair <i class="fas fa-sign-out-alt"></i></h6>
          </div>
		  <div>
			  <h1>Conteúdo</h1>
		  </div>
        </main>
		</div></div>;
	}
}

export default App;
