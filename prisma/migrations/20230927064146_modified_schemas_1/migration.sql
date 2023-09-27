/*
  Warnings:

  - The primary key for the `Application` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Application` table. All the data in the column will be lost.
  - The required column `appId` was added to the `Application` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "UsersToRoles" DROP CONSTRAINT "UsersToRoles_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "roles" DROP CONSTRAINT "roles_application_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_applicationId_fkey";

-- DropIndex
DROP INDEX "roles_application_id_key";

-- AlterTable
ALTER TABLE "Application" DROP CONSTRAINT "Application_pkey",
DROP COLUMN "id",
ADD COLUMN     "appId" TEXT NOT NULL,
ADD CONSTRAINT "Application_pkey" PRIMARY KEY ("appId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("appId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "Application"("appId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersToRoles" ADD CONSTRAINT "UsersToRoles_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("appId") ON DELETE RESTRICT ON UPDATE CASCADE;
