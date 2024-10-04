-- CreateTable
CREATE TABLE generos (
    id SERIAL,
    nome TEXT,

    CONSTRAINT "generos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE filmes (
    id SERIAL NOT NULL,
    titulo TEXT ,
    ano INTEGER ,
    data_mod TIMESTAMP(3) ,
    genero_id INTEGER ,
    diretor TEXT,

    CONSTRAINT "filmes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "generos_nome_key" ON "generos"("nome");

-- CreateIndex
CREATE INDEX "filmes_genero_id_idx" ON "filmes"("genero_id");

-- AddForeignKey
ALTER TABLE "filmes" ADD CONSTRAINT "filmes_genero_id_fkey" FOREIGN KEY ("genero_id") REFERENCES "generos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
