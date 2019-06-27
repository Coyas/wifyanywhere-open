# wifyanywhere

site em node do wifianywhere.


#### clone o app
1° : git clone https://github.com/Coyas/wifyanywhere.git

##### Adicione as chaves do app


As chaves do app sao as credencias do seu banco de dados, as credenciais de autenticacao do 
facebook e google, as configuracoes do servidor de email.

copie este codigo e crie um ficheiro com o nome "keys.json", e estao cole a linha de codigo
json no arquivo:
```
{
    "google":
    {
        "client_id":"id do google api",
        "project_id":"wifianywhere",
        "auth_uri":"https://accounts.google.com/o/oauth2/auth",
        "token_uri":"https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
        "client_secret":"chave secreto do cliente",
        "redirect_uris":["http://localhost:3000/auth/google/redirect"],
        "javascript_origins":["http://localhost:3000"]
    },
    "facebook":
    {
        "clientID": "ciente ai do facebook",
        "clientSecret": "chave secreto do facebook",
        "callbackURL": "http://localhost:3000/auth/facebook/callback"
    },
    "mysql":
    {
        "host": "localhost",
        "dbname": "wifianywhere",
        "user": "root",
        "pass": "",
        "dialect": "mysql"
    },
    "email":
    {
        "smtp": "smtp.doseufornecedordeemail.com",
        "porta": 465,
        "seguro": true,
        "user": "emaildeenvio@email.com",
        "pass": "Sua12senha#aqui"

    }
}

```
Depois vai em [Google Console Developers](https://console.developers.google.com) e crie as credenciais para a autenticacao com google.
Vai em [Facebook Developers](https://developers.facebook.com/) e cria as credenciais para autenticacao com facebook

#### Como iniciar a aplicacao
```$xslt
1.1: npm install bower -g

2° : npm install
3° : bower install

4° : Run de app
 4.1: npm test => node bin/www
 4.2: npm start => nodemon bin/www
```



### extrutura de arquivos

./bin - configuracao do servidor node

./congig (configuracoes da aplicacao)

    - db : configuracoes de conexao com o banco de dados

    - keys : chaves de acesso ao banco de dados, facebook auth system, google auth system, etc, chaves...

    - mail : configuracoes para envio de email
    
    - passport-config : configuracoes do passport e das suas estrategias de autenticacao

./i18n (pacote de traducao e localizacao)

    - en : traducoes para a lingua inglesa

    - pt : traducaes para a lingua portuguesa

    - fr : traducoes para a lingua francesa

./models (modelos para criar as tabelas no banco de dados)
    - User : esquema da tabela user

./public (ficheiros estaticos do site)

    - css/main & css/style : pacotes para a estilizacao do site

    - css/media : media queries para o site

    - fonts/* : fontes de textos usados no site

    - imagens/* : imagens usadas no site

    - js/* : customizacao do [DOM](https://pt.wikipedia.org/wiki/Modelo_de_Objeto_de_Documentos)
     do site e e interacoes

./routes (rotas/acessos do site)

    - auth : rotas para autenticacao de facebook, google e local-login

    - booking : rotas para o online booking

    - home : rotas para as paginas principais

    - pagamento : rotas para o seccao de pagamento online via rede Visa

    - user : rotas de acesso aos dados do utilizador
    
./views




### tenologias usadas


- [nodejs](https://nodejs.org/) (servidor)
- [express](https://expressjs.com/) (pacotes para servidor web (node))
- handlebars (tamplete engine)
- html5 (marcacao de texto)
- css3 (marcacao de estilos)
- js ES6 (versao atualizado do javascript)
- i18n-express (pacote de internacionalizacao, para traducao do site em outras linguas)
- modemailer (pacote de envio de email)
- sequelize ORM (pacote de Mapeamento objeto-relaçao do banco de dados)
- passport facebook Auth2.0 (integracao com sistema de autenticacao do facebook)
- passport google Auth2.0 (integracao com sistema de autenticacao do google)
- mysql  (banco de dados)



### sistema de pagamento

Os dados do formulario do booking online sera guardado no bando de dados, dados como
da ordem de aluguer, e os dados do requerente, e estes tanbem sao os dados do utilizador, 
que consequentimente pode ser 
Tambem podem ser introduzidos na hora de alugar um despositivo, pois sao dados do perfil do 
utilizador e por isso podem ser prenchidas mesmo antes de tentar alugar um despositivo direto
 no perfil do usuario.

Depois de confirmar os dados da ordem e sobre informacoes de pagamento(pessoais, nao cartao de
 credito), 
passa para a etapa do pagamento online.
O pagamento online é feito atravez do cartao visa e as informacoes como numero de cartao, data
 de expiracao,
nome do titular e cvc nao sao guardadas no sistema por razoes de seguranca, segundo os normas 
da [sisp](https://www.sisp.cv/).
Os dados do cartao seguirao para os servidores da [sisp](https://www.sisp.cv/) e serao devidamente 
tratadas 
de modo a efetuar o pagamento online.
Depois da [sisp](https://www.sisp.cv/) confirmar o pagamento, sera enviado uma mensagem/email para
 a conta do utilizador a confirmar o pagamento.

