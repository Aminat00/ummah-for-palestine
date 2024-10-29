/*
  Warnings:

  - You are about to drop the column `juzNumber` on the `Khatm` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Khatm" DROP COLUMN "juzNumber",
ADD COLUMN     "selectedJuzNumbers" "JuzNumber"[];
