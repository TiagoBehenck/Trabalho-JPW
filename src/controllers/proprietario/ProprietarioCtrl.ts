import {
  BodyParams,
  Controller,
  Delete,
  Get,
  MergeParams,
  PathParams,
  Post,
  Put,
  Required,
  Status
} from "@tsed/common";
import { NotFound } from "ts-httpexceptions";
import { Proprietario } from "../../interfaces/Proprietario";
import { ProprietarioService } from "../../services/proprietario/ProprietarioService";

@Controller("/proprietario")
export class ProprietarioCtrl {

  constructor(private proprietarioService: ProprietarioService) { }

  @Post("/")
  async save(@BodyParams() proprietario: Proprietario): Promise<Proprietario> {
    const propri = await this.proprietarioService.create(proprietario);

    if (propri) {
      return propri;
    } else {
      throw new NotFound("Erro ao inserir um proprietário!");
    }
  }

  @Get("/")
  async getAllProprietario(): Promise<Proprietario[]> {
    const propri = await this.proprietarioService.query();

    if (propri) {
      return propri;
    } else {
      throw new NotFound("Proprietário não encontrado!");
    }
  }
}