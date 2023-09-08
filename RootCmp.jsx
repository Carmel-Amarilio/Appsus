const { Route, Routes } = ReactRouterDOM;
const Router = ReactRouterDOM.HashRouter;
const { useState, useEffect } = React;

import { AppHeader } from "./cmps/AppHeader.jsx";
import { About } from "./views/About.jsx";
import { Home } from "./views/Home.jsx";
import { EmailIndex } from "./apps/mail/views/EmailIndex.jsx";
import { NoteIndex } from "./apps/note/views/NoteIndex.jsx";

export function App() {
  const [isBackdrop, setIsBackdrop] = useState(false);

  useEffect(() => {
    const classList = document.body.classList;

    isBackdrop
      ? classList.add("overflow-none")
      : classList.remove("overflow-none");
  }, [isBackdrop]);

  return (
    <Router>
      <section className={`app`}>
        <AppHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/email" element={<EmailIndex />} />
          <Route path="/email/:filter" element={<EmailIndex />} />

          <Route
            path="/note"
            element={
              <NoteIndex setBackdrop={(value) => setIsBackdrop(value)} />
            }
          />
        </Routes>
      </section>
    </Router>
  );
}
