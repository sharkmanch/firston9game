import * as React from 'react'

export class Character extends React.Component{
    render(){
        return (
            <div
                style={{
                    width:this.props.radius * 2,
                    height:this.props.radius * 2,
                    borderRadius: 50,
                    background: this.props.playerColor,
                    color: '#fff',
                    display: 'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    transform: `translate(${this.props.x}px, ${this.props.y}px)`,
                    position: "absolute",
                    transitionDuration: '200ms',
                }}
            >
             {this.props.playerName}
            </div>
        )
    }
}

