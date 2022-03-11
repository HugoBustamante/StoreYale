export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'customer' | 'admin'; //Agregamos esta caracteristica para el renderizado de un usuario que haremos en la pagina profile. Lo protegemos o es customer o es un admin el rol. La Api maneja estos dos roles
}

export interface CreateUserDTO extends Omit<User, 'id'> {}
