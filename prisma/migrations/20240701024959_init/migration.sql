/*
  Warnings:

  - You are about to drop the column `atualizado_em` on the `followers` table. All the data in the column will be lost.
  - You are about to drop the column `criado_em` on the `followers` table. All the data in the column will be lost.
  - You are about to drop the column `id_usuario` on the `followers` table. All the data in the column will be lost.
  - Added the required column `userId` to the `followers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "followers" DROP CONSTRAINT "followers_id_usuario_fkey";

-- AlterTable
ALTER TABLE "followers" DROP COLUMN "atualizado_em",
DROP COLUMN "criado_em",
DROP COLUMN "id_usuario",
ADD COLUMN     "userId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "followers" ADD CONSTRAINT "followers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
