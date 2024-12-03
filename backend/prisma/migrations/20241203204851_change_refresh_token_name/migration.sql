/*
  Warnings:

  - You are about to drop the column `refreshTokens` on the `RefreshTokens` table. All the data in the column will be lost.
  - Added the required column `token` to the `RefreshTokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RefreshTokens" DROP COLUMN "refreshTokens",
ADD COLUMN     "token" TEXT NOT NULL;
