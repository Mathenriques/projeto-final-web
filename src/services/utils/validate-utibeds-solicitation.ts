import { PrismaClient } from '@prisma/client';
import { SolicitationIsNotApproved } from '../Errors/solicitation-is-not-approved-error'

const prisma = new PrismaClient();

async function validateUtiBedsSolicitation(solicitationId: string) {
    try {
        const solicitation = await prisma.solicitation.update({
            where: { id: solicitationId },
            data: { status: true },
        })
        // Solicitação Aprovada
    } catch(SolicitationIsNotApproved) {
        // Solicitação Negada
    } finally {
        await prisma.$disconnect();
    }
}