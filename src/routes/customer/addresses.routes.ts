import { FastifyInstance } from "fastify";
import { AddressManagementController } from "../../controllers/customer/address-management.controller";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { AddressRequest, EditAddressInterface } from "../../usecases/customer/address-management.usecases";

const controller = new AddressManagementController()

export async function addressesRouter(app: FastifyInstance) {
    app.get("/", { preHandler: isAuthenticated }, controller.getAddresses)
    app.post<{ Body: AddressRequest }>("/", { preHandler: isAuthenticated }, controller.addAddress)
    app.put<{ Body: EditAddressInterface, Params: { addressId: string } }>("/:addressId", { preHandler: isAuthenticated }, controller.updateAddress)
    app.delete<{ Params: { addressId: string } }>("/:addressId", { preHandler: isAuthenticated }, controller.removeAddress)
    app.get<{ Params: { postalCode: string } }>("/postalcode/:postalCode", { preHandler: isAuthenticated }, controller.getPostalCode)
}
