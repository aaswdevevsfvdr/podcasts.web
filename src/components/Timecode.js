import { Icon28RemoveCircleOutline } from '@vkontakte/icons';
import React from 'react';

import { Avatar, Input } from "@vkontakte/vkui";

import "./Timecode.css";

class Timecode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // time: props.time,
      // name: props.name,
    };
  }

  // handleNameChange = (event) => {
  //   const value = event.target.value;
  //   this.setState(() => ({name: value}));
  // }

  // handleTimeChange = (event) => {
  //   const value = event.target.value;
  //   this.setState(() => ({time: value}));
  // }

  render() {
    return (
      <div id="timecode">
        <Icon28RemoveCircleOutline onClick={() => this.props.remove(this.props.num)}/>
        <Input className="name" value={this.props.name} onChange={this.props.changeName}></Input>
        <Input className="time" value={this.props.time} onChange={this.props.changeTime}></Input>
      </div>
    )
  }
}


export default Timecode;