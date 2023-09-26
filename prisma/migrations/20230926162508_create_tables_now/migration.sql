/*
  Warnings:

  - The primary key for the `applications` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Roles` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[roleId]` on the table `applications` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `applications` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roleId` to the `applications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "applications" DROP CONSTRAINT "applications_pkey",
ADD COLUMN     "roleId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "applications_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "applications_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- DropTable
DROP TABLE "Roles";

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "applicationId" TEXT,
    "permissions" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersToRoles" (
    "applicationId" TEXT NOT NULL,
    "roledId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UsersToRoles_pkey" PRIMARY KEY ("applicationId","roledId","userId")
);

-- CreateIndex
CREATE INDEX "roles_name_applicationId_idx" ON "roles"("name", "applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "roles_id_key" ON "roles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "applications_roleId_key" ON "applications"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "applications_id_key" ON "applications"("id");

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_id_fkey" FOREIGN KEY ("id") REFERENCES "applications"("roleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersToRoles" ADD CONSTRAINT "UsersToRoles_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersToRoles" ADD CONSTRAINT "UsersToRoles_roledId_fkey" FOREIGN KEY ("roledId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersToRoles" ADD CONSTRAINT "UsersToRoles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
