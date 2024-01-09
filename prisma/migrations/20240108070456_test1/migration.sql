/*
  Warnings:

  - You are about to drop the column `authorId` on the `blog` table. All the data in the column will be lost.
  - You are about to drop the column `body` on the `blog` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `blog` table. All the data in the column will be lost.
  - You are about to drop the `author` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `comments` to the `blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flags` to the `blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `blog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "blog" DROP CONSTRAINT "blog_authorId_fkey";

-- AlterTable
ALTER TABLE "blog" DROP COLUMN "authorId",
DROP COLUMN "body",
DROP COLUMN "description",
ADD COLUMN     "comments" VARCHAR(2048) NOT NULL,
ADD COLUMN     "flags" INTEGER NOT NULL,
ADD COLUMN     "status" VARCHAR(255) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tags" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "author";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "Email" VARCHAR(255) NOT NULL,
    "Password" VARCHAR(255) NOT NULL,
    "role" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "comment" VARCHAR(2048) NOT NULL,
    "blogId" INTEGER NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Block" (
    "id" SERIAL NOT NULL,
    "sequence" INTEGER NOT NULL,
    "blockData" JSONB NOT NULL,
    "blogId" INTEGER NOT NULL,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_blogTotags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_Email_key" ON "user"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "_blogTotags_AB_unique" ON "_blogTotags"("A", "B");

-- CreateIndex
CREATE INDEX "_blogTotags_B_index" ON "_blogTotags"("B");

-- AddForeignKey
ALTER TABLE "blog" ADD CONSTRAINT "blog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_blogTotags" ADD CONSTRAINT "_blogTotags_A_fkey" FOREIGN KEY ("A") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_blogTotags" ADD CONSTRAINT "_blogTotags_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
