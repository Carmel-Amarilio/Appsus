export function NewEmail({onClose}) {
    console.log('hellow');

    return (
        <section className="new-email">
            <section className="header flex align-center space-between">
                <p>New Message</p>
                <span >
                    <button><i className="fa-solid fa-minus"></i></button>
                    <button><i className="fa-solid fa-up-right-and-down-left-from-center"></i></button>
                    <button onClick={onClose}><i className="fa-solid fa-x"></i></button>
                </span>
            </section>
            <span className="input-contener">
                <input type="text" placeholder="To" id="txt" name="txt" />
                <input type="text" placeholder="Subject" id="txt" name="txt" />
                <input type="text" id="txt" name="txt" />
            </span>
        </section>
    )
}
