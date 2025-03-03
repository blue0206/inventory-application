/*
  Warnings:

  - Changed the type of `name` on the `Type` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PokeType" AS ENUM ('NORMAL', 'FIRE', 'WATER', 'GRASS', 'ELECTRIC', 'ICE', 'FIGHTING', 'POISON', 'GROUND', 'FLYING', 'PSYCHIC', 'BUG', 'ROCK', 'GHOST', 'DRAGON', 'DARK', 'STEEL', 'FAIRY');

-- AlterTable
ALTER TABLE "Type" DROP COLUMN "name",
ADD COLUMN     "name" "PokeType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Type_name_key" ON "Type"("name");
