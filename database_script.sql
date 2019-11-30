-- auto-generated definition
drop table if exists post;
create table post
(
    post_id int auto_increment
        primary key,
    spotify_uri text not null,
    user_id     int  not null,
    content     text not null,
    img_src text not null,
    title text not null,
    subtitle text not null,
    ts timestamp default current_timestamp,
    constraint post_user_user_id_fk
        foreign key (user_id) references user (user_id)
);

-- auto-generated definition
drop table if exists reply;
create table reply
(
    parent_id int  not null,
    content   text null,
    user_id   int  null,
    reply_id  int auto_increment
        primary key,
    constraint reply_post_post_id_fk
        foreign key (parent_id) references post (post_id)
            on delete cascade,
    constraint reply_user_user_id_fk
        foreign key (user_id) references user (user_id)
);

-- auto-generated definition
drop table if exists user;
create table user
(
    username text null,
    password text not null,
    user_id  int auto_increment
        primary key
);

select * from post;