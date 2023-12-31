import { utilService } from '../../../services/util.service.js'
import { emailService } from '../services/email.service.js'

const { useState, useEffect } = React
const { useParams } = ReactRouterDOM
const { useNavigate } = ReactRouterDOM

export function EmailData({ onShare, onStar, onRemove }) {
    const [email, setEmail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        emailService.get(params.emailId)
            .then(email => {
                email.isRead = true
                emailService.save(email)
                setEmail(email)
            })
    }, [])

    function onBack() {
        navigate(-1)
    }

    if (!email) return <div className="list-msg">loading...</div>
    const { from, to, body, subject, isStar } = email
    return (
        <section className="email-data">

            <section className="header-nav flex align-center">
                <button onClick={onBack}>
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <button onClick={() => onStar(email)} className={'star-btn ' + (isStar && 'starred')}>
                    {isStar && <i className="fa-solid fa-star"></i>}
                    {!isStar && <i className="fa-regular fa-star"></i>}
                </button>
                <button onClick={() => { onShare(email) }} className="share-btn" >
                    <i className="fa-regular fa-note-sticky"></i>
                </button>
                <button onClick={() => { onRemove(email); onBack() }} className="delete-btn" >
                    <img src="../../assets/icons/delete.png" />
                </button>
            </section>

            <section className="email-text">
                <h1>{subject}</h1>
                <h3>{from}</h3>
                {from === emailService.getUser().email && <h3>to: {to}</h3>}
                <textarea disabled defaultValue={body}></textarea>
            </section>

        </section>
    )

}