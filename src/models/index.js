import { ORM } from "redux-orm";
import Invoice from "./invoice";

const orm = new ORM();
orm.register(Invoice);

export default orm;
