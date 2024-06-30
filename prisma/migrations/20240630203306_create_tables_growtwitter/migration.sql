-- CreateTable
CREATE TABLE "usuario" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(80) NOT NULL,
    "username" VARCHAR(15) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "auth_token" TEXT,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tweet" (
    "id" UUID NOT NULL,
    "content" VARCHAR(200) NOT NULL,
    "type" INTEGER NOT NULL,
    "id_usuario" UUID NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "tweet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "like" (
    "id" UUID NOT NULL,
    "usernameUser" VARCHAR(15) NOT NULL,
    "id_tweet" UUID NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "retweet" (
    "id_tweet" UUID NOT NULL,
    "id_retweet" UUID NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL
);

-- CreateTable
CREATE TABLE "follower" (
    "id" UUID NOT NULL,
    "id_usuario" UUID NOT NULL,
    "id_seguidor" UUID NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "follower_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reply" (
    "id" UUID NOT NULL,
    "id_usuario" UUID NOT NULL,
    "username" VARCHAR(15) NOT NULL,
    "message" VARCHAR(250) NOT NULL,
    "id_tweet" UUID NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "reply_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_username_key" ON "usuario"("username");

-- CreateIndex
CREATE UNIQUE INDEX "like_usernameUser_key" ON "like"("usernameUser");

-- CreateIndex
CREATE UNIQUE INDEX "like_id_tweet_key" ON "like"("id_tweet");

-- CreateIndex
CREATE UNIQUE INDEX "retweet_id_tweet_key" ON "retweet"("id_tweet");

-- CreateIndex
CREATE UNIQUE INDEX "retweet_id_retweet_key" ON "retweet"("id_retweet");

-- CreateIndex
CREATE UNIQUE INDEX "follower_id_usuario_id_seguidor_key" ON "follower"("id_usuario", "id_seguidor");

-- AddForeignKey
ALTER TABLE "tweet" ADD CONSTRAINT "tweet_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_usernameUser_fkey" FOREIGN KEY ("usernameUser") REFERENCES "usuario"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_id_tweet_fkey" FOREIGN KEY ("id_tweet") REFERENCES "tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "retweet" ADD CONSTRAINT "retweet_id_tweet_fkey" FOREIGN KEY ("id_tweet") REFERENCES "tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "retweet" ADD CONSTRAINT "retweet_id_retweet_fkey" FOREIGN KEY ("id_retweet") REFERENCES "tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follower" ADD CONSTRAINT "follower_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follower" ADD CONSTRAINT "follower_id_seguidor_fkey" FOREIGN KEY ("id_seguidor") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reply" ADD CONSTRAINT "reply_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reply" ADD CONSTRAINT "reply_username_fkey" FOREIGN KEY ("username") REFERENCES "usuario"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reply" ADD CONSTRAINT "reply_id_tweet_fkey" FOREIGN KEY ("id_tweet") REFERENCES "tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
