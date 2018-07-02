const bankOne = [{
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
}, {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
}, {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
}, {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
}, {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
}, {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
}, {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
}, {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
}, {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
},
];

const inactive = {
    backgroundColor: '#014034',
    boxShadow: '3px 3px 5px black',
    color: 'yellow'
};

const active = {
    backgroundColor: 'orange',
    boxShadow: "0 3px orange",
};

class DrumBtn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            padStyle: inactive
        };

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.playSound = this.playSound.bind(this);
        this.activeBtn = this.activeBtn.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress(e) {
        if(e.keyCode == this.props.keyCode) {
            this.playSound();
        }
    }

    activeBtn() {
        this.state.padStyle.backgroundColor === 'orange' ?
            this.setState({
                padStyle: inactive
            }) :
            this.setState({
                padStyle: active
            });
    }

    playSound() {
        this.props.dispHandler(this.props.disp);
        const sound = document.getElementById(this.props.keyTrigger);
        sound.currentTime = 0;
        sound.play();
        this.activeBtn();
        setTimeout(() => this.activeBtn(), 100);
    }

    render() {
        return(
            <div className="drum-pad" keyCode={this.props.keyCode} onClick={this.playSound} style={this.state.padStyle} id={this.props.disp}>
                <audio src={this.props.url} id={this.props.keyTrigger} className="clip"></audio>
                <div className="txt">{this.props.keyTrigger}</div>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentBank: bankOne,
            display: String.fromCharCode(160)
        };
        this.updateDisplay = this.updateDisplay.bind(this);
    }

    updateDisplay(arg0) {
        this.setState({display: arg0});
    }

    render() {
        const btns = this.state.currentBank.map(o => {
            return(
                <DrumBtn
                    url={o.url}
                    keyCode={o.keyCode}
                    keyTrigger={o.keyTrigger}
                    disp={o.id}
                    dispHandler={this.updateDisplay}
                />
            );
        });

        return(
            <div id="drum-machine">
                <div id="display">{this.state.display}</div>
                <div className="drumpad-container">
                    {btns}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));

