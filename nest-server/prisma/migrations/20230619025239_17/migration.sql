/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `Image_path_fkey`;

-- DropIndex
DROP INDEX `Message_imageUrl_key` ON `message`;

-- AlterTable
ALTER TABLE `message` DROP COLUMN `imageUrl`;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_path_fkey` FOREIGN KEY (`path`) REFERENCES `Message`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
