/*
  Warnings:

  - You are about to drop the column `depth` on the `Menu` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[parentId]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "depth";

-- CreateIndex
CREATE UNIQUE INDEX "Menu_parentId_key" ON "Menu"("parentId");
