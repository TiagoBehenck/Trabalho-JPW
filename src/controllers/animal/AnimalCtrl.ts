import { BodyParams, Controller, Delete, Get, PathParams, Post, Put, Required, Status, Header, ContentType } from "@tsed/common";
import { NotFound } from "ts-httpexceptions";
import { Animal } from "../../interfaces/Animal";
import { AnimalService } from "../../services/animal/AnimalService";
import { writeFileSync, readFileSync } from "fs";
import _default from "ts-log-debug";
import { json2csv } from "json-2-csv-ts"

@Controller("/animais")
export class AnimaisCtrl {

  constructor(private animalService: AnimalService) { }

  @Post("/")
  async save(@BodyParams() animal: Animal): Promise<Animal> {

    const animais = await this.animalService.create(animal);

    if (animais) {
      return animais;
    } else {
      throw new NotFound("Erro ao inserir um animal!");
    }
  }

  @Get("/")
  async getAllAnimais(): Promise<Animal[]> {

    const animais = await this.animalService.query();

    if (animais) {
      return animais;
    } else {
      throw new NotFound("Nenhum animal encontrado!");
    }
  }

  // @Get("/:nome")
  // async findByName(@Required() @PathParams("nome") nome: string): Promise<Animal> {
  //   const animal = await this.animalService.findByName(nome);

  //   if (animal) {
  //     return animal;
  //   } else {
  //     throw new NotFound("Nenhum animal encontrado!");
  //   }
  // }

  @Get("/:id")
  async find(@Required() @PathParams("id") id: string): Promise<Animal> {
    const animais = await this.animalService.findById(id);

    if (animais) {
      return animais;
    } else {
      throw new NotFound("Nenhum animal encontrado!");
    }
  }

  @Put("/:id")
  async update(@PathParams("id") @Required() id: string,
    @BodyParams() @Required() animal: Animal): Promise<Animal> {
    const ani = await this.animalService.update(id, animal);
    if (ani) {
      return ani;
    } else {
      throw new NotFound("Erro ao atualizar animal!");
    }
  }

  // @Delete("/:nome")
  // async removeByName(@PathParams("nome") @Required() nome: string) {
  //   this.animalService.removeByName(nome);
  // }

  @Delete("/:id")
  @Status(204)
  async remove(@PathParams("id") @Required() id: string) {
    this.animalService.remove(id);
  }

  @Get("/report/relatorio")
  @Header("content-disposition", "attachment;fileName=animalReport.csv")
  @ContentType('application/json')
  async chart() {
    let animais = await this.animalService.query();
    writeFileSync(__dirname + '/report.csv', json2csv(animais));
    return readFileSync(__dirname + '/report.csv', 'utf8');
  }
}
