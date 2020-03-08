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
