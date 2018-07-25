import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
// import { map } from 'rxjs/operators';

@Injectable()
export class ServerService {
    constructor(private http: Http) {}

    storeServers(servers: any[]) {
        // just return an observable, not sending request yet
        // when someone subscribe, it the request gets send
        const headers = new Headers({'Content-Type': 'application/json'});
        // return this.http.post('https://udemy-ng-http-a3d9c.firebaseio.com/data.json', servers,
        //     {headers: headers});

        return this.http.put('https://udemy-ng-http-a3d9c.firebaseio.com/data.json', servers,
            {headers: headers});
    }

    getServers() {
        return this.http.get('https://udemy-ng-http-a3d9c.firebaseio.com/data')
        // returns an observerable but you can transform the response data
        .map(
            (response: Response) => {
                const data = response.json();
                for (const server of data) {
                    server.name = 'FETCH_' + server.name;
                }
                return data;
            }
        )
        .catch (
            (error: Response) => {
                return Observable.throw('something went wrong');
            }
        );
    }

    getAppName() {
        return this.http.get('https://udemy-ng-http-a3d9c.firebaseio.com/appName.json')
            .map(
                (response: Response) => {
                    return response.json();
                }
            );
    }
}
