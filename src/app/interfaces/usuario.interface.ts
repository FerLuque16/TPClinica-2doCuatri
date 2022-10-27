export interface Usuario{
    nombre:string,
    apellido:string,
    edad:number,
    dni:number,
    obraSocial?:string,
    especialidad?:string,
    imagen1:string,
    imagen2?:string,
    email:string,
    password:string,
    habilitado?:boolean,
    rol:string,
    uid:string,
    captcha?:string
}