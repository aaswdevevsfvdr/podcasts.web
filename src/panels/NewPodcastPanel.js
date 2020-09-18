import { PanelHeaderBack, Panel, PanelHeader, Avatar, Cell, Button, Input, Subhead, Textarea, Div, FormLayout, Placeholder, Separator, Checkbox, FormLayoutGroup, Caption } from '@vkontakte/vkui';
import React from 'react';
import Icon56GalleryOutline from '@vkontakte/icons/dist/56/gallery_outline';

import "./NewPodcastPanel.css";
import { Icon24ChevronRight, Icon28PodcastOutline } from '@vkontakte/icons';

class NewPodcastPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: props.podcast.image,
      audio: props.podcast.audio,
      name: props.podcast.name,
      description: props.podcast.description,
    };
  }

  handleNameChange = (event) => {
    const value = event.target.value;
    this.setState(() => ({name: value}), () => {
      this.props.podcast.name = this.state.name;
      this.props.changePodcast(this.props.podcast);
    });
  }

  handleDescriptionChange = (event) => {
    const value = event.target.value;
    this.setState(() => ({description: value}), () => {
      this.props.podcast.description = this.state.description;
      this.props.changePodcast(this.props.podcast);
    });
  }

  handleImageUploadClick = (event) => {
    this.imageUploader.click();
  }

  onImageUploaded = (event) => {
    const file = event.target.files[0];
    this.setState(() => ({image: URL.createObjectURL(file)}), () => {
      this.props.podcast.image = this.state.image;
      this.props.changePodcast(this.props.podcast);
    });
  }

  handleAudioUploadClick = (event) => {
    this.audioUploader.click();
  }

  onAudioUploaded = (event) => {
    this.props.navigation.spinner.start();
    const file = event.target.files[0];
    const audioObj = new Audio(URL.createObjectURL(file));
    setTimeout(() => {
      const seconds = (Math.floor(audioObj.duration % 60)).toString().padStart(2, "0");
      const minutes = Math.floor(audioObj.duration / 60);

      const audio = {
        name: file.name,
        duration: {
          minutes: minutes,
          seconds: seconds,
          totalSeconds: Math.floor(audioObj.duration),
        },
        url: URL.createObjectURL(file)
      };

      this.props.podcast.audio = audio;
      this.props.changePodcast(this.props.podcast);
      this.setState(() => ({audio: audio}), () => this.props.navigation.spinner.stop());
    }, 1000) 
  }

  render() {
    return (
      <Panel id="new_podcast">
        <PanelHeader
          left={<PanelHeaderBack onClick={() => window.history.back()}/>}
        >
          Новый подкаст
        </PanelHeader>

        <Cell
          className="name_cell"
          before={
            <div className="avatar_div" onClick={this.handleImageUploadClick}>
              {
                this.state.image === null
                ? 
                  <Avatar size={72} mode="app"><Icon56GalleryOutline height={32}/></Avatar>
                :
                  <img className="image" src={this.state.image} />
              }
            </div>
          }
          size="l"
        >
          <FormLayout style={{margin: 0, padding: 0}}>
            <Input placeholder="Введите название подкаста" top="Название" value={this.state.name} onChange={this.handleNameChange}/>
          </FormLayout>
        </Cell>

        <FormLayout className="description">
          <Textarea top="Описание подкаста" value={this.state.description} onChange={this.handleDescriptionChange}/>
        </FormLayout>

        {
          this.state.audio === null
          ?
            <Placeholder
              className="load_placeholder"
              header="Загрузите Ваш подкаст"
              action={<Button size="l" mode="outline" onClick={this.handleAudioUploadClick}>Загрузить файл</Button>}
            >
              Выберите готовый аудиофайл из вашего телефона и добавьте его
            </Placeholder>
          :
            <>
              <Cell
                className="audio_cell"
                before={<Avatar size={48} shadow={false} mode="app"><Icon28PodcastOutline /></Avatar>}
                asideContent={<Caption className="audio_time" level={1} weight="regular">{this.state.audio.duration.minutes}:{this.state.audio.duration.seconds}</Caption>}
              >
                {this.state.audio.name}
              </Cell>

              <Caption 
                className="redactor_text"
                level="1" 
                weight="regular"
              >
                Вы можете добавить таймкоды и скорректировать подкаст в режиме редактирования
              </Caption>

              <Div className="redactor_button_div">
                <Button
                  className="redactor_button"
                  size="xl"
                  mode="outline"
                  onClick={() => this.props.navigation.openPanel("redactor")}
                >
                  Редактировать аудиозапись
                </Button>
              </Div>
            </>
        }

        <Separator/>

        <FormLayoutGroup
          className="checkboxes"
        >
          <Checkbox>Ненормативный контент</Checkbox>
          <Checkbox>Исключить эпизод из экспорта</Checkbox>
          <Checkbox>Трейлер подкаста</Checkbox>
        </FormLayoutGroup>

        <Cell
          className="privacy"
          description="Всем пользователям"
          asideContent={<Icon24ChevronRight />}
        >
          Кому доступен данный подкаст
        </Cell>

        <Caption 
          className="footer_text"
          level="1" 
          weight="regular"
        >
          При публикации записи с эпизодом, он становится доступным для всех пользователей
        </Caption>

        <Div
          className="button"
        >
          <Button
            size="xl"
            disabled={this.state.image === null || this.state.audio === null || this.state.name.length === 0 || this.state.description.length === 0}
            onClick={() => this.props.navigation.openPanel("snippet")}
          >
            Далее
          </Button>
        </Div>

        <input type="file" accept="image/*" ref={input => this.imageUploader = input} style={{display: "none"}} onChange={this.onImageUploaded}/>
        <input type="file" accept="audio/*" ref={input => this.audioUploader = input} style={{display: "none"}} onChange={this.onAudioUploaded}/>
      </Panel>
    )
  }
}

export default NewPodcastPanel;