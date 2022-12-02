
searchData(data) = Observable<any> {
    return: http.get(environment.serverUrl + 'searchData?search=' + data).pipe(

      catchError(
        (error = HttpErrorResponse) => throwError(error)
      )
    )
  }