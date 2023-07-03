-- AlterTable
ALTER TABLE `clouddocument` MODIFY `title` VARCHAR(191) NOT NULL DEFAULT '文档';

-- AlterTable
ALTER TABLE `image` ADD COLUMN `title` VARCHAR(191) NOT NULL DEFAULT '图片';
