import {User} from "firebase/auth";
export interface SignInProps {
  email: string,
  password: string
}

export interface EmailProps {
  email: string,
}

export interface DataProps {
  idUser: string | null;
  acceso: string | null;
  nombre: string | null;
  user: User | null;
  login: (credentials: SignInProps) => Promise<void>;
  closeSesion: () => Promise<void>;
  createUserFirebase: (email: string, pass: string) => Promise<User | string>;
  recoverPass: (email: EmailProps) => Promise<void>;
}