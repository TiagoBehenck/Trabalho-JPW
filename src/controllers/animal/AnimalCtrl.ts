import { BodyParams, Controller, Delete, Get, PathParams, Post, Put, Required, Status } from "@tsed/common";
import { NotFound } from "ts-httpexceptions";
import { Animal } from "../../interfaces/Animal";
import { AnimalService } from "../../services/animal/AnimalService";
// import {ExportToCsv } from 'export-to-csv';

@Controller("/animais")
export class AnimaisCtrl {

  constructor(private animaisService: AnimalService) { }

  @Post("/")
  async save(@BodyParams() animal: Animal): Promise<Animal> {

    const animais = await this.animaisService.create(animal);

    if (animais) {
      return animais;
    } else {
      throw new NotFound("Erro ao inserir um animal!");
    }
  }

  @Get("/")
  async getAllAnimais(): Promise<Animal[]> {

    const animais = await this.animaisService.query();

    if (animais) {
      return animais;
    } else {
      throw new NotFound("Nenhum animal encontrado!");
    }
  }

  @Get("/proprietario")
  async proprietario(): Promise<Animal[]> {
    const animais = await this.animaisService.query();
    if (animais) {
      return animais;
    } else {
      throw new NotFound("Nenhum animla encontrado!");
    }
  }

  @Get("/:id")
  async findById(@Required() @PathParams("id") id: string): Promise<Animal> {
    const animais = await this.animaisService.findById(id);

    if (animais) {
      return animais;
    } else {
      throw new NotFound("Nenhum animal encontrado!");
    }
  }

  @Put("/:id")
  async update(@PathParams("id") @Required() id: string,
    @BodyParams() @Required() animal: Animal): Promise<Animal> {
    const ani = await this.animaisService.update(id, animal);
    if (ani) {
      return ani;
    } else {
      throw new NotFound("Erro ao atualizar animal!");
    }
  }
  @Delete("/:id")
  @Status(204)
  async remove(@PathParams("id") @Required() id: string) {
    this.animaisService.remove(id);
  }
}
