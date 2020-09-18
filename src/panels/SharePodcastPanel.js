import React from 'react';

import { Button, Panel, PanelHeader, Placeholder } from "@vkontakte/vkui";
import { Icon56CheckCircleOutline } from '@vkontakte/icons';

import "./SharePodcastPanel.css";

class SharePodcastPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <Panel id="share_podcast">
        <PanelHeader>
          Подкаст
        </PanelHeader>
        <Placeholder
          icon={<Icon56CheckCircleOutline />}
          header="Подкаст добавлен"
          action={<Button size="l">Поделиться подкастом</Button>}
          stretched
        >
          Раскажите своим подписчикам о новом подкасте, чтобы получить больше слушателей.
        </Placeholder>
      </Panel>
    )
  }
}

export default SharePodcastPanel;