import { FastifyInstance } from "fastify";
import { AddressManagementController } from "../../controllers/customer/address-management.controller";
import { isAuthenticated } from "../../middlewares/isAuthenticated";

const controller = new AddressManagementController()

export async function addressesRouter(app: FastifyInstance) {
    app.get("/addresses", { preHandler: isAuthenticated }, controller.getAddresses)
    app.post("/addresses", { preHandler: isAuthenticated }, controller.addAddress)
    app.put("/addresses/:addressId", { preHandler: isAuthenticated }, controller.updateAddress)
    app.delete("/addresses/:addressId", { preHandler: isAuthenticated }, controller.removeAddress)
    app.get("/postalcode/:postalCode", { preHandler: isAuthenticated }, controller.getPostalCode)
}