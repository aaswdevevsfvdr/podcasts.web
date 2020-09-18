import { Icon56GalleryOutline } from '@vkontakte/icons';
import { Avatar, Div, Panel, PanelHeaderBack, PanelHeader, Title, Caption, Separator, Text, Cell, Button, Placeholder } from '@vkontakte/vkui';
import React from 'react';

import "./SnippetPanel.css";

class SnippetPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const timecode_cells = [];
    for (var i = 0; i < this.props.podcast.timecodes.length; i++) {
      timecode_cells.push(
        <Cell>
          <span style={{color:"var(--text_link)"}}>{this.props.podcast.timecodes[i].time}</span> — {this.props.podcast.timecodes[i].name}
        </Cell>
      )
    }

    return (
      <Panel id="snippet">
        <PanelHeader
          left={<PanelHeaderBack onClick={() => window.history.back()} />}
        >
          Новый подкаст
        </PanelHeader>

        <Div className="header">
          <div className="left">
            <Avatar size={72} mode="app" src={this.props.podcast.image}>{!this.props.podcast.image && <Icon56GalleryOutline height={32}/>}</Avatar>
          </div>
          <div className="right">
              <Title className="name" level="3" weight="semibold">{this.props.podcast.name}</Title>
              <Caption className="author" level="2" weight="medium">Автор: [object Object]</Caption>
              <Caption className="duration" level="2" weight="regular">Длительность: {this.props.podcast.audio.duration.minutes}:{this.props.podcast.audio.duration.seconds}</Caption>
          </div>
        </Div>

        <Separator />

        <Div className="description">
          <Title className="description_header" level="3" weight="semibold">Описание</Title>
          <Text className="description_text" weight="regular">{this.props.podcast.description}</Text>
        </Div>

        <Separator />

        <Div className="timecodes">
          <Title className="timecodes_header" level="3" weight="semibold">Содержание</Title>
        </Div>

        {timecode_cells.length === 0 ?
        <Placeholder
        header="Добавьте таймкоды"
        >
          Добавьте таймкоды в редакторе подкаста, чтобы слушателям было удобнее что-то там было удобнее короче.
        </Placeholder>
        :
        timecode_cells}

        <Separator style={{marginTop: "14px"}}/>

        <Div>
          <Button 
            size="xl"
            onClick={() => this.props.navigation.openPanel("share_podcast")}
          >Опубликовать подкаст</Button>
        </Div>

      </Panel>
    )
  }
}

export default SnippetPanel;