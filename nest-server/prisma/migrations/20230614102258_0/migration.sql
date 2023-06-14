/*
  Warnings:

  - You are about to drop the column `createdAt` on the `userfriend` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `userfriend` DROP COLUMN `createdAt`,
    ADD COLUMN `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
