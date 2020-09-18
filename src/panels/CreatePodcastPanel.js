import React from 'react';

import { Panel, PanelHeader, Placeholder, Button } from "@vkontakte/vkui";
import Icon56AddCircleOutline from '@vkontakte/icons/dist/56/add_circle_outline';

class CreatePodcastPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <Panel id="create_podcast">
        <PanelHeader>
          Подкасты
        </PanelHeader>
        <Placeholder
          icon={<Icon56AddCircleOutline />}
          stretched
          header="Добавьте первый подкаст"
          action={<Button size="l" onClick={() => this.props.navigation.openPanel("new_podcast")}>Добавить подкаст</Button>}
        >Добавляйте, редактируйте и делитесь подкастами вашего сообщества.</Placeholder>
      </Panel>
    )
  }
}

export default CreatePodcastPanel;