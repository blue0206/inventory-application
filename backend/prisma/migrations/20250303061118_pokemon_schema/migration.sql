/*
  Warnings:

  - Added the required column `imageLink` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageLink` to the `Trainer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pokemon" ADD COLUMN     "imageLink" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Trainer" ADD COLUMN     "imageLink" TEXT NOT NULL;
