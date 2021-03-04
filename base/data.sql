INSERT INTO Clients VALUES ('wA6tKNWZanRnBcSYe8peTFE2sjt1','Amadou','BA','32 Rue Ampere 38000 Grenoble','amadoub@gmail.com','ama.png', '0655241578' ,0);
INSERT INTO Clients VALUES ('JkwuoIipCyMAuFMz26ZcJcNPF3l2','Pierre','Dent','32 Rue Ampere 38000 Grenoble','pierreb@gmail.com','pierre.png' , '0655241578',0);
INSERT INTO Clients VALUES ('eWcqtoDqHbdEXzywuTDISgNvF0P2','Adam','BA','32 Rue Ampere 38000 Grenoble','oumar@gmail.com','amoaa.png' , '0655241578',0 );
INSERT INTO Clients VALUES ('bbaOMltKzON2pDNk7DcMWMJxM8D2','Yanice','BA','32 Rue Ampere 38000 Grenoble','ousksd@gmail.com','sdfama.png' , '0655241578',0 );
INSERT INTO Clients VALUES ('ra5DVM5R8eee7tLvhNRaQzctn802','Dane','BA','32 Rue Ampere 38000 Grenoble','deni@gmail.com','amsda.png' , '0655241578',0 );


INSERT INTO Articles VALUES ('F2','achat de Bienvenue chez Mamilia', 3.99 ,'plat');
INSERT INTO Articles VALUES ('P2','achat Hamburger Frites', 5.99 ,'plat');
INSERT INTO Articles VALUES ('P3','achat Spaghetti bologniase', 3.99 ,'plat');
INSERT INTO Articles VALUES ('P5','achat Salade césar', 3.99 ,'plat');
INSERT INTO Articles VALUES ('F1','achat Le Stagiaire', 2.99 ,'film');
INSERT INTO Articles VALUES ('P1','Pizza 4 fromages', 5.99 ,'plat');
INSERT INTO Articles VALUES ('P4','Pates Carbonara', 3.99 ,'plat');
INSERT INTO Articles VALUES ('F3','Les misérables', 3.99 ,'film');
INSERT INTO Articles VALUES ('F4','Le diner des cons', 2.99 ,'film');
INSERT INTO Articles VALUES ('F5','Jeux denfants', 2.99 ,'film');


INSERT INTO Commandes VALUES ('1' , 'JkwuoIipCyMAuFMz26ZcJcNPF3l2' ,'28-04-2020 11:20:00' , 6.98  , '32 Rue Ampere 38000 Grenoble' );
INSERT INTO Commandes VALUES ('2' , 'JkwuoIipCyMAuFMz26ZcJcNPF3l2' ,'28-04-2020 11:20:00' , 8.98 , '32 Rue Ampere 38000 Grenoble' );
INSERT INTO Commandes VALUES ('3' , 'wA6tKNWZanRnBcSYe8peTFE2sjt1' , '28-04-2020 11:20:00'  , 7.98 , '32 Rue Ampere 38000 Grenoble');
insert into Commandes values ('4', 'JkwuoIipCyMAuFMz26ZcJcNPF3l2', '03-05-2020 11:20:00', 20.96, '32 Rue Ampere 38000 Grenoble');


INSERT INTO Commander VALUES ('1' , 'P4' , 3.99 , 2 ,'plat');
INSERT INTO Commander VALUES ('1', 'F4' , 2.99 , 2 ,'film');
INSERT INTO Commander VALUES ('2' , 'P2', 5.99 , 2 ,'plat');
INSERT INTO Commander VALUES ('2' , 'F1', 2.99 , 1 ,'film');
INSERT INTO Commander VALUES ('3', 'F3',  3.99 , 1 ,'film');
INSERT INTO Commander VALUES ('3', 'P3',  3.99 , 1 ,'plat');
insert into Commander  values ('4', 'P2', 5.99 , 3, 'plat');
insert into Commander  values ('4', 'F1', 2.99, 1 , 'film');


