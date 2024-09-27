-- DropIndex
DROP INDEX "Post_authorId_title_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "city" DROP NOT NULL;
