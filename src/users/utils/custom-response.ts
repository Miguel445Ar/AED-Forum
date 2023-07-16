export class CustomResponse<T extends object> {
    private _errors: string[];
    private _resource: T;
    constructor() {
        this._errors = [];
        this._resource = null;
    }
    public addError(error: string): void {
        this._errors.push(error);
    }
    public hasErrors() {
        return this._errors.length > 0;
    }
    public get resource(): T {
        return this._resource;
    }
    public set resource(resource: T) {
        this._resource = resource;
    }
    public get errors(): string[] {
        return this._errors;
    }
    public toDto(): object {
        if(this.hasErrors()) {
            return {
                errors: this._errors
            };
        }
        return { data: this._resource};
    }
}