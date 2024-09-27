/*
  Warnings:

  - A unique constraint covering the columns `[pinnedById]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "pinnedById" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Post_pinnedById_key" ON "Post"("pinnedById");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_pinnedById_fkey" FOREIGN KEY ("pinnedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
