import * as React from "react";
import { Character} from "../character/Character"
import { GameMap } from '../gamemap/GameMap'

import firebase from 'firebase'

export class HomePage extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            otherCharacters: []
        }    
    }

    MAP_WIDTH = 300;
    MAP_HEIGHT = 300
    componentDidMount(){
        // configuration provided to you when you register a new project on firebase
        const firebaseConfig = {
            apiKey: "AIzaSyAdiWGRMCX4xnRi2MGnBIxOlY78ZvBVgWI",
            authDomain: "firstapp-on9game.firebaseapp.com",
            databaseURL: "https://firstapp-on9game.firebaseio.com",
            projectId: "firstapp-on9game",
            storageBucket: "firstapp-on9game.appspot.com",
            messagingSenderId: "1044176214985",
            appId: "1:1044176214985:web:c96527dd4f49ba264fe618",
            measurementId: "G-32YLKFFW9Z"
        };
        // Initialize Firebase
        this.app = firebase.initializeApp(firebaseConfig)
        
        this.userId = prompt('Enter your user id')

        // gateway to the database table /characters/
        const ref = firebase.database().ref('/characters/')

        // load once, find yourself, find other players
        ref.child(`/players`).once('value', players => {
            let newState = {otherCharacters: []}
            for (const id in players.val()) {
                const player = players.val()[id]
                if (id === this.userId) {
                    newState.myCharacter = player
                } else {
                    newState.otherCharacters.push(player)
                }
            }
            console.log(newState)
            this.setState(newState)
        }, error => console.log(error));

        // update state everytime the database changes
        ref.child(`/players`).on('value', players => {
            let newState = {otherCharacters: []}
            for (const id in players.val()) {
                const player = players.val()[id]
                if (id === this.userId) {
                } else {
                    newState.otherCharacters.push(player)
                }
            }
            console.log(newState)
            this.setState({...this.state, ...newState})
        }, error => console.log(error));

        window.addEventListener('click', (e) => {

            const {
                offsetX,
                offsetY
            } = e;
            if ( offsetX <= 0 || offsetY <= 0 || offsetX >= this.MAP_WIDTH || offsetY >= this.MAP_HEIGHT) {
                return
            }
            this.setState({...this.state,myCharacter: {...this.state.myCharacter, x: offsetX, y: offsetY}})
            // console.log(e)
            // const speed = 30;
            // const code = e.which || e.keyCode;
            // if (code == '38') {
            //     this.setState({...this.state,myCharacter: {...this.state.myCharacter, y: this.state.myCharacter.y-speed}})
            // }
            // else if (code == '40') {
            //     this.setState({...this.state,myCharacter: {...this.state.myCharacter, y: this.state.myCharacter.y+speed}})
            //     // Down
            // }
            // else if (code == '37') {
            //     this.setState({...this.state,myCharacter: {...this.state.myCharacter, x: this.state.myCharacter.x-speed}})

            //    // Left
            // }
            // else if (code == '39') {
            //     this.setState({...this.state,myCharacter: {...this.state.myCharacter, x: this.state.myCharacter.x+speed}})
            //    // Right
            // }
            ref.child(`/players/${this.userId}`).update({x: this.state.myCharacter.x, y: this.state.myCharacter.y})
        })

        window.addEventListener('keydown', (e) => {
            const speed = 30;
            const code = e.which || e.keyCode;
            if (code == '38') {
                this.setState({...this.state,myCharacter: {...this.state.myCharacter, y: this.state.myCharacter.y-speed}})
            }
            else if (code == '40') {
                this.setState({...this.state,myCharacter: {...this.state.myCharacter, y: this.state.myCharacter.y+speed}})
                // Down
            }
            else if (code == '37') {
                this.setState({...this.state,myCharacter: {...this.state.myCharacter, x: this.state.myCharacter.x-speed}})

               // Left
            }
            else if (code == '39') {
                this.setState({...this.state,myCharacter: {...this.state.myCharacter, x: this.state.myCharacter.x+speed}})
               // Right
            }
            ref.child(`/players/${this.userId}`).update({x: this.state.myCharacter.x, y: this.state.myCharacter.y})
        })
    }
    
    render() {
        return(
            <div style={{
                display:'flex',
                width:'100vw',
                flexDirection: 'column',
                alignItems:'center'
            }}>
                <h1>Home</h1>
                <GameMap width={this.MAP_WIDTH} height={this.MAP_HEIGHT}>
                    
                    {this.state.otherCharacters.map(character => 
                        <Character 
                            playerName={character.name} 
                            x={character.x} 
                            y={character.y}
                            playerColor={character.color}
                            radius={50}
                        />
                    )}
                     {this.state.myCharacter && <Character 
                            playerName={this.state.myCharacter.name} 
                            x={this.state.myCharacter.x} 
                            y={this.state.myCharacter.y}
                            playerColor={this.state.myCharacter.color}
                            radius={20}
                        />}
                </GameMap>
        
            </div>
        )
    }
}