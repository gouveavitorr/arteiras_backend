
      +----+--------------------------------+
      |    | User                           |
      +----+--------------------------------+
      | PK | id             String          |
      |    | name           String          |
      |    | email          String          |
      |    | password       String          |
      |    | role           Role            |
      |    | cpf            String?         |
      |    | phoneNumber    String?         |
      +----+--------------------------------+

      +----+--------------------------------+
      |    | Product                        |
      +----+--------------------------------+
      | PK | id          String             |
      |    | name        String             |
      |    | price       Float              |
      |    | description String             |
      |    | weight      Float              |
      |    | size        Float              |
      |    | quantity    Int                |
      |    | createdAt   DateTime           |
      |    | updatedAt   DateTime           |
      | FK | storeId     String             |
      +----+--------------------------------+

      +----+------------------+
      |    | Image            |
      +----+------------------+
      | PK | id        String |
      |    | link      String |
      | FK | productId String |
      +----+------------------+

      +----+-------------------+
      |    | Category_Product  |
      +----+-------------------+
      | PK | categoryId String |
      | PK | productId  String |
      +----+-------------------+

      +----+------------------+
      |    | Category         |
      +----+------------------+
      | PK | id       String  |
      |    | name     String  |
      +----+------------------+

      +----+-------------------+
      |    | Category_Store    |
      +----+-------------------+
      | PK | categoryId String |
      | PK | storeId    String |
      +----+-------------------+

      +----+---------------------+
      |    | Store               |
      +----+---------------------+
      | PK | id          String  |
      |    | name        String  |
      |    | description String  |
      |    | image       String  |
      |    | phoneNumber String? |
      |    | instagramId String? |
      |    | facebookId  String? |
      | FK | sellerId    String  |
      +----+---------------------+

      +----+----------------+
      |    | Store_Order    |
      +----+----------------+
      | PK | storeId String |
      | PK | orderId String |
      +----+----------------+

      +----+--------------------+
      |    | Seller             |
      +----+--------------------+
      | PK | id          String |
      |    | name        String |
      |    | cpf         String |
      |    | phoneNumber String |
      | FK | StoreId     String |
      +----+--------------------+

      +----+----------------------+
      |    | Address              |
      +----+----------------------+
      | PK | id           String  |
      |    | street       String  |
      |    | number       String  |
      |    | neighborhood String? |
      |    | city         String  |
      |    | state        String  |
      |    | country      String  |
      |    | postalCode   String  |
      |    | recipient    String  |
      |    | reference    String? |
      | FK | userId       String  |
      +----+----------------------+

      +----+----------------+
      |    | PaymentMethod  |
      +----+----------------+
      | PK | id     String  |
      |    | type   String  |
      | FK | userId String  |
      +----+----------------+

      +----+--------------------------------+
      |    | CartItem                       |
      +----+--------------------------------+
      | PK | id        String               |
      |    | quantity  Int                  |
      |    | createdAt DateTime             |
      |    | updatedAt DateTime             |
      | FK | userId    String               |
      | FK | productId String               |
      +----+--------------------------------+

      +----+---------------------------------+
      |    | Order                           |
      +----+---------------------------------+
      | PK | id               String         |
      |    | totalAmount      Float          |
      |    | deliveryExpenses Float          |
      |    | orderStatus      orderStatus    |
      |    | trackingCode     String         |
      |    | createdAt        DateTime       |
      |    | updatedAt        DateTime       |
      | FK | userId           String         |
      | FK | addressId        String?        |
      | FK | paymentMethodId  String?        |
      +----+---------------------------------+

      +----+-------------------+
      |    | OrderItem         |
      +----+-------------------+
      | PK | id        String  |
      |    | quantity  Int     |
      | FK | productId String  |
      | FK | orderId   String  |
      +----+-------------------+
