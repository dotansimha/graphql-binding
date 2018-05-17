import { GraphQLSchema } from 'graphql';
import { Interpolation } from './types';
export declare class Generator {
    schema: GraphQLSchema;
    inputSchemaPath: string;
    outputBindingPath: string;
    isDefaultExport: boolean;
    constructor({schema, inputSchemaPath, outputBindingPath, isDefaultExport}: {
        schema: GraphQLSchema;
        inputSchemaPath: string;
        outputBindingPath: string;
        isDefaultExport: boolean;
    });
    render(): string;
    compile(strings: TemplateStringsArray, ...interpolations: Interpolation<Generator>[]): string;
    getRelativeSchemaPath(): string;
    renderImports(): string;
    renderExports(): string;
}
