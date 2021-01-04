
export type Roles = 'SUSCRIPTOR' |   'EDITOR'    | 'ADMIN';
export interface User {
    uid: string;
    email: string;
    password?: string;
    emailVerified: boolean;
    role?: Roles;
    photoURL?: string;
    tagName?: string;
    rnkPoints?: number;
    position?: any;
}
export class smashDataList {
    uid: string;
    position: number;
    tagName: string ;
    main: string;
    points: string;
}
// Columns 1
export const SmashPlayerColumns: string[] = [
    'pos',
    'tagName',
    'main',
    'rnkPoints'
];

export interface likesCount {
    value: number;
    uidUsuarios: object;
}