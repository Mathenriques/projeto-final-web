/*
  Warnings:

  - The values [Approvado] on the enum `StatusSolicitation` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusSolicitation_new" AS ENUM ('Pendente', 'Aprovado', 'Reprovado', 'Finalizado');
ALTER TABLE "solicitations" ALTER COLUMN "status" TYPE "StatusSolicitation_new" USING ("status"::text::"StatusSolicitation_new");
ALTER TYPE "StatusSolicitation" RENAME TO "StatusSolicitation_old";
ALTER TYPE "StatusSolicitation_new" RENAME TO "StatusSolicitation";
DROP TYPE "StatusSolicitation_old";
COMMIT;
