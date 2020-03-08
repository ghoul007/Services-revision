# Service Angular

## HttpHeaders
Represents the header configuration options for an HTTP request. Instances are immutable. Modifying methods return a cloned instance with the change. The original object is never
[See more](https://angular.io/api/common/http/HttpHeaders)

 ```ts

 headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),

 ```

## HttpParams
An HTTP request/response body that represents serialized parameters, per the MIME type application/x-www-form-urlencoded.
[See more](https://angular.io/api/common/http/HttpParams)

```ts
 let searchParams = new HttpParams();
    searchParams = searchParams.append('key1', 'value1');
    searchParams = searchParams.append('key2', 'value2');
    //  same  ...?key1=value1&key2=value2
    return this.http
      .get<{ [key: string]: Post }>(
        'https://...',
        {
          params: searchParams,
        }
      )
```


### Observe Events
A new feature with HttpClient is the ability to listen for progress events,

```ts
deletePosts() {
    return this.http
      .delete('https://services-revision.firebaseio.com/posts.json', {
        observe: 'events',
        responseType: 'text'
      })
      .pipe(
        tap(event => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            // ...
          }
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
```
When using HttpClient#request() with an HTTP method, configure with observe: 'events' to see all events, including the progress of transfers.

  *  HttpEventType
all possible events on the response stream: 
```ts
enum HttpEventType {
  Sent               // The request was sent out over the wire.
  UploadProgress     // An upload progress event was received.
  ResponseHeader     // The response status code and headers were received.
  DownloadProgress   // A download progress event was received.
  Response           // The full response including the body was received.
  User               // A custom event from an interceptor or a backend.
}
```
[See more](https://angular.io/api/common/http/HttpEventType)

You can use `reportProgress: true` to show some progress of any HTTP request

```ts
	const req = new HttpRequest('GET', url, {reportProgress: true});
		this.http
				.request(req)
				.subscribe((event:HttpEvent<any>)=>{
					switch(event.type){
						case HttpEventType.Sent:
							console.log('Request sent!');
							break;
						case HttpEventType.ResponseHeader:
							console.log('Response header received!');
							break;
						case HttpEventType.DownloadProgress:
							const kbLoaded = Math.round(event.loaded / 1024);
							console.log(`Download in progress! ${ kbLoaded }Kb loaded`);
							break;
						case HttpEventType.Response:
							console.log('Done!', event.body);
							break;
					}
				});
	}

```

Rq: to see all events, including the progress of transfers you need to use `observe: 'events'`


## Transform response

Map operator for RXJS, transform the items emitted by an Observable by applying a function to each item
[See more](http://reactivex.io/documentation/operators/map.html)

for example in our example:

```ts

.pipe(
  map(responseData => {
    const postsArray: Post[] = [];
    for (const key in responseData) {
      if (responseData.hasOwnProperty(key)) {
        postsArray.push({ ...responseData[key], id: key });
      }
    }
    return postsArray;
  }),
)
```


## interceptor

Interceptors provide a mechanism to intercept and/or mutate outgoing requests or incoming responses
[See more](https://alligator.io/angular/httpclient-interceptors/)

```ts

import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const updReq = req.clone({ headers: req.headers.append('auth', 'basic') });

    return next.handle(updReq);
  }
}

```
