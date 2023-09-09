import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service"

const { useNavigate } = ReactRouterDOM
const { useState } = React

export function AddBookGoogle() {
    const navigate = useNavigate()
    const [timeOutId, setTimeOutId] = useState(null)
    const [booksList, setBooksList] = useState([])

    function handleChange({ target }) {
        clearTimeout(timeOutId)
        const val = target.value
        setTimeOutId(setTimeout((() => getBookGoogle(val)), 2000))
    }

    function getBookGoogle(title) {
        axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=effective%${title}`)
            .then(res => setBooksList(res.data.items))
    }

    function onAddBook(book) {
        const newBook = {
            title: book.volumeInfo.title,
            subtitle: book.volumeInfo.subtitle,
            authors: book.volumeInfo.authors,
            publishedDate: book.volumeInfo.publishedDate,
            description: "",
            pageCount: book.volumeInfo.pageCount,
            categories: book.volumeInfo.categories,
            language: book.volumeInfo.language,
            listPrice: {
                amount: 0,
                isOnSale: false
            },
        }

        bookService.save(newBook, false)
            .then(() => {
                // showSuccessMsg('book saved')
                navigate('/book')
            })
            // .catch(err => {
            //     console.log(err)
            //     showErrorMsg('Failed to save ')
            // })

    }

    return (
        <section className="add-book-google book-page">
            <form >
                <input onChange={handleChange} type="text" placeholder="search in google..." />
            </form>
            {console.log(booksList)}
            <ul>
                {booksList.map(book =>
                    <li key={book.id}>
                        <p>{book.volumeInfo.title}</p>
                        <button onClick={() => onAddBook(book)}><i className="fa-regular fa-square-plus"></i></button>
                    </li>
                )}
            </ul>
        </section>
    )
}
