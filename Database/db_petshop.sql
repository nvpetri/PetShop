create schema db_petshopp;

use db_petshopp;

create table tbl_sexo(
	id int not null auto_increment primary key,
    nome varchar(10),
    
    unique index(id),
    unique key(id)
);

create table tbl_cargos(
	id int not null auto_increment primary key,
    nome varchar(50),
    
    unique index(id),
    unique key(id)
);

create table tbl_funcionarios(
	id int not null auto_increment primary key,
    nome varchar(40) not null,
    email varchar(255) not null,
    senha varchar(80) not null,
    telefone varchar(14),
    foto_perfil text,
    data_nascimento date,
    id_sexo int not null,
    id_cargo int not null,
    
    foreign key(id_cargo)references tbl_cargo(id),
    
    foreign key(id_sexo) references tbl_sexo(id),
    
	unique index(id),
    unique key (id)
);

create table tbl_usuario(
	id int not null auto_increment primary key,
    nome varchar(40) not null,
    email varchar(255) not null,
    senha varchar(80) not null,
    telefone varchar(14),
    data_nascimento date,
    foto_perfil text,
    id_sexo int not null,
    
    foreign key(id_sexo) references tbl_sexo(id),
    
	unique index(id),
    unique key (id)
);

create table tbl_taxonomia(
	id int not null primary key auto_increment,
    especie varchar(100) not null,
    raca varchar(100) not null,
    
    unique index(id),
    unique key(id)
);

create table tbl_pet(
	id int not null auto_increment primary key,
    nome varchar(40),
    foto text,
    data_nascimento date,
    id_dono int not null,
    id_sexo int not null,
    id_raca int not null,
    
    foreign key(id_raca) references tbl_taxonomia(id),
    
    foreign key(id_sexo) references tbl_sexo(id),
    
    foreign key (id_dono) references tbl_usuario(id),
    unique index(id),
    unique key(id)
);

create table tbl_servicos(
	id int not null auto_increment primary key,
    nome varchar(40) not null,
    descricao varchar(255),
    data_realizacao date,
    hora time,
    id_funcionario int not null,
    id_pet int not null,
    
    foreign key(id_funcionario) references tbl_funcionarios(id),
    
    foreign key(id_pet) references tbl_pet (id),
    
    unique index(id),
    unique key(id)
);

create table tbl_categorias_produtos(
	id int not null auto_increment primary key,
    nome varchar(50) not null,
    descricao varchar(255),
    
    unique index(id),
    unique key(id)
);

create table tbl_produtos(
	id int not null primary key auto_increment,
    nome varchar(40),
    descricao varchar(255),
    foto text,
    quantidade int not null default 0,
    valor_unitario double not null,
    id_categoria int not null,
    
    foreign key (id_categoria) references tbl_categorias_produtos(id)
);

create table tbl_carrinho(
	id int not null auto_increment primary key,
    quantidade_produtos int not null default 0,
    valor_total double not null default 0.0,
    id_produtos int,
    id_cliente int not null,
    
    foreign key(id_cliente) references tbl_usuarios(id)
);

CREATE TABLE tbl_compras (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    data_compra DATETIME NOT NULL,
    valor_total DOUBLE NOT NULL,
    status_compra VARCHAR(50) NOT NULL,
    endereco_entrega VARCHAR(255),
    metodo_pagamento VARCHAR(50),
    
    FOREIGN KEY (id_cliente) REFERENCES tbl_usuarios(id)
);
