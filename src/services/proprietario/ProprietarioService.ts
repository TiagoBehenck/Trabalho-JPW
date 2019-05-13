import { Proprietario } from "./../../interfaces/Proprietario";
import { Service } from "@tsed/common";
import { resolve, reject } from "bluebird";

const datastore = require("nedb");
const db = new datastore({ filename: "proprietario.json" });
db.loadDatabase((err) => console.log(err || "DB proprietário carregado com sucesso."));


@Service()
export class ProprietarioService {


  constructor() { }

  async findById(id: string): Promise<Proprietario> {
    return new Promise((resolve, reject) => {
      db.findOne({ _id: id }, (err, proprietario) => {
        if (err) {
          reject(err);
        } else {
          resolve(proprietario);
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
          resolve(proprietario as Proprietario[]);
        }
      });
    });
  }
  async create(proprietario: Proprietario): Promise<Proprietario> {
    return new Promise((resolve, reject) => {
      db.insert(proprietario, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(proprietario);
        }
      });
    });
  }

  async update(id: string, proprietario: Proprietario): Promise<Proprietario> {
    return new Promise((resolve, reject) => {
      db.update({ _id: id }, proprietario, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(proprietario);
        }
      });
    });
  }

  async remove(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      db.remove({ _id: id }, {}, err => {
        if (err)
          reject(err);
      });
    });
  }
}