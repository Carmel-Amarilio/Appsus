import { emailService } from '../services/email.service.js'
import { EmailHeader } from '../cmps/EmailHeader.jsx'
import { EmailsFilter } from '../cmps/EmailsFilter.jsx'
import { EmailList } from '../cmps/EmailList.jsx'
import { NewEmail } from '../cmps/NewEmail.jsx'

const { useState, useEffect } = React
const { useParams } = ReactRouterDOM

export function EmailIndex() {
    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState('inbox')
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [isNewEmail, setIsNewEmail] = useState(true)
    const params = useParams()

    useEffect(() => {
        const { email: userAddress } = emailService.getUser()
        setFilterBy(params.filter);
        emailService.query().then(emails => {
            console.log(emails);
            switch (params.filter) {
                case 'inbox':
                    emails = emails.filter(email => email.from !== userAddress)
                    break
                case 'starred':
                    emails = emails.filter(email => email.isStar)
                    break
                case 'send':
                    emails = emails.filter(email => email.from === userAddress)
                    break

                default:
                    break
            }
            setEmails(emails)
        })
    }, [params.filter])

    function onStar(email) {
        email.isStar = !email.isStar
        emailService.save(email)
        setEmails(prevEmail => prevEmail.map(em => em))
        if (filterBy === 'starred') setEmails(emails.filter(email => email.isStar))
    }

    function onToggleFilter(){
        setIsFilterOpen(!isFilterOpen)
    }

    function onToggleNewEmail(){
        setIsNewEmail(!isNewEmail)
    }

    return (
        <section className="email-index">
            <EmailHeader onToggleFilter ={onToggleFilter}/>
            <div className="flex">
                <EmailsFilter onNewEmail={onToggleNewEmail} filterBy={filterBy} isOpen={isFilterOpen} />
                <EmailList emails={emails} onStar={onStar} />
            </div>
            {isNewEmail && <NewEmail onClose={onToggleNewEmail}/>}
        </section>
    )
}

