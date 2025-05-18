NEXT TASKS:
    - Como implementar o processo de "esqueci a senha"
    - Classes utilitárias de CPF, phoneNumber, address etc para tratamento de dados
    - ID na URL e o resto no body - dependendo da entidade
    - 

[] User Signup/Login
    [✅] POST /auth/signup 
    [✅] POST /auth/login
    []POST /auth/logout
    [✅] GET /auth/me – pegar o perfil 

[✅] Customer Profile
    GET /customers/:customerId – pegar o perfil de comprador
    PUT /customers/:customerId – atualizar infos
    GET /customers/:customerId/orders – pedidos

[✅] Product Listing & Details
    GET /products – aqui a gente pode incluir paginação (quantidade de itens enviados por vez na requisição, tipo products/?=1, e outras coisas como filtragem pela slug)
    GET /products/:productId

[✅] Categories
    GET /categories
    GET /categories/:categoryId/products – produtos em categoria(s) específica(s)
    GET/categories/:categoryId/stores - lojas com categorias específicas

[✅] Store Information
    GET /stores – (filtros na slug opcionais, mas acho que não faz sentido)
    GET /stores/:storeId

[✅] Cart Operations
    POST /cart/add – pending cart
    PUT /cart/update – atualizar qtd de produtos
    DELETE /cart/remove/:productId - remover um item só
    DELETE /cart/clear – remover todos os itens
    GET /cart – ver carrinho

[] Checkout
    POST /checkout – Processo de checkout (gerar uma order com base no carrinho, calcular total, custo de entrega etc)

[✅] Order Management
    GET /orders – pedidos do usuário logado
    GET /orders/:orderId

[] Payment Methods
    GET /payments/methods – métodos disponíveis praquele usuário
    POST /payments/methods/add
    DELETE /payments/methods/:paymentMethodId

[] Payment Processing
    POST /payments/:orderId – pagar pedido específico
    GET /payments/status/:orderId – checar status do pagamento de pedido específico

[] Address Management
    GET /addresses - endereços do usuário logado
    POST /addresses – adicionar um endereço novo
    PUT /addresses/:addressId – atualizar endereço
    DELETE /addresses/:addressId

[] Order Tracking
    GET /orders/:orderId/tracking – tracking info

