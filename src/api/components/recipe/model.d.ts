import { Schema, Document } from 'mongoose';
export interface IRecipe extends Document {
    nombre: string;
    ingredientes: string[];
    tiempoPreparacion: number;
    dificultad: 'Fácil' | 'Media' | 'Difícil';
}
export declare const RecipeModel: import("mongoose").Model<IRecipe, {}, {}, {
    id: string;
}, Document<unknown, {}, IRecipe, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<IRecipe & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, Schema<IRecipe, import("mongoose").Model<IRecipe, any, any, any, any, any, IRecipe & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IRecipe, Document<unknown, {}, IRecipe, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<IRecipe & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    _id?: import("mongoose").SchemaDefinitionProperty<import("mongoose").Types.ObjectId, IRecipe, Document<unknown, {}, IRecipe, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<IRecipe & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    nombre?: import("mongoose").SchemaDefinitionProperty<string, IRecipe, Document<unknown, {}, IRecipe, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<IRecipe & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    ingredientes?: import("mongoose").SchemaDefinitionProperty<string[], IRecipe, Document<unknown, {}, IRecipe, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<IRecipe & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    tiempoPreparacion?: import("mongoose").SchemaDefinitionProperty<number, IRecipe, Document<unknown, {}, IRecipe, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<IRecipe & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    dificultad?: import("mongoose").SchemaDefinitionProperty<"Difícil" | "Fácil" | "Media", IRecipe, Document<unknown, {}, IRecipe, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<IRecipe & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
}, IRecipe>, IRecipe & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
//# sourceMappingURL=model.d.ts.map