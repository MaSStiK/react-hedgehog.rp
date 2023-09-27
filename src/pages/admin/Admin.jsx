import React, { Component } from 'react'

export default class Admin extends Component {
    render() {
        return (
            <section>
                <h1>Never gonna give you up</h1>
                <h2>Never gonna let you down</h2>
                <h3>Never gonna run around and desert you</h3>
                <h4>Never gonna make you cry</h4>
                <h5>Never gonna say goodbye</h5>
                <h6>Never gonna tell a lie and hurt you</h6>
                <button id="open-modal">button + modal</button>
                <button className="primary">primary</button>
                <button className="danger">danger</button>
                <button className="transparent">transparent</button>
                <button disabled>disabled</button>
                {/* <a href="#" className="link">Ссылка</a> */}
            </section>
        )
    }
}
