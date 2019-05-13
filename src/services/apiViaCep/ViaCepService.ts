import {Service} from "@tsed/di";
import {ViaCepApi} from "../../interfaces/ViaCepApi";

const axios = require("axios");


@Service()
export class ViaCepService {
    constructor() {
    }

    async findCep(cepReq: string): Promise<ViaCepApi> {
        return new Promise((resolve, reject) => {
            axios
                .get("https://viacep.com.br/ws/" + cepReq + "/json/")
                .then((response: { data: any }) => {
                    resolve(response.data);
                });
        });

    }
}