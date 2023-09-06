import { emailService } from '../services/email.service.js'
import { EmailHeader } from '../cmps/EmailHeader.jsx'
import { EmailsFilter } from '../cmps/EmailsFilter.jsx'
import { EmailList } from '../cmps/EmailList.jsx'

const { useState, useEffect } = React

export function EmailIndex() {
    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState('inbox')

    useEffect(() => {
        emailService.query().then(setEmails)
    }, [])

    function onFilter(by) {
        console.log(by);
        emailService.query().then(emails => {
            switch (by) {
                case 'inbox':
                    break
                case 'starred':
                    emails = emails.filter(email => email.isStar)
                    break
                case 'send':
                    break

                default:
                    break
            }
            // setFilterBy(by)
            setEmails(emails)
            setFilterBy(by)
        })
    }

    if (!emails) return <div>loading...</div>
    // if (!emails.length) return <div>no Emails...</div>
    return (
        <section className="email-index">
            {console.log(emails)}
            <EmailHeader />
            <EmailsFilter onFilter={onFilter} />
            <EmailList emails={emails} />
        </section>
    )
}

