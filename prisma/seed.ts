import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const rosa = await prisma.seller.upsert({
    where: { id: "1" },
    update: {},
    create: {
      id: "1",
      name: "Rosa Maria",
      cpf: "12345678911",
      phoneNumber: "5100000000",
    },
  });

  const rosinha = await prisma.seller.upsert({
    where: { id: "2" },
    update: {},
    create: {
      id: "2",
      name: "Marjorie Estiano",
      cpf: "12345678912",
      phoneNumber: "51033330000",
    },
  });

  const fulana = await prisma.seller.upsert({
    where: { id: "3" },
    update: {},
    create: {
      id: "3",
      name: "Vovó Juju",
      cpf: "12345678913",
      phoneNumber: "510001031000",
    },
  });

  const cicrana = await prisma.seller.upsert({
    where: { id: "4" },
    update: {},
    create: {
      id: "4",
      name: "Tia Josi",
      cpf: "12345678914",
      phoneNumber: "5100002220000",
    },
  });

  const rosinhaArtesanatos = await prisma.store.upsert({
    where: { id: "1" },
    update: {},
    create: {
      id: "1",
      name: "Rosinha Artesanatos",
      description: "Aqui transformo linhas em peças únicas.",
      image: "imagem.jpg",
      sellerId: "1",
    },
  });

  const marjorieArtesanatos = await prisma.store.upsert({
    where: { id: "2" },
    update: {},
    create: {
      id: "2",
      name: "Marjorie Artesanatos",
      description: "Aqui transformo madeiras em peças únicas.",
      image: "imagem.jpg",
      sellerId: "2",
    },
  });

  const jujuArtesanatos = await prisma.store.upsert({
    where: { id: "3" },
    update: {},
    create: {
      id: "3",
      name: "Juju Artesanatos",
      description: "Aqui transformo crochê em peças únicas.",
      image: "imagem.jpg",
      sellerId: "3",
    },
  });

  const josiArtesanatos = await prisma.store.upsert({
    where: { id: "4" },
    update: {},
    create: {
      id: "4",
      name: "Josi Artesanatos",
      description: "Aqui transformo vidro em peças únicas.",
      image: "imagem.jpg",
      sellerId: "4",
    },
  });

  const cachecol = await prisma.product.upsert({
    where: { id: "1" },
    update: {},
    create: {
      id: "1",
      name: "Cachecol",
      price: 10.99,
      description: "Cachecol com 1 metro de comprimento na cor vermelha.",
      weight: 1,
      size: 100,
      quantity: 1,
      storeId: "1",
    },
  });

  const polaina = await prisma.product.upsert({
    where: { id: "2" },
    update: {},
    create: {
      id: "2",
      name: "Polaina",
      price: 25.99,
      description: "Polaina quentinha.",
      weight: 1,
      size: 100,
      quantity: 1,
      storeId: "1",
    },
  });

  const boneca = await prisma.product.upsert({
    where: { id: "3" },
    update: {},
    create: {
      id: "3",
      name: "Boneca de pano",
      price: 45.99,
      description: "Linda boneca.",
      weight: 1,
      size: 100,
      quantity: 1,
      storeId: "3",
    },
  });

  const mosaico = await prisma.product.upsert({
    where: { id: "4" },
    update: {},
    create: {
      id: "4",
      name: "Mosaico",
      price: 62.9,
      description: "Lindo mosaico.",
      weight: 1,
      size: 100,
      quantity: 1,
      storeId: "4",
    },
  });

  const categoriaUm = await prisma.category.upsert({
    where: { id: "1" },
    update: {},
    create: {
      id: "1",
      name: "Linhas",
      stores: {
        connect: [{ id: "1" }, { id: "3" }],
      },
      products: {
        connect: [{ id: "1" }, { id: "3" }],
      },
    },
  });

  const categoriaDois = await prisma.category.upsert({
    where: { id: "2" },
    update: {},
    create: {
      id: "2",
      name: "Outros",
      stores: {
        connect: [{ id: "2" }, { id: "4" }],
      },
      products: {
        connect: [{ id: "2" }, { id: "4" }],
      },
    },
  });
}

main();
