export interface Cliente {
    id?: number;
    nombre: string;
    domicilio?: string;
    ciudad?: string;
    cp?: string;
    fecha_nac?: Date | string;
    fecha_reg?: Date | string;
    tel: string;
    instagram?: string;
    facebook?: string;
    genero?: string;
    estatus?: boolean;
    created_at?: Date;
    updated_at?: Date;
}

export interface PaginatedResponse<T> {
    clientes?: T[];
    visitas?: T[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalRecords: number;
        limit: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}