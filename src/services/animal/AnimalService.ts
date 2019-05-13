import { Service } from "@tsed/common";
import { Animal } from "../../interfaces/Animal";

const datastore = require("nedb");
const db = new datastore({ filename: "animais.json" });
db.loadDatabase((err) => console.log(err || "DB animais carregado com sucesso."));

@Service()
export class AnimalService {

  constructor() { }

  async findById(id: string): Promise<Animal> {
    return new Promise((resolve, reject) => {
      db.findOne({ _id: id }, (err, animal) => {
        if (err) {
          reject(err);
        } else {
          resolve(animal);
        }
      });
    });
  }

  async query(): Promise<Animal[]> {
    return new Promise((resolve, reject) => {
      db.find({}, (err, ani) => {
        if (err) {
          reject(err);
        } else {
          resolve(ani as Animal[]);
        }
      });
    });
  }

  async create(animal: Animal): Promise<Animal> {
    return new Promise((resolve, reject) => {
      db.insert(animal, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(animal);
        }
      });
    });
  }

  async update(id: string, animal: Animal): Promise<Animal> {

    return new Promise((resolve, reject) => {
      db.update({ _id: id }, animal, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(animal);
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