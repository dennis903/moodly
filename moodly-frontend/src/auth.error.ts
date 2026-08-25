import {CredentialsSignin} from 'next-auth';

export class BackendAuthError extends CredentialsSignin {
  code: string;

  constructor(code: string, message?: string) {
    super(message);
    this.code = code;
  }
}
