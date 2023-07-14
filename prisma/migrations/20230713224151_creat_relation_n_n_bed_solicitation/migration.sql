-- CreateTable
CREATE TABLE "uti_bed_solicitation" (
    "uti_bed_id" TEXT NOT NULL,
    "solicitation_id" TEXT NOT NULL,

    CONSTRAINT "uti_bed_solicitation_pkey" PRIMARY KEY ("uti_bed_id","solicitation_id")
);

-- AddForeignKey
ALTER TABLE "uti_bed_solicitation" ADD CONSTRAINT "uti_bed_solicitation_uti_bed_id_fkey" FOREIGN KEY ("uti_bed_id") REFERENCES "uti_beds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "uti_bed_solicitation" ADD CONSTRAINT "uti_bed_solicitation_solicitation_id_fkey" FOREIGN KEY ("solicitation_id") REFERENCES "solicitations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
