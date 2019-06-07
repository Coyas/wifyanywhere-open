# wifyanywhere
site em node do wifianywhere.

#### Como iniciar a aplicacao
1° : git clone https://github.com/Coyas/wifyanywhere.git

2° : npm install & bower install

3° : Run de app
```$xslt

 3.1: npm test => node bin/www
 3.2: npm start => nodemon bin/www
```


### extrutura de arquivos
```$xslt

./bin  - arquivos para iniciar o servidor de frontend

./models

./public - onde reside todos os ficheiros estaticos do projecto(imagens, icons, logo, css, js, etc)

./routes - mapas das rotas ou caminhos(url) para as views

./views - a contem o design das paginas web(html, css) 

./views/partials - contem as partes de codigos usados em main

./views/layouts  - comtem a estrutura html da pagina
```


### tenologias usadas

```$xslt
- nodejs
- express
- handlebars
- html5
- css3
- js ES6

```

### sistema de pagamento
```
Os dados do formulario do booking online sera guardado no bando de dados, principalmento os dados da ordem de aluguer, e os dados do requerente sao os dados do utilizador, que pode ser introduzido( ou atualizado) quando se pretende alugar um despositivo.
Sim, pode ser introduzido na hora de alugar um despositivo, pois sao dados do perfil do utilizador e por isso podem ser prenchidas mesmo antes de tentar alugar um despositivo direto no perfil do usuario.

Depois de confirmar os dados da ordem e sobre informacoes de pagamento(pessoais, nao cartao de credito), passa para a etapa do pagamento online.
O pagamento online é feito atravez do cartao visa e as informacoes como numero de cartao, data de expiracao, nome do titular e cvc nao sao guardadas no sistema por razoes de seguranca.
Os dados do cartao seguirao para os servidores da [sisp](https://www.sisp.cv/) e serao devidamente tratadas de modo a efetuar o pagamento online.
```