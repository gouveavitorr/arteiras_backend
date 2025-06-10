* NEXT TASKS:
    - Já deixei como todo, mas precisamos configurar os diretórios no helmet assim que soubermos a estrutura final do frontend
    - Como implementar o processo de "esqueci a senha"
    - Classes utilitárias de CPF, phoneNumber, address etc para tratamento de dados
    - ID na URL e o resto no body - dependendo da entidade

- [ ] UpdateUserProfile
    - [ ] manter valores que não foram modificados de forma eficiente sem ter que reenviar o mesmo valor para o banco

- [x] Adicionar logger

- [ ] User Signup/Login
    - [x] `POST` - `/auth/signup`
    - [x] `POST` - `/auth/login`
    - [ ] `POST` - `/auth/logout`
    - [x] `GET`  - `/auth/me` – pegar o perfil do usuário logado

- [x] Customer Profile
   - [x] `GET` - `/customers/:customerId`        – pegar o perfil de comprador
   - [x] `PUT` - `/customers/:customerId`        – atualizar infos
   - [x] `GET` - `/customers/:customerId/orders` – pedidos

- [x] Product Listing & Details
    - [x] `GET` - `/products` – aqui a gente pode incluir paginação (quantidade de itens enviados por vez na requisição, tipo products/?=1, e outras coisas como filtragem pela slug)
    - [x] `GET` - `/products/:productId`

- [x] Categories
    - [x] `GET` - `/categories`
    - [x] `GET` - `/categories/:categoryId/products` – produtos em categoria(s) específica(s)
    - [x] `GET` - `/categories/:categoryId/stores`   - lojas com categorias específicas

- [x] Store Information
    - [x] `GET` - `/stores` – (filtros na slug opcionais, mas acho que não faz sentido)
    - [x] `GET` - `/stores/:storeId`

- [x] Cart Operations
    - [x] `POST`   - `/cart/add`               – pending cart
    - [x] `PUT`    - `/cart/update`            – atualizar qtd de produtos
    - [x] `DELETE` - `/cart/remove/:productId` - remover um item só
    - [x] `DELETE` - `/cart/clear`             – remover todos os itens
    - [x] `GET`    - `/cart`                   – ver carrinho

- [ ] Checkout
    - [ ] `POST` - `/checkout` – Processo de checkout (gerar uma order com base no carrinho, calcular total, custo de entrega etc)

- [x] Order Management
    - [x] `GET` - `/orders` – pedidos do usuário logado
    - [x] `GET` - `/orders/:orderId`

- [ ] Payment Methods
    - [ ] `GET`    - `/payments/methods` – métodos disponíveis praquele usuário
    - [ ] `POST`   - `/payments/methods/add`
    - [ ] `DELETE` - `/payments/methods/:paymentMethodId`

- [ ] Payment Processing
    - [ ] `POST` - `/payments/:orderId`        – pagar pedido específico
    - [ ] `GET`  - `/payments/status/:orderId` – checar status do pagamento de pedido específico

- [ ] Address Management
    - [x] `GET`    - `/addresses`            - endereços do usuário logado
    - [x] `POST`   - `/addresses`            – adicionar um endereço novo
    - [x] `PUT`    - `/addresses/:addressId` – atualizar endereço
    - [x] `DELETE` - `/addresses/:addressId`

- [ ] Order Tracking
    - [ ] `GET` - `/orders/:orderId/tracking` – tracking info
