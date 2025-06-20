import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('statistics', table => {
        table.string('boxDeliveryAndStorageExpr').nullable();
        table.string('boxDeliveryBase').nullable();
        table.string('boxDeliveryLiter').nullable();
        table.string('boxStorageBase').nullable();
        table.string('boxStorageLiter').nullable();
        table.string('warehouseName').index();
        table.date('date');
        table.primary(['warehouseName', 'date']);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('statistics');
}
