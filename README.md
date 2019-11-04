# Funcionários Paytour Frontend

Este projeto constitui uma interface web desenvolvida com as tecnologias ReactJs e Bootstrap 4. Esta interface consome uma API RestFul de gerenciamento de funcionários desenvolvida com Laravel. Para executar esta aplicação execute: `yarn install` e, em seguida, `yarn start`.

## API
A API RestFul expira o JWT a cada 1 hora, para contornar isso, o código automaticamente detecta quando o token está próximo (a 10min) de vencer e realiza a renovação. Se o usuário fechar a página, após uma hora, o token estará vencido. Esta é uma feature de segurança do JWT.

## Autor

Este sistema foi desenvolvido por Matheus Alves de Andrade.
contatos: https://matheusalves.com.br
