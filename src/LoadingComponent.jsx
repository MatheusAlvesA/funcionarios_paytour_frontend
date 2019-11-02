import React from 'react';

export default class LoadingComponent extends React.Component {
	state = {n: 0};
	montado = false;
	intervalo = 0;

	componentDidMount() {
		this.montado = true;
		this.intervalo = setInterval(() => {
			let { n } = this.state;
			n++;
			n = n%4;
			if(this.montado)
				this.setState({n})
		}, 1000);
	}

	componentWillUnmount() {
		this.montado = false;
		clearInterval(this.intervalo);
	}

	render() {
		return <h2 style={{padding: '20px'}}><i className="fas fa-mug-hot"></i> Carregando{this.getPontos()}</h2>;
	}

	getPontos = () => {
		let { n } = this.state;
		let r = '';
		for(let i = 0; i < n; i++)
			r += '.';
		return r;
	}
}
