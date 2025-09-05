// SDK do Mercado Pago
import { MercadoPagoConfig } from 'mercadopago';
// Adicione credenciais
export const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN_MERCADO_PAGO!});