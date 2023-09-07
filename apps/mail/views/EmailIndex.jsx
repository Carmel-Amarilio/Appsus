import { utilService } from '../../../services/util.service.js'
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
    const [searchBy, setSearchBy] = useState('')
    const [isNewEmail, setIsNewEmail] = useState(false)
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const params = useParams()

    useEffect(() => {
        const { email: userAddress } = emailService.getUser()
        setFilterBy(params.filter);
        emailService.query(searchBy).then(emails => {
            console.log(emails);
            switch (params.filter) {
                case 'inbox':
                    emails = emails.filter(email => email.from !== userAddress && !email.removedAt)
                    break
                case 'starred':
                    emails = emails.filter(email => email.isStar && !email.removedAt)
                    break
                case 'send':
                    emails = emails.filter(email => email.from === userAddress && !email.removedAt)
                    break
                case 'remove':
                    emails = emails.filter(email => email.removedAt)
                    break

                default:
                    break
            }
            setEmails(emails)
        })
    }, [params.filter, searchBy])

    function onStar(email) {
        email.isStar = !email.isStar
        emailService.save(email)
        setEmails(prevEmail => prevEmail.map(em => em))
        if (filterBy === 'starred') setEmails(emails.filter(email => email.isStar))
    }

    function onToggleFilter() {
        setIsFilterOpen(!isFilterOpen)
    }

    function onToggleNewEmail() {
        setIsNewEmail(!isNewEmail)
    }

    function onSend(newEmail) {
        const { email: from } = emailService.getUser()
        const { subject, body, to } = newEmail
        const email = {
            subject,
            body,
            isRead: false,
            sentAt: utilService.getCurrDate(),
            removedAt: null,
            from,
            to
        }
        emailService.save(email)
        onToggleNewEmail()
    }

    function onRemove(email) {
        if(!email.removedAt) {
            email.removedAt = Date.now()
            emailService.save(email)
        }else emailService.remove(email.id)
    }

    function onSearch(search){
        setSearchBy(search)
    }

    return (
        <section className="email-index">
            <EmailHeader onToggleFilter={onToggleFilter} onSearch={onSearch} />
            <div className="flex">
                <EmailsFilter onNewEmail={onToggleNewEmail} filterBy={filterBy} isOpen={isFilterOpen} />
                <EmailList emails={emails} onStar={onStar} onRemove={onRemove} />
            </div>
            {isNewEmail && <NewEmail onClose={onToggleNewEmail} onSend={onSend} />}
        </section>
    )
}

