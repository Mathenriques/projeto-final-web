/*
  Warnings:

  - You are about to drop the column `approved` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `crm_coren` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password_hash` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[register]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `register` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Masculino', 'Feminino');

-- CreateEnum
CREATE TYPE "Precaution" AS ENUM ('Padrao', 'Contato', 'Respiratorio_Goticula', 'Respiratory_Aerossol');

-- CreateEnum
CREATE TYPE "StatusUtiBed" AS ENUM ('Livre', 'Limpeza', 'Ocupado');

-- DropIndex
DROP INDEX "users_crm_coren_key";

-- DropIndex
DROP INDEX "users_email_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "approved",
DROP COLUMN "crm_coren",
DROP COLUMN "email",
DROP COLUMN "password_hash",
DROP COLUMN "role",
ADD COLUMN     "register" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "patients" (
    "id" TEXT NOT NULL,
    "birth_date" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collaborators" (
    "id" TEXT NOT NULL,
    "medical_register" TEXT NOT NULL,
    "function" "Role" NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "collaborators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solicitations" (
    "id" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "collaborator_id" TEXT NOT NULL,

    CONSTRAINT "solicitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient_infos" (
    "id" TEXT NOT NULL,
    "main_deseases" TEXT[],
    "precaution" "Precaution" NOT NULL,
    "antecedents_comorbidities" TEXT[],
    "suport_needed" TEXT[],
    "patient_id" TEXT NOT NULL,
    "solicitation_id" TEXT NOT NULL,

    CONSTRAINT "patient_infos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "uti_beds" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" "StatusUtiBed" NOT NULL,

    CONSTRAINT "uti_beds_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "patients_user_id_key" ON "patients"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "collaborators_medical_register_key" ON "collaborators"("medical_register");

-- CreateIndex
CREATE UNIQUE INDEX "collaborators_email_key" ON "collaborators"("email");

-- CreateIndex
CREATE UNIQUE INDEX "collaborators_user_id_key" ON "collaborators"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "patient_infos_solicitation_id_key" ON "patient_infos"("solicitation_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_register_key" ON "users"("register");

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collaborators" ADD CONSTRAINT "collaborators_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitations" ADD CONSTRAINT "solicitations_collaborator_id_fkey" FOREIGN KEY ("collaborator_id") REFERENCES "collaborators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_infos" ADD CONSTRAINT "patient_infos_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_infos" ADD CONSTRAINT "patient_infos_solicitation_id_fkey" FOREIGN KEY ("solicitation_id") REFERENCES "solicitations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
