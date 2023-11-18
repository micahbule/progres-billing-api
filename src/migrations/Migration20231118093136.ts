import { Migration } from '@mikro-orm/migrations';

export class Migration20231118093136 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "contracts" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "name" varchar(255) not null, constraint "contracts_pkey" primary key ("uuid"));');

    this.addSql('create table "categories" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "name" varchar(255) not null, "total_price" int not null default 0, "evaluated_percentage" int not null default 0, "accomplished_amount" int not null default 0, "is_parent" boolean not null default false, "parent_category_uuid" uuid null, "contract_uuid" uuid not null, constraint "categories_pkey" primary key ("uuid"));');
    this.addSql('alter table "categories" add constraint "categories_parent_category_uuid_unique" unique ("parent_category_uuid");');

    this.addSql('create table "billables" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "scope" varchar(255) not null, "quantity" int not null default 0, "unit" varchar(255) not null, "unit_rate" int not null default 0, "subtotal" int not null default 0, "progress" int not null default 0, "accomplished_amount" int not null default 0, "category_uuid" uuid not null, constraint "billables_pkey" primary key ("uuid"));');

    this.addSql('alter table "categories" add constraint "categories_parent_category_uuid_foreign" foreign key ("parent_category_uuid") references "categories" ("uuid") on update cascade on delete set null;');
    this.addSql('alter table "categories" add constraint "categories_contract_uuid_foreign" foreign key ("contract_uuid") references "contracts" ("uuid") on update cascade;');

    this.addSql('alter table "billables" add constraint "billables_category_uuid_foreign" foreign key ("category_uuid") references "categories" ("uuid") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "categories" drop constraint "categories_contract_uuid_foreign";');

    this.addSql('alter table "categories" drop constraint "categories_parent_category_uuid_foreign";');

    this.addSql('alter table "billables" drop constraint "billables_category_uuid_foreign";');

    this.addSql('drop table if exists "contracts" cascade;');

    this.addSql('drop table if exists "categories" cascade;');

    this.addSql('drop table if exists "billables" cascade;');
  }

}
