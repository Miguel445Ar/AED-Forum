import { ConfirmationToken } from "../models/confirmation-token.model";
import { BaseRepository } from "./base-repository.repository";

export class ConfirmationTokenRepository extends BaseRepository<ConfirmationToken> {
    constructor() {
        super("aed.confirmation_tokens");
    }
}