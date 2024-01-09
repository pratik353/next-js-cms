/*
  Warnings:

  - You are about to drop the column `Password` on the `user` table. All the data in the column will be lost.
  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" RENAME COLUMN "Password" TO "password" ;

-- RenameIndex
ALTER INDEX "user_Email_key" RENAME TO "user_email_key";
