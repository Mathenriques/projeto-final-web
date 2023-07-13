/*
  Warnings:

  - Changed the type of `status` on the `solicitations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "StatusSolicitation" AS ENUM ('Pendente', 'Approvado', 'Reprovado', 'Finalizado');

-- AlterTable
ALTER TABLE "solicitations" DROP COLUMN "status",
ADD COLUMN     "status" "StatusSolicitation" NOT NULL;
