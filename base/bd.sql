drop table Commander ;
drop table Commandes ;
drop table Articles ;
drop table Clients ;
create table Clients(
	numClient varchar2(30) not null,
	nom varchar2(20),
	prenom varchar2(20),
	adresse varchar2(50),
	email varchar2(50),
	photo varchar2(20),
	tel varchar2(50),
	pointfidelite number(3),
	constraint cli_0 primary key (numClient),
	constraint cli_1 check (tel>0)
);




create table Articles (
	codeArticle varchar2(5) not null,
	libelleArticle varchar2(255), 
	prixArticle number(3,2) not null,
	categorie varchar2(5),
	constraint articles_0 primary key (codeArticle),
	constraint articles_1 check (prixArticle>0)
);



create table Commandes(
	numCommande varchar2(5) not null,
	numClient varchar(30) not null,
	dateCde date,
	prixCde number(5,2),
	adresseCde varchar2(50),
	constraint commandes_0 primary key (numCommande),
	constraint commandes_1 foreign key (numClient) references Clients(numClient),
	constraint commandes_2 check(prixCde>0)
);


create table Commander(
	numCommande varchar(5) not null,
	codeArticle varchar2(5) not null,
	prixArticle number(3,2),
	quantite number(3) ,
	categorie varchar2(5),
	constraint commander_0 primary key (numCommande,codeArticle),
	constraint commander_1 foreign key (codeArticle) references Articles(codeArticle),
	constraint commander_2 check(prixArticle>0)
);

