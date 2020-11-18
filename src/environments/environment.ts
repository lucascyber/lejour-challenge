// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  endPoints: {
    user: 'http://localhost:3000/users',
    invoice: 'http://localhost:3000/invoice',
    wending: 'http://localhost:3000/wendding',
    appointment: 'http://localhost:3000/appointments',
    favorites: 'http://localhost:3000/wendding-favorites'
  }
  // endPoints: {
  //   user: 'https://sheet2api.com/v1/ByR2h1huRjyQ/fiap/user',
  //   invoice: 'https://sheet2api.com/v1/ByR2h1huRjyQ/fiap/invoice',
  //   wending: 'https://sheet2api.com/v1/ByR2h1huRjyQ/fiap/wedding',
  //   appointment: 'https://sheet2api.com/v1/ByR2h1huRjyQ/fiap/appointment',
  //   favorites: 'https://sheet2api.com/v1/ByR2h1huRjyQ/fiap/wedding_favorites'
  // }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
