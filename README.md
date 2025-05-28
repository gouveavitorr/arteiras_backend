## Projeto Arteiras (backend)

## Configuração

* Clone o repositório

```sh

    git clone https://github.com/gouveavitorr/arteiras_backend.git
    cd arteiras_backend

```

* Instale as dependências

```sh

    npm install

```

* Defina as variáveis de ambiente

```sh

    touch .env

```

```env

    DATABASE_URL="Url de conexão do banco de dados (postgres)"
    AUTH_SECRET="senha utilizada no JWT"
    PORT="A porta para a API"
    HOST="O host para a API"

```

* Inicie a API

```sh

    npm run dev

```
