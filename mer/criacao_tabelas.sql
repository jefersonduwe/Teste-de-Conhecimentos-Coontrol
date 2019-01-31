CREATE TABLE usuario (
                usu_login VARCHAR(50) NOT NULL,
                usu_senha VARCHAR(32) NOT NULL,
                CONSTRAINT usuario_pk PRIMARY KEY (usu_login)
);


CREATE SEQUENCE pessoa_pes_id_seq;

CREATE TABLE pessoa (
                pes_id INTEGER NOT NULL DEFAULT nextval('pessoa_pes_id_seq'),
                pes_nome VARCHAR(50) NOT NULL,
                pes_data_nasc DATE NOT NULL,
                pes_sexo VARCHAR(1) NOT NULL,
                pes_idade SMALLINT NOT NULL,
                pes_signo VARCHAR(11) NOT NULL,
                pes_data_consulta TIMESTAMP NOT NULL,
                CONSTRAINT pessoa_pk PRIMARY KEY (pes_id)
);


ALTER SEQUENCE pessoa_pes_id_seq OWNED BY pessoa.pes_id;