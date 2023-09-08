import { utilService } from '../../../services/util.service.js'
import { emailService } from '../services/email.service.js'
import { EmailHeader } from '../cmps/EmailHeader.jsx'
import { EmailsFilter } from '../cmps/EmailsFilter.jsx'
import { EmailList } from '../cmps/EmailList.jsx'
import { NewEmail } from '../cmps/NewEmail.jsx'
import { EmailData } from "../views/EmailData.jsx"

const { useState, useEffect } = React
const { useParams } = ReactRouterDOM

export function EmailIndex() {
    const [emails, setEmails] = useState(null)
    const [emailsMap, setEmailsMap] = useState({ unReadCount: null, draftCount: null })
    const [filterBy, setFilterBy] = useState('inbox')
    const [searchBy, setSearchBy] = useState('')
    const [isNewEmail, setIsNewEmail] = useState(false)
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [currDraft, setCurrDraft] = useState({})
    const params = useParams()

    useEffect(updateEmails, [params.filter, searchBy])

    function updateEmails() {
        const { email: userAddress } = emailService.getUser()
        setFilterBy(params.filter);
        emailService.query(searchBy).then(emails => {
            const unReadCount = emails.filter(email => !email.isRead && email.from !== userAddress && !email.removedAt && !email.isDraft).length
            const draftCount = emails.filter(email => email.isDraft && !email.removedAt).length
            setEmailsMap({unReadCount, draftCount})
            switch (params.filter) {
                case 'inbox':
                    emails = emails.filter(email => email.from !== userAddress && !email.removedAt && !email.isDraft)
                    break
                case 'starred':
                    emails = emails.filter(email => email.isStar && !email.removedAt)
                    break
                case 'send':
                    emails = emails.filter(email => email.from === userAddress && !email.removedAt && !email.isDraft)
                    break
                case 'draft':
                    emails = emails.filter(email => email.isDraft && !email.removedAt)
                    break
                case 'remove':
                    emails = emails.filter(email => email.removedAt)
                    break

                default:
                    break
            }
            setEmails(emails)
        })

    }

    function onStar(email) {
        email.isStar = !email.isStar
        emailService.save(email).then(updateEmails)
    }

    function onToggleFilter() {
        setIsFilterOpen(!isFilterOpen)
    }

    function onToggleNewEmail() {
        setCurrDraft({})
        setIsNewEmail(!isNewEmail)
    }

    function onSend(newEmail) {
        const { email: from } = emailService.getUser()
        const { subject, body, to } = newEmail
        const email = {
            subject,
            body,
            isRead: false,
            isStar: false,
            sentAt: utilService.getCurrDate(),
            removedAt: null,
            from,
            to
        }
        emailService.save(email).then(updateEmails)
        onToggleNewEmail()
    }

    function saveDraft(newEmail, draftId) {
        const { subject, body, to } = newEmail
        const { email: from } = emailService.getUser()
        const draft = {
            id: draftId,
            isDraft: true,
            subject,
            body,
            isRead: false,
            isStar: false,
            sentAt: utilService.getCurrDate(),
            removedAt: null,
            from,
            to
        }
        emailService.saveDraft(draft, draftId)
    }

    function onDraft(draft) {
        setCurrDraft(draft)
        setIsNewEmail(true)
    }

    function onRemove(email) {
        if (!email.removedAt) {
            email.removedAt = Date.now()
            emailService.save(email).then(updateEmails)
        } else emailService.remove(email.id).then(updateEmails)
    }

    function onSearch(search) {
        setSearchBy(search)
    }


    return (
        <section className="email-index">
            <EmailHeader onToggleFilter={onToggleFilter} onSearch={onSearch} />
            <div className="flex">
                <EmailsFilter onNewEmail={onToggleNewEmail} filterBy={filterBy} isOpen={isFilterOpen} emailsMap={emailsMap}/>
                {!params.emailId && <EmailList emails={emails} onStar={onStar} onRemove={onRemove} onDraft={onDraft} isDisplayTo={(filterBy === 'send' || filterBy === 'draft' ? true : false)} />}
                {params.emailId && <EmailData onStar={onStar} onRemove={onRemove} />}

            </div>
            {isNewEmail && <NewEmail onClose={onToggleNewEmail} onSend={onSend} saveDraft={saveDraft} draft={currDraft} />}
        </section>
    )
}

