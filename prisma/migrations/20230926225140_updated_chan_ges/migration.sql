/*
  Warnings:

  - You are about to drop the column `applicationId` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the `applications` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[applicationId]` on the table `UsersToRoles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roledId]` on the table `UsersToRoles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `UsersToRoles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[application_id]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `application_id` to the `roles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UsersToRoles" DROP CONSTRAINT "UsersToRoles_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "applications" DROP CONSTRAINT "applications_userId_fkey";

-- DropForeignKey
ALTER TABLE "roles" DROP CONSTRAINT "roles_id_fkey";

-- DropIndex
DROP INDEX "roles_name_applicationId_idx";

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "applicationId",
ADD COLUMN     "application_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "applicationId" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "applications";

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UsersToRoles_applicationId_key" ON "UsersToRoles"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "UsersToRoles_roledId_key" ON "UsersToRoles"("roledId");

-- CreateIndex
CREATE UNIQUE INDEX "UsersToRoles_userId_key" ON "UsersToRoles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "roles_application_id_key" ON "roles"("application_id");

-- CreateIndex
CREATE INDEX "roles_name_applicationId_idx" ON "roles"("name", "application_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersToRoles" ADD CONSTRAINT "UsersToRoles_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
