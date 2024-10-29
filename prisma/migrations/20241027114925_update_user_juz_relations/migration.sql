/*
  Warnings:

  - Changed the type of `juzNumber` on the `Juz` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `juzNumber` to the `Khatm` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JuzNumber" AS ENUM ('JUZ_1', 'JUZ_2', 'JUZ_3', 'JUZ_4', 'JUZ_5', 'JUZ_6', 'JUZ_7', 'JUZ_8', 'JUZ_9', 'JUZ_10', 'JUZ_11', 'JUZ_12', 'JUZ_13', 'JUZ_14', 'JUZ_15', 'JUZ_16', 'JUZ_17', 'JUZ_18', 'JUZ_19', 'JUZ_20', 'JUZ_21', 'JUZ_22', 'JUZ_23', 'JUZ_24', 'JUZ_25', 'JUZ_26', 'JUZ_27', 'JUZ_28', 'JUZ_29', 'JUZ_30');

-- DropForeignKey
ALTER TABLE "Juz" DROP CONSTRAINT "Juz_khatm_id_fkey";

-- AlterTable
ALTER TABLE "Juz" DROP COLUMN "juzNumber",
ADD COLUMN     "juzNumber" "JuzNumber" NOT NULL;

-- AlterTable
ALTER TABLE "Khatm" ADD COLUMN     "juzNumber" "JuzNumber" NOT NULL;

-- CreateTable
CREATE TABLE "KhatmStats" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "totalCompleted" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "KhatmStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_KhatmContributors" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_KhatmContributors_AB_unique" ON "_KhatmContributors"("A", "B");

-- CreateIndex
CREATE INDEX "_KhatmContributors_B_index" ON "_KhatmContributors"("B");

-- CreateIndex
CREATE INDEX "Khatm_isComplete_idx" ON "Khatm"("isComplete");

-- AddForeignKey
ALTER TABLE "Juz" ADD CONSTRAINT "Juz_khatm_id_fkey" FOREIGN KEY ("khatm_id") REFERENCES "Khatm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KhatmContributors" ADD CONSTRAINT "_KhatmContributors_A_fkey" FOREIGN KEY ("A") REFERENCES "Khatm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KhatmContributors" ADD CONSTRAINT "_KhatmContributors_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
