create schema db_petshopp;

use db_petshopp;

create table tbl_sexo(
	id int not null auto_increment primary key,
    nome varchar(10),
    
    unique index(id),
    unique key(id)
);

insert into tbl_sexo (nome) values (
"Masculino"), ("Feminino");

create table tbl_cargos(
	id int not null auto_increment primary key,
    nome varchar(50),
    
    unique index(id),
    unique key(id)
);

insert into tbl_cargos (nome) values (
"Veterinário"), ("Tosador"), ("Banhista");

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
    
    foreign key(id_cargo)references tbl_cargos(id),
    
    foreign key(id_sexo) references tbl_sexo(id),
    
	unique index(id),
    unique key (id)
);

insert into tbl_funcionarios (nome, email, senha, telefone, foto_perfil, data_nascimento, id_sexo, id_cargo) 
values (
  "Fernando Leonid",  
  "fernandoleonid@gmail.com", 
  "12345", 
  "1133334444", 
  "https://itpetblog.com.br/wp-content/uploads/2023/06/banho_no_inverno.jpg", 
  "1982-08-09", 
  1,
  2
  ),(
  "Vitor de Jesus",  
  "vitordejesus@gmail.com", 
  "12345", 
  "1122223333", 
  "https://itpetblog.com.br/wp-content/uploads/2023/06/banho_no_inverno.jpg", 
  "1990-03-29", 
  1,
  1
  );

create table tbl_usuario(
	id int not null auto_increment primary key,
    nome varchar(40) not null,
    email varchar(255) not null,
    senha varchar(80) not null,
    telefone varchar(14),
    data_nascimento date,
    foto_perfil text,
    id_sexo int,
    
    foreign key(id_sexo) references tbl_sexo(id),
    
	unique index(id),
    unique key (id)
);

insert into tbl_usuario (nome, email, senha, telefone, foto_perfil, data_nascimento, id_sexo) 
values (
  "Celso Furtado",  
  "celso@celso.dev", 
  "12345", 
  "1133334444", 
  "https://itpetblog.com.br/wp-content/uploads/2023/06/banho_no_inverno.jpg", 
  "1982-08-09", 
  1
  );
  
  select * from tbl_usuario where email = 'celso@celso.dev';
  
create table tbl_taxonomia(
	id int not null primary key auto_increment,
    especie varchar(100) not null,
    raca varchar(100) not null,
    
    unique index(id),
    unique key(id)
);

insert into tbl_taxonomia (especie, raca) values(
	"Cão",
    "Golden Retriever"
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

insert into tbl_pet (nome, foto, data_nascimento, id_dono, id_sexo, id_raca) values(
	"Myke",
    "https://static.wixstatic.com/media/db516d_a7f7619f878f4c29948251d50d7f8de9~mv2.jpg/v1/fill/w_569,h_512,al_c,lg_1,q_80,usm_1.20_1.00_0.01,enc_auto/db516d_a7f7619f878f4c29948251d50d7f8de9~mv2.jpg",
    "2019-11-21",
    1,
    1,
    1
);

create table tbl_servicos(
	id int not null auto_increment primary key,
    nome varchar(40) not null,
    descricao varchar(255),
    
    unique index(id),
    unique key(id)
);

create table tbl_servico_criado(
    id int not null,
    data_realizacao date,
    hora time,
    estado boolean,
    id_servico int not null,
    id_funcionario int not null,
    id_pet int not null,
    
    foreign key(id_servico) references tbl_servicos(id),

    foreign key(id_funcionario) references tbl_funcionarios(id),
    
    foreign key(id_pet) references tbl_pet (id),
    
    unique index(id),
    unique key(id)
)

insert into tbl_servicos (nome, descricao, data_realizacao, hora, id_funcionario, id_pet) values (
"Banho e tosa", "Banho e tosa do Myke", "2024-02-03", "17:00:00", "1", "1"), (
"Consulta", "Consulta do Myke", "2024-04-06", "15:40:00", "2", "1");

create table tbl_categorias_produtos(
	id int not null auto_increment primary key,
    nome varchar(50) not null,
    descricao varchar(255),
    
    unique index(id),
    unique key(id)
);

insert into tbl_categorias_produtos (nome, descricao) values (
"Animais", "Produtos de todos os tipos de pets."),
("Ração", "Escolha a melhor ração para o tipo do seu pet."),
("Brinquedos", "Escolha o brinquedo ideal para o seu querido pet."),
("Acessórios", "Lugar do pet estiloso.");

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

insert into tbl_produtos (nome, descricao, foto, quantidade, valor_unitario, id_categoria) values (
	"Ração GoldeN, para filhotes",
	"Ração para filhotes sabor carne",
	"https://media.breeds.com.br/media/catalog/product/cache/58b66ab76459b8fd9436b709660314ca/I/M/IMG_35558_1675_2.webp",
	"2",
	"89.90",
	"2"), (
	"Roupa para GoldeN, tamanho adulto",
	"Roupa vermelha xadrez tamanho adulto.",
	"https://m.media-amazon.com/images/I/61irzi92v0L._AC_UF1000,1000_QL80_.jpg",
	"2",
	"49.99",
	"4");

create table tbl_carrinho(
	id int not null auto_increment primary key,
    quantidade_produtos int not null default 0,
    valor_total double not null default 0.0,
    id_produtos int,
    id_cliente int not null,
    
    foreign key(id_cliente) references tbl_usuario(id)
);

insert into tbl_carrinho (quantidade_produtos, valor_total, id_produtos, id_cliente) values (
	"1", "49.99", "2", "1");

CREATE TABLE tbl_compras (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    data_compra DATETIME NOT NULL,
    valor_total DOUBLE NOT NULL,
    status_compra VARCHAR(50) NOT NULL,
    endereco_entrega VARCHAR(255),
    metodo_pagamento VARCHAR(50),
    
    FOREIGN KEY (id_cliente) REFERENCES tbl_usuario(id)
);

insert into tbl_compras (id_cliente, data_compra, valor_total, status_compra, endereco_entrega, metodo_pagamento) values (
"1", "2024-05-23", "49.99", "Pago", "Rua SENAI Jandira, 127, Jardim SESI-SENAI", "Cartão de crédito");