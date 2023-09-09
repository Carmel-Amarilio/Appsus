import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const emails_KEY = 'emailsDB'
const loggedInUser = {
    email: 'user123@appsus.com',
    fullname: 'Mahatma Appsus'
}
_createEmails()

export const emailService = {
    query,
    get,
    remove,
    save,
    saveDraft,
    getEmptyEmail,
    getUser,
}

function query(search) {
    return storageService.query(emails_KEY)
        .then(emails => {
            const regex = new RegExp(search, 'i')
            emails = emails.filter(email =>
                regex.test(email.subject) ||
                regex.test(email.body) ||
                regex.test(email.from) ||
                regex.test(email.to)
            )
            return emails
        })
}

function get(mailId) {
    return storageService.get(emails_KEY, mailId)
        .then(email => email

            // _setNextPrevmailId(email)
        )
}

function remove(mailId) {
    return storageService.remove(emails_KEY, mailId)
}

function save(email) {
    if (email.id) {
        return storageService.put(emails_KEY, email)
    } else {
        return storageService.post(emails_KEY, email)
    }
}

function saveDraft(newDraft, draftId) {
    let emails = utilService.loadFromStorage(emails_KEY)
    const draft = emails.filter(email => email.id === draftId)
    if (draft.length) {
        return storageService.put(emails_KEY, newDraft )
    } else {
        return storageService.post(emails_KEY, newDraft, draftId)
    }
}

function getEmptyEmail() {
    return {
        id: '',
        subject: '',
        body: '',
        isRead: false,
        isStar: false,
        sentAt: null,
        removedAt: null,
        from: '',
        to: ''
    }
}

function getUser() {
    return loggedInUser
}


function _createEmails() {
    let emails = utilService.loadFromStorage(emails_KEY)
    if (!emails || !emails.length) {
        emails = []
        for (let i = 0; i < 100; i++) {
            emails.push(_createEmail())
        }
        emails.push(_createEmail('user'))
        utilService.saveToStorage(emails_KEY, emails)
    }
}

function _createEmail(name = utilService.getRandName()) {
    const email = getEmptyEmail()
    email.id = utilService.makeId()
    email.subject = utilService.makeLorem(3)
    email.body = utilService.makeLorem(10)
    email.sentAt = utilService.getRandomDate(new Date("2023-01-01"), new Date("2023-9-1"))
    email.from = `${name}@appsus.com`
    email.to = loggedInUser.email
    console.log(utilService.getRandomDate(new Date("2022-01-01"), new Date("2023-9-1")));
    return email

}