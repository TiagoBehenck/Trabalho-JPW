import { Proprietario } from "./../../interfaces/Proprietario";
import { Service } from "@tsed/common";
import { resolve } from "bluebird";

const datastore = require("nedb");
const db = new datastore({ filename: "proprietario.json" });
db.loadDatabase((err) => console.log(err || "DB carregado com sucesso."));


@Service()
export class ProprietarioService {


  constructor() { }

  async create(proprietario: Proprietario): Promise<Proprietario> {
    return new Promise((resolve, reject) => {
      db.find({}, (err, proprietarios) => {
        if (err) {
          reject(err);
        } else {
          resolve(proprietarios);
        }
      });
    });
  }

  async query(): Promise<Proprietario[]> {
    return new Promise((resolve, reject) => {
      db.find({}, (err, proprietario) => {
        if (err) {
          reject(err);
        } else {
          resolve(proprietario);
        }
      });
    });
  }
}