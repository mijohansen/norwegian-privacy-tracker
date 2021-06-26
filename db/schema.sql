create table crawls
(
	week int(6) not null,
	url varchar(255) not null,
	headers text not null,
	deps text not null,
	redirects text null,
	domain varchar(255) null,
	created timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
	primary key (week, url)
);

