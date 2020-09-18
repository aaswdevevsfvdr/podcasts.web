import React from 'react';

import { Avatar, Caption, CellButton, Div, Header, HorizontalScroll, Panel, PanelHeader, PanelHeaderBack, SimpleCell } from "@vkontakte/vkui";

import "./RedactorPanel.css";
import { Icon16Add, Icon24Add, Icon28AddCircleOutline, Icon28ArrowUturnRightOutline, Icon28MusicOutline, Icon28Pause, Icon28Play } from '@vkontakte/icons';
import Timecode from '../components/Timecode';
import { ReactComponent as ScissorsIcon} from "../img/scissors.svg";
import { ReactComponent as BarUpIcon } from "../img/barup.svg";
import { ReactComponent as BarDownIcon } from "../img/bardown.svg";
import { ReactComponent as UturnLeftIcon } from "../img/uturn_left.svg";

class RedactorPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timecodes: this.props.podcast.timecodes,
      pitches: [],

      isPlaying: false,
      scrolledAuto: false,
    };
  }

  componentDidMount() {
    let arr = [];
    for (var i = 0; i < this.props.podcast.audio.duration.totalSeconds; i++) {
      arr.push(Math.floor(Math.random() * 36 + 2));
    }

    this.setState(() => ({pitches: arr}), () => console.log(this.state.pitches));
  }

  handleTimeUpdate = (event) => {
    console.log('this.audio.currentTime', this.audio.currentTime);
    this.scroll.scrollLeft = this.audio.currentTime * 5;
    this.setState(() => ({scrolledAuto: true}));
  }

  handleAddTimecodeClick = (event) => {
    this.setState((pv) => ({timecodes: [...pv.timecodes, {key: pv.timecodes.length, name: "", time: ""}]}), () => {
      this.props.podcast.timecodes = this.state.timecodes;
      this.props.changePodcast(this.props.podcast);
    });
  }

  handleRemoveTimecode = (key) => {
    const timecodes = this.state.timecodes;
    let index = -1;
    for (var i = 0; i < timecodes.length; i++) {
      if (timecodes[i].key === key) {
        index = i;
        break;
      }
    }

    timecodes.splice(index, 1);
    this.setState(() => ({timecodes: timecodes}), () => {
      this.props.podcast.timecodes = this.state.timecodes;
      this.props.changePodcast(this.props.podcast);
    });
  }

  handlePlayStopButtonClick = (event) => {
    if (this.state.isPlaying === true) {
      this.audio.pause();
      this.setState(() => ({isPlaying: false}));
    } else {
      this.audio.play();
      console.log("play");
      console.log('this.scroll.scrollLeft', this.scroll.scrollLeft);
      this.audio.currentTime = this.scroll.scrollLeft / 5;
      this.setState(() => ({isPlaying: true}));
    }    
  }

  handleTimecodeNameChange = (key, event) => {
    const value = event.target.value;
    for (var i = 0; i < this.state.timecodes.length; i++) {
      if (this.state.timecodes[i].key === key) {
        const timecodes = this.state.timecodes;
        timecodes[i].name = value;
        this.setState(() => ({timecodes: timecodes}), () => {
          this.props.podcast.timecodes = this.state.timecodes;
          this.props.changePodcast(this.props.podcast);
        });
      }
    }
  }

  handleTimecodeTimeChange = (key, event) => {
    const value = event.target.value;
    for (var i = 0; i < this.state.timecodes.length; i++) {
      if (this.state.timecodes[i].key === key) {
        const timecodes = this.state.timecodes;
        timecodes[i].time = value;
        this.setState(() => ({timecodes: timecodes}), () => {
          this.props.podcast.timecodes = this.state.timecodes;
          this.props.changePodcast(this.props.podcast);
        });
      }
    }
  }

  handleScroll = (event) => {
    if (this.state.scrolledAuto === true) {
      this.setState(() => ({scrolledAuto: false}));
    } else {
      console.log("manual scroll");
      this.setState(() => ({isPlaying: false}));
      this.audio.pause();
    }
  }

  render() {
    const timecode_cells = this.state.timecodes.map(timecode => {
      return <Timecode key={timecode.key} num={timecode.key} name={timecode.name} time={timecode.time} changeName={(event) => this.handleTimecodeNameChange(timecode.key, event)} changeTime={(event) => this.handleTimecodeTimeChange(timecode.key, event)} remove={this.handleRemoveTimecode}/>
    })

    const pitch_lines = [];
    for (var i = 0; i < this.state.pitches.length; i++) {
      pitch_lines.push(<div className="pitch_line" key={i} style={{height: this.state.pitches[i]}}></div>);
    }

    const timeline_seconds = [];
    const timeline_times = [];
    for (var i = 0; i < this.state.pitches.length; i++) {
      timeline_seconds.push(<div className={`second_line ${i % 2 === 1 ? i % 10 === 9 ? "second_line_extralarge" : "second_line_large" : ""}`}></div>);
      if (i % 10 === 9) {
        const minutes = (Math.floor((i + 1) / 60)).toString().padStart(2, '0');
        const seconds = (Math.floor((i + 1) % 60)).toString().padStart(2, '0');

        timeline_seconds.push(<div style={{position: "relative", height: "auto", top: 0, left: 0, width: "10px"}}><Caption level="4" weight="regular" className="timeline_time">
          {minutes}:{seconds}
          </Caption></div>);
      }
    }

    

    return (
      <Panel id="redactor">
        <PanelHeader
          left={<PanelHeaderBack onClick={() => window.history.back()}/>}
        >
          Редактирование
        </PanelHeader>
        
        <div className="card">

          <audio 
            ref={(audio) => this.audio = audio}
            src={this.props.podcast.audio.url}
            onTimeUpdate={this.handleTimeUpdate}
          />

          <div className="scroll" ref={(div) => this.scroll = div} onScroll={this.handleScroll}>
            <div className="timeline">
              {timeline_seconds}
              {timeline_times}
            </div>         
            <div style={{width: this.props.podcast.audio.duration.totalSeconds * 5, minHeight: "0.5px", backgroundColor: "var(--separator_common)"}}></div> 
            <div className="scroll_pitches">
              {pitch_lines}
            </div>
          </div>

          <div className="controls">

            <div className="control_button control_play" onClick={this.handlePlayStopButtonClick}>
              {this.state.isPlaying ? <Icon28Pause/> : <Icon28Play/>}
            </div>

            <div className="control_button control_cut">
              <ScissorsIcon />
            </div>

            <div className="control_button control_back">
              <UturnLeftIcon />
            </div>

            <div className="control_button control_music">
              <Icon28MusicOutline />
            </div>

            <div className="control_button control_up">
              <BarUpIcon />
            </div>

            <div className="control_button control_down">
              <BarDownIcon />
            </div>

          </div>

        </div>


        <Div>
          <Caption className="timecodes_header" caps level="1" weight="semibold">Таймкоды</Caption>
        </Div>

        {timecode_cells}
        
        <SimpleCell
          className="timecode_add"
          before={<Avatar style={{ background: 'var(--accent)' }} size={24} shadow={false}><Icon16Add fill="var(--white)" /></Avatar>}
          onClick={this.handleAddTimecodeClick}
        >
          Добавить таймкод
        </SimpleCell>

        <Caption 
          className="footer_text"
          level="1" 
          weight="regular"
        >
          Отметки времени с названием темы. Позволяют слушателям легче путешествовать по подкасту.
        </Caption>

      </Panel>
    )
  }
}

export default RedactorPanel;