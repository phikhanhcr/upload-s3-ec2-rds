import { DataSource } from "typeorm";

const ds = new DataSource({
  type: "postgres",
  url: "testdb.cj4wzk5fmoo3.ap-southeast-1.rds.amazonaws.com",
  port: 5432,
  //
  synchronize: true,
  // entities: ["/../**/entity/*.js"],
  // migrations: ["/../../migrations/*.ts"],
  migrationsRun: false,
  logger: "simple-console",
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  extra: {
    ssl: true,
  },
});

export class DatabaseAdapter {
  private static _connection: DataSource;

  static async getClient(): Promise<DataSource> {
    if (!DatabaseAdapter._connection) {
      await DatabaseAdapter.connect();
    }
    return DatabaseAdapter._connection;
  }

  static async connect(): Promise<void> {
    try {
      DatabaseAdapter._connection = await ds.initialize();
      console.log("Connect to postgresql successfully!");
    } catch (error) {
      console.log("Connect to postgresql failed!", error);
      // Exit process with failure
      process.exit(1);
    }
  }
  static async disconnect(): Promise<void> {
    try {
      await DatabaseAdapter._connection.destroy();
      console.log("Disconnect from postgresql successfully!");
    } catch (error) {
      console.log("Disconnect from postgresql failed!", error);
    }
  }
}
