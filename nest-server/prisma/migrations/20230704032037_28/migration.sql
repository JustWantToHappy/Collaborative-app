-- AlterTable
ALTER TABLE `calendar` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `cloudfile` MODIFY `collaborators` TEXT NULL,
    MODIFY `text` LONGTEXT NULL;
