/*
  Warnings:

  - Changed the type of `birth_date` on the `patients` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "patients" DROP COLUMN "birth_date",
ADD COLUMN     "birth_date" TIMESTAMP(3) NOT NULL;
