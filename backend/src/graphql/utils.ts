// Sets the search path to onyx
// This is to avoid having to write onyx.table_name or setting
// the search path in each function
export const establishConnection = async (db: any) => {
    const client = await db.connect()
    await client.query(`SET search_path TO onyx;`)
    return client;
}

