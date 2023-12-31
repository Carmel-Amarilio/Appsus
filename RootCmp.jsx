const { Route, Routes } = ReactRouterDOM;
const Router = ReactRouterDOM.HashRouter;

import { AppHeader } from "./cmps/AppHeader.jsx";
import { About } from "./views/About.jsx";
import { Home } from "./views/Home.jsx";
import { EmailIndex } from "./apps/mail/views/EmailIndex.jsx";
import { NoteIndex } from "./apps/note/views/NoteIndex.jsx";
import { BookDetails } from "./apps/book/views/book-details.jsx";
import { BookIndex } from "./apps/book/views/book-index.jsx";
import { BookEdit } from "./apps/book/views/book-edit.jsx";
import { AddBookGoogle } from './apps/book/views/AddBookGoogle.jsx'

export function App() {
    return (
        <Router>
            <section className={`app`}>
                <AppHeader />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/email" element={<EmailIndex />} />
                    <Route path="/email/:filter" element={<EmailIndex />} />
                    <Route path="/email/:fil/:emailId" element={<EmailIndex />} />

                    <Route path="/note" element={<NoteIndex />} />

                    <Route path="/book" element={<BookIndex />} />
                    <Route path="/book/:bookId" element={<BookDetails />} />
                    <Route path="/book/edit/:bookId" element={<BookEdit />} />
                    <Route path="/book/addBook" element={<AddBookGoogle />} />

                </Routes>
            </section>
        </Router>
    );
}
