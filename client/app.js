angular.module('nfl', [
  'stormpath',
  'stormpath.templates',
  'ui.router'
])
.config(appConfig)
.run(appRun);

function appConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  // Unmatched urls: redirect to /
  $urlRouterProvider.otherwise("/");
  // States
  $stateProvider
  .state('login', {
    url: '/login',
    template: '<div sp-login-form></div>'
  })
  .state('register', {
    url: '/register',
    template: '<div sp-registration-form></div>'
  })
  .state('protected', {
    url: '/protected',
    templateUrl: 'protected.html',
    sp: { authenticate: true }
  });
  $locationProvider.html5Mode(true);
}

function appRun($stormpath) {
  $stormpath.uiRouter({
    loginState: 'login',
    defaultPostLoginState: 'protected'
  });
}
