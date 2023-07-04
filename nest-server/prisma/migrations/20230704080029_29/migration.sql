/*
  Warnings:

  - You are about to drop the column `isshared` on the `cloudfile` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `cloudfile` table. All the data in the column will be lost.
  - You are about to drop the column `onlineIds` on the `onlineeditperson` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `cloudfile` DROP FOREIGN KEY `CloudFile_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `onlineeditperson` DROP FOREIGN KEY `OnlineEditPerson_id_fkey`;

-- AlterTable
ALTER TABLE `cloudfile` DROP COLUMN `isshared`,
    DROP COLUMN `ownerId`,
    ADD COLUMN `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `onlineeditperson` DROP COLUMN `onlineIds`,
    ADD COLUMN `sharedCloudFileId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `SharedCloudFile` (
    `id` VARCHAR(191) NOT NULL,
    `parentId` VARCHAR(191) NOT NULL DEFAULT '0',
    `isshared` INTEGER NOT NULL DEFAULT 0,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `path` VARCHAR(191) NOT NULL DEFAULT '',
    `type` VARCHAR(191) NOT NULL DEFAULT 'folder',
    `text` LONGTEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `collaborators` TEXT NULL,
    `ownerId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CloudFile` ADD CONSTRAINT `CloudFile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SharedCloudFile` ADD CONSTRAINT `SharedCloudFile_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OnlineEditPerson` ADD CONSTRAINT `OnlineEditPerson_sharedCloudFileId_fkey` FOREIGN KEY (`sharedCloudFileId`) REFERENCES `SharedCloudFile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
