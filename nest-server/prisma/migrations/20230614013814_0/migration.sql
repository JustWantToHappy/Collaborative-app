-- DropIndex
DROP INDEX `User_email_key` ON `user`;

-- AlterTable
ALTER TABLE `group` MODIFY `leaderId` VARCHAR(191) NOT NULL;
