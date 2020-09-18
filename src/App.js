import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import CreatePodcastPanel from './panels/CreatePodcastPanel';
import NewPodcastPanel from './panels/NewPodcastPanel';
import SharePodcastPanel from './panels/SharePodcastPanel';
import RedactorPanel from './panels/RedactorPanel';
import { ConfigProvider } from '@vkontakte/vkui';
import SnippetPanel from './panels/SnippetPanel';


class App extends React.Component {
	constructor(props) {
		super(props);

		const start = "create_podcast";

		this.state = {
			history: [start],
			activePanel: start,
			popout: null,

			podcast: {
				audio: null,
				image: null,
				name: "",
				description: "",
				timecodes: []
			}
		};
	}

	componentDidMount() {
		window.addEventListener('popstate', () => this.goBack());
	}

	goBack = () => {
		var history = this.state.history;
		
		if( history.length === 1  ) {
			bridge.send("VKWebAppClose", {"status": "success"});
		} else if ( history.length > 1 ) { 
			history.pop() 
			this.setState({ activePanel: history[history.length - 1] })
		}
	}

	openPanel = (name) => {
		window.history.pushState( { panel: name }, name );
  	this.setState({ 
      activePanel: name,
      history: [...this.state.history, name]
  	})
	}

	startSpinner = () => {
		this.setState(() => ({popout: <ScreenSpinner />}))
	}

	stopSpinner = () => {
		this.setState(() => ({popout: null}));
	}

	changePodcast = (podcast) => {
		this.setState(() => ({podcast: podcast}), () => console.log(this.state.podcast));
	}

	render() {
		const navigation = {
			openPanel: this.openPanel,
			spinner: {
				start: this.startSpinner,
				stop: this.stopSpinner,
			},
		};

		return (
			<ConfigProvider isWebView={true}>
				<View activePanel={this.state.activePanel} popout={this.state.popout} onSwipeBack={this.goBack}>
					<CreatePodcastPanel id="create_podcast" navigation={navigation}/>
					<NewPodcastPanel id="new_podcast" navigation={navigation} changePodcast={this.changePodcast} podcast={this.state.podcast}/>
					<SharePodcastPanel id="share_podcast" navigation={navigation}/>
					<RedactorPanel id="redactor" navigation={navigation} podcast={this.state.podcast} changePodcast={this.changePodcast}/>
					<SnippetPanel id="snippet" navigation={navigation} podcast={this.state.podcast}/>
				</View>
			</ConfigProvider>
		)
	}
}

export default App;

