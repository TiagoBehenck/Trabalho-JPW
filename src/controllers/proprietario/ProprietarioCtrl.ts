import { BodyParams, Controller, Delete, Get, MergeParams, PathParams, Post, Put, Required, Status, Header, ContentType } from "@tsed/common";
import { NotFound } from "ts-httpexceptions";
import { Proprietario } from "../../interfaces/Proprietario";
import { ProprietarioService } from "../../services/proprietario/ProprietarioService";
import { json2csv } from "json-2-csv-ts"
import { writeFileSync, readFileSync } from "fs";

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
  
  @Get("/:id")
  async findById(@Required() @PathParams("id") id: string): Promise<Proprietario> {
    const proprietarios = await this.proprietarioService.findById(id);

    if (proprietarios) {
      return proprietarios;
    } else {
      throw new NotFound("Nenhum proprietário encontrado!");
    }
  }

  // @Get("/:nome")
  // async findByName(@Required() @PathParams("nome") nome: string): Promise<Proprietario> {
  //   const proprietarios = await this.proprietarioService.findByName(nome);

  //   if (proprietarios) {
  //     return proprietarios;
  //   } else {
  //     throw new NotFound("Nenhum proprietário encontrado!");
  //   }
  // }

  @Put("/:id")
  async update(@PathParams("id") @Required() id: string, @BodyParams() @Required() proprietario: Proprietario): Promise<Proprietario> {
    const proprietarios = await this.proprietarioService.update(id, proprietario);
    if (proprietarios) {
      return proprietarios;
    } else {
      throw new NotFound("Erro ao atualizar proprietário");
    }
  }

  @Delete("/:id")
  @Status(204)
  async remove(@PathParams("id") @Required() id: string) {
    this.proprietarioService.remove(id);
  }

  @Get("/report/relatorio")
  @Header("content-disposition", "attachment;fileName=proprietarioReport.csv")
  @ContentType('application/json')
  async chart() {
    let proprietario = await this.proprietarioService.query();
    writeFileSync(__dirname + '/report.csv', json2csv(proprietario));
    return readFileSync(__dirname + '/report.csv', 'utf8');
  }
}