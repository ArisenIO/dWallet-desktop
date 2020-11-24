// @flow
import React, { Component } from 'react';
import { Divider, Grid, Header, Image, Segment } from 'semantic-ui-react';
import { I18n } from 'react-i18next';

import logo from '../../renderer/assets/images/benchx.png';
import GlobalButtonResetContainer from '../containers/Global/Button/Reset';

const { shell } = require('electron');

export default class About extends Component<Props> {
  openLink = (url) => shell.openExternal(url);

  render() {
    return (
      <I18n ns="about">
        {
          (t) => (
            <Grid>
              <Grid.Row>
                <Grid.Column width={8}>
                  <Segment basic>
                    <Header size="large">
                      {t('application_name')}
                      <Header.Subheader>
                        {t('application_version')}
                      </Header.Subheader>
                    </Header>
                    <Divider />
                    <p>{t('about_message_1')}</p>
                    <p>{t('about_message_2')}</p>
                    <Header>
                      {t('about_opensource_title')}
                    </Header>
                    <p>
                      {t('about_opensource_message')}
                      {' '}
                      <a
                        onClick={() => this.openLink(t('about_opensource_link'))}
                        role="button"
                      >
                        {t('about_opensource_link')}
                      </a>.
                    </p>
                  </Segment>
                  <Segment secondary>
                    <p>{t('about_license_type')}</p>
                    <p>{t('about_license_body_1')}</p>
                    <p>{t('about_license_body_2')}</p>
                    <p>{t('about_license_body_3')}</p>
                    <p>{t('about_license_body_4')}</p>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={8}>
                  <Segment>
                    <Image src={logo} alt="PeepsLabs" />
                    <Segment basic padded>
                      <p>{t('about_benchx_message_1')}</p>
                      <p>
                        {t('about_benchx_message_2')}
                        {' '}
                        <a
                          onClick={() => this.openLink('https://benchx.io')}
                          role="button"
                        >
                          https://benchx.io
                        </a>.
                      </p>
                    </Segment>
                  </Segment>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <GlobalButtonResetContainer />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          )
        }
      </I18n>
    );
  }
}
