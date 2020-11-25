import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

import { LoginResp, SignUpResp, User } from "../models/user";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  //signIn
  login(body: User): Observable<LoginResp> {
    return this.http.post<LoginResp>(
      `${environment.api_url}/users/signIn`,
      body
    );
  }

  //sign up
  signup(body: User): Observable<SignUpResp> {
    return this.http.post<SignUpResp>(
      `${environment.api_url}/users/signUp`,
      body
    );
  }

  //google
  googleSignIn(): Observable<LoginResp> {
    return this.http.get<LoginResp>(`${environment.api_url}/auth/google`);
  }

  isAuthenticated(token): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      }),
    };
    return this.http.get<boolean>(
      `${environment.api_url}/auth/authenticate`,
      httpOptions
    );
  }
}
