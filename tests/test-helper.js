import Application from 'highstreetly-operator-ui/app';
import config from 'highstreetly-operator-ui/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
