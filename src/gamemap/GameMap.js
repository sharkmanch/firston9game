import * as React from 'react';

export class GameMap extends React.Component{
    render(){
        return (
        <div
            style={{
                width: this.props.width,
                height: this.props.height,
                border: '1px solid black',
            }}
        >
            {this.props.children}
        </div>
        )
    }
}
