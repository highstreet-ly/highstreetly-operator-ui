'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'highstreetly-operator-ui',
    environment,
    podModulePrefix: 'highstreetly-operator-ui/pods',
    rootURL: '',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    cloudinary: {
      cloudName: 'sonatribedevmou',
      apiKey: '967363294944649'
    },

    fontawesome: {
      warnIfNoIconsIncluded: false,
      // ...
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV.sonatribe = {};

  ENV.sonatribe.Api = process.env.MAIN_API;

  ENV.sonatribe.DashApi = process.env.DASH_API;
  ENV.sonatribe.OpsApi = process.env.OPS_API;
  ENV.sonatribe.DashUi = process.env.DASH_UI;

  ENV.sonatribe.authenticationURL = `https://ids.${process.env.A_RECORD}.${process.env.TLD}`;


  ENV.sonatribe.AllowedDomains = `api.ops.${process.env.A_RECORD}.${process.env.TLD},ids.${process.env.A_RECORD}.${process.env.TLD}`;

  ENV.sonatribe.MainUi = process.env.MAIN_UI;
  ENV.sonatribe.Version = process.env.VERSION;
  ENV.sonatribe.Client = process.env.CLIENT;
  ENV.sonatribe.responseType = process.env.RESPONSE_TYPE;
  ENV.sonatribe.stripeClientId = process.env.STRIPE_CLIENT_ID;
  ENV.sonatribe.partnerId = process.env.PARTNER_ID;
  ENV.sonatribe.apiNamespace = process.env.API_NAMEPSACE;
  ENV.sonatribe.ClientSilentRenew = process.env.CLIENT_SILENT_RENEW;
  ENV.sonatribe.ImageBlobContainer = process.env.IMAGE_BLOB_CONTAINER;
  ENV.sonatribe.applicationURL = process.env.CLIENT;
  ENV.sonatribe.requestedScopes = "offline_access openid profile sonatribe.permissions.api sonatribe.ticketmanagement.api sonatribe.payment.api sonatribe.ticketreservations.api sonatribe.operator.api";
  ENV.sonatribe.applicationName = process.env.APPLICATION_NAME;
  ENV.sonatribe.popupRedirectURL = process.env.CLIENT_POPUP;
  ENV.sonatribe.silentRedirectURL = process.env.SILENT_REDIRECT_URL;
  ENV.sonatribe.responseType = process.env.RESPONSE_TYPE;
  ENV.sonatribe.postLogoutRedirectURL = process.env.POST_LOGOUT_URL;
  ENV.sonatribe.checkSessionInterval = +process.env.CHECK_SESSION_INTERVAL;
  ENV.sonatribe.automaticSilentRenew = (process.env.AUTOMATIC_SILENT_RENEW == 'true');
  ENV.sonatribe.filterProtocolClaims = (process.env.FILTER_PROTOCOL_CLAIMS == 'true');
  ENV.sonatribe.loadUserInfo = (process.env.LOAD_USER_INFO == 'true');
  ENV.sonatribe.clientId = process.env.CLIENT_ID;
  ENV.sonatribe.redirectUrl ='';
  ENV.sonatribe.clientDomain = process.env.CLIENT_DOMAIN;
  ENV.sonatribe.serverIp = process.env.SERVER_IP;

  ENV.sonatribe.OrdersUi = process.env.ORDERS_UI;
  ENV.sonatribe.TicketsUi = process.env.TICKETS_UI;

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
