import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const rosa = await prisma.seller.upsert({
    where: {id: '1'},
    update: {},
    create: {
      id: '1',
      name: 'Rosa Maria',
      cpf: '12345',
      phoneNumber: '5100000000',
    }
  })
  
  const rosinhaArtesanatos = await prisma.store.upsert({
    where: {id: '1'},
    update: {},
    create: {
      id: '1',
      name: 'Rosinha Artesanatos',
      description: 'Aqui transformo linhas em peças únicas.',
      sellerId: '1',
    }
  })
  
  const cachecol = await prisma.product.upsert({
    where: {id: '1'},
    update: {},
    create: {
      id: '1',
      name: 'Cachecol',
      price: 10.99,
      description: 'Cachecol com 1 metro de comprimento na cor vermelha.',
      weight: 1,
      size: 100,
      quantity: 1,
      storeId: '1'
    }
  })
  console.log({rosa, rosinhaArtesanatos, cachecol})
}

main()