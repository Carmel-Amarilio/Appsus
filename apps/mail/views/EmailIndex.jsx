import { emailService } from '../services/email.service.js'

const { useState, useEffect } = React

export function EmailIndex() {
    const [emails, setEmails] = useState(null)

    useEffect(() => {
        emailService.query().then(setEmails)
    }, [])

    if (!emails) return <div>loading...</div>
    return (
        <section className="email-index">
            {console.log(emails)}
            {/* <EmailsFilter />
            <EmailList emails={emails} /> */}
            <div>mail app</div>
        </section>
    )
}

