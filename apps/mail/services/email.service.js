import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const emails_KEY = 'emailsDB'
_createEmails()

export const emailService = {
    query,
    get,
    remove,
    save,
    getEmptyEmail,
}

function query(filterBy) {
    return storageService.query(emails_KEY)
        .then(emails => {
            // if (filterBy.txt) {
            //   const regex = new RegExp(filterBy.txt, 'i')
            //   emails = emails.filter(email => regex.test(email.title))
            // }
            // if (filterBy.minPrice) {
            //   emails = emails.filter(email => email.listPrice.amount >= filterBy.minPrice)
            // }

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

function getEmptyEmail() {
    return {
        id: '',
        subject: '',
        body: '',
        isRead: false,
        sentAt: null,
        removedAt: null,
        from: '',
        to: ''
    }
}


function _createEmails() {
    let emails = utilService.loadFromStorage(emails_KEY)
    if (!emails || !emails.length) {
        emails = []
        for (let i = 0; i < 10; i++) {
            emails.push(_createEmail())
        }
        utilService.saveToStorage(emails_KEY, emails)
    }
} function _createEmail() {
    const email = getEmptyEmail()
    email.id = utilService.makeId()
    email.subject = utilService.makeLorem(3)
    email.body = utilService.makeLorem(10)
    email.sentAt = Date()
    email.from = `${utilService.makeLorem(1)}@appsus.com`
    email.to = `${utilService.makeLorem(1)}@appsus.com`
    return email
}