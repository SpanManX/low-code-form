export default {
    tableData: [],
    tableKeys: [],

    SET_TABLE_DATA(data) {
        this.tableData = data;
    },

    SET_TABLE_DATA_KEYS(keys) {
        this.tableKeys = keys
    },

    SET_TABLE_DATA_ITEM(rowIndex, columIndex, item) {
        this.tableData[rowIndex][this.tableKeys[columIndex]] = item
    },
}