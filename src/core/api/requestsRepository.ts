import {RequestsRepository} from "./generated/RequestsRepository.g";

class ExtendedRequestRepository extends RequestsRepository {

    constructor() {
        super("");
    }
}

export const requestsRepository = new ExtendedRequestRepository();