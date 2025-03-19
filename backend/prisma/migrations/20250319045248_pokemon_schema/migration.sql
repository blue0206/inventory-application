/*
  Warnings:

  - The `types` column on the `Pokemon` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Pokemon" DROP COLUMN "types",
ADD COLUMN     "types" TEXT[];

-- DropEnum
DROP TYPE "PokeType";
