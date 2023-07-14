-- AlterTable
ALTER TABLE "patient_infos" ALTER COLUMN "main_deseases" SET NOT NULL,
ALTER COLUMN "main_deseases" SET DATA TYPE TEXT,
ALTER COLUMN "antecedents_comorbidities" SET NOT NULL,
ALTER COLUMN "antecedents_comorbidities" SET DATA TYPE TEXT,
ALTER COLUMN "suport_needed" SET NOT NULL,
ALTER COLUMN "suport_needed" SET DATA TYPE TEXT;
