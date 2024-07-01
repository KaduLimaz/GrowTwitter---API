/*
  Warnings:

  - You are about to drop the column `id_seguidor` on the `followers` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "followers_id_usuario_id_seguidor_key";

-- AlterTable
ALTER TABLE "followers" DROP COLUMN "id_seguidor";
