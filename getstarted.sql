delete from users;
insert into users ('username', 'pswd','services') values('peter','1234','15');
insert into users ('username', 'pswd','services') values('ivan','1234','10');
insert into users ('username', 'pswd','services') values('mike','1234','10,15');

delete from services;
insert into services (ID, NAME) VALUES(10, "Store Encrypted Data");
insert into services (ID, NAME) VALUES(15, "Ethereum Wallet");


