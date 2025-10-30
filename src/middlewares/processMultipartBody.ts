import { FastifyReply, FastifyRequest } from "fastify";

export async function processMultipartBody(req: FastifyRequest, reply: FastifyReply) {
    if (!req.isMultipart()) {
        return; 
    }

    const fields: Record<string, string | null> = {};
    const parts = req.parts();

    for await (const part of parts) {
        if (part.type === 'field') {
            const fieldValue = part.value ? String(part.value) : null;
            
            fields[part.fieldname] = fieldValue;
            
        } else if (part.type === 'file') {
            (req as any).filePart = part; 
        }
    }
    
    req.body = fields; 
    
    return;
}

export async function processMultipartBodyUpdateProduct(req: FastifyRequest, reply: FastifyReply) {
    if (!req.isMultipart()) {
        return; 
    }
    const fields: Record<string, string | null> = {};
    const newImageFileParts: any[] = []; 
    const parts = req.parts();
    
    for await (const part of parts) {
        if (part.type === 'field') {
            const fieldValue = part.value ? String(part.value) : null;
            fields[part.fieldname] = fieldValue;
        } else if (part.type === 'file') {
            newImageFileParts.push(part); 
        }
    }
    
    (req as any).newImageFileParts = newImageFileParts;

    req.body = fields; 
    return;
}