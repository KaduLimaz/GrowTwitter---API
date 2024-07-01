/*
  Warnings:

  - You are about to drop the `follower` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `like` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reply` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `retweet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tweet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TweetType" AS ENUM ('TWEET', 'RETWEET');

-- DropForeignKey
ALTER TABLE "follower" DROP CONSTRAINT "follower_id_seguidor_fkey";

-- DropForeignKey
ALTER TABLE "follower" DROP CONSTRAINT "follower_id_usuario_fkey";

-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_id_tweet_fkey";

-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_usernameUser_fkey";

-- DropForeignKey
ALTER TABLE "reply" DROP CONSTRAINT "reply_id_tweet_fkey";

-- DropForeignKey
ALTER TABLE "reply" DROP CONSTRAINT "reply_id_usuario_fkey";

-- DropForeignKey
ALTER TABLE "reply" DROP CONSTRAINT "reply_username_fkey";

-- DropForeignKey
ALTER TABLE "retweet" DROP CONSTRAINT "retweet_id_retweet_fkey";

-- DropForeignKey
ALTER TABLE "retweet" DROP CONSTRAINT "retweet_id_tweet_fkey";

-- DropForeignKey
ALTER TABLE "tweet" DROP CONSTRAINT "tweet_id_usuario_fkey";

-- DropTable
DROP TABLE "follower";

-- DropTable
DROP TABLE "like";

-- DropTable
DROP TABLE "reply";

-- DropTable
DROP TABLE "retweet";

-- DropTable
DROP TABLE "tweet";

-- DropTable
DROP TABLE "usuario";

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(80) NOT NULL,
    "username" VARCHAR(15) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tweets" (
    "id" UUID NOT NULL,
    "content" VARCHAR(200) NOT NULL,
    "tweet_type" "TweetType" NOT NULL,
    "id_usuario" UUID NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "tweets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "tweet_id" UUID NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "retweets" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "tweet_id" UUID NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "retweets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "followers" (
    "id" UUID NOT NULL,
    "id_usuario" UUID NOT NULL,
    "id_seguidor" UUID NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "followers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "replies" (
    "id" UUID NOT NULL,
    "id_usuario" UUID NOT NULL,
    "id_tweet" UUID NOT NULL,
    "message" VARCHAR(250) NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "replies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "likes_user_id_tweet_id_key" ON "likes"("user_id", "tweet_id");

-- CreateIndex
CREATE UNIQUE INDEX "retweets_user_id_tweet_id_key" ON "retweets"("user_id", "tweet_id");

-- CreateIndex
CREATE UNIQUE INDEX "followers_id_usuario_id_seguidor_key" ON "followers"("id_usuario", "id_seguidor");

-- AddForeignKey
ALTER TABLE "tweets" ADD CONSTRAINT "tweets_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "tweets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "retweets" ADD CONSTRAINT "retweets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "retweets" ADD CONSTRAINT "retweets_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "tweets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "followers" ADD CONSTRAINT "followers_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "followers" ADD CONSTRAINT "followers_id_seguidor_fkey" FOREIGN KEY ("id_seguidor") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "replies_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "replies_id_tweet_fkey" FOREIGN KEY ("id_tweet") REFERENCES "tweets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
