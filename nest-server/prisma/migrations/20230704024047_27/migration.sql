/*
  Warnings:

  - You are about to drop the column `userId` on the `cloudfile` table. All the data in the column will be lost.
  - You are about to drop the `clouddocument` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `collaborators` to the `CloudFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `CloudFile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `clouddocument` DROP FOREIGN KEY `CloudDocument_cloudFileId_fkey`;

-- DropForeignKey
ALTER TABLE `clouddocument` DROP FOREIGN KEY `CloudDocument_userId_fkey`;

-- DropForeignKey
ALTER TABLE `cloudfile` DROP FOREIGN KEY `CloudFile_userId_fkey`;

-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `Image_cloudFileId_fkey`;

-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `Image_userId_fkey`;

-- DropForeignKey
ALTER TABLE `onlineeditperson` DROP FOREIGN KEY `OnlineEditPerson_id_fkey`;

-- AlterTable
ALTER TABLE `cloudfile` DROP COLUMN `userId`,
    ADD COLUMN `collaborators` TEXT NOT NULL,
    ADD COLUMN `ownerId` VARCHAR(191) NULL,
    ADD COLUMN `path` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `text` LONGTEXT NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL DEFAULT 'folder';

-- DropTable
DROP TABLE `clouddocument`;

-- DropTable
DROP TABLE `image`;

-- AddForeignKey
ALTER TABLE `CloudFile` ADD CONSTRAINT `CloudFile_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OnlineEditPerson` ADD CONSTRAINT `OnlineEditPerson_id_fkey` FOREIGN KEY (`id`) REFERENCES `CloudFile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
