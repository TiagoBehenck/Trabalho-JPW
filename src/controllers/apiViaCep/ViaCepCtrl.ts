import {Controller, Get, MergeParams, PathParams, Required} from "@tsed/common";
import {ViaCepService} from "../../services/apiViaCep/ViaCepService";
import {ViaCepApi} from "../../interfaces/ViaCepApi";


@Controller("/viacep")
@MergeParams(true)
export class ViaCepCtrl {


    constructor(private viaCepService: ViaCepService) {
    }

    @Get("/:cep")
    async getCep(@Required @PathParams("cep") cep: string): Promise<ViaCepApi> {
        return this.viaCepService.findCep(cep);
    }
}