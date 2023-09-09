import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/async-storage.service.js";

export const bookService = {
  remove,
  get,
  getAll,
  query,
  getDefaultFilter,
  getEmptyBook,
  save,
  addReview,
  deleteReview,
  getEmptyReview,
  getNeighborBookId,
  createBook,
};

const BOOK_KEY = "bookDb";
const authors = [
  "Jane Austen",
  "Charles Dickens",
  "Arthur Conan Doyle",
  "Victor Hugo",
  "Jules Verne",
  "Ernest Hemingway",
  "Charlotte Brontë",
];

_createBooks();

function query(filter = { title: "", price: 0 }) {
  return storageService.query(BOOK_KEY).then((books) => {
    if (filter.title) {
      const regex = new RegExp(filter.title, "i");
      books = books.filter((book) => regex.test(book.title));
    }
    if (filter.price) {
      books = books.filter((book) => book.listPrice.amount >= filter.price);
    }
    return books;
  });
}

function getDefaultFilter() {
  return { title: "", price: 0 };
}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId);
}

function getAll() {
  return storageService.query(BOOK_KEY);
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId);
}

function getEmptyBook() {
  return {
    id: null,
    title: "",
    subtitle: "",
    authors: [],
    publishedDate: 1900,
    description: "",
    pageCount: 0,
    categories: [],
    thumbnail: "../assets/book-imgs/16.jpg",
    language: "en",
    reviews: [],
    listPrice: {
      amount: 0,
      currencyCode: "EUR",
      isOnSale: false,
    },
  };
}

function save(book, isEdit) {
  if (isEdit) {
    return storageService.put(BOOK_KEY, book);
  } else {
    return storageService.post(BOOK_KEY, book);
  }
}
function addReview(bookId, review) {
  review = { ...review };
  review.id = utilService.makeId();
  return get(bookId)
    .then((book) => {
      if (book.reviews) book.reviews.push(review);
      else book.reviews = [review];
      return book;
    })
    .then((book) => storageService.put(BOOK_KEY, book));
}

function deleteReview(bookId, reviewId) {
  return get(bookId).then((book) => {
    book.reviews = book.reviews.filter((review) => review.id !== reviewId);
    return storageService.put(BOOK_KEY, book);
  });
}

function getEmptyReview() {
  return {
    fullname: "",
    rating: "",
    readAt: "",
  };
}
function getNeighborBookId(bookId, distance) {
  return storageService.query(BOOK_KEY).then((books) => {
    var idx = books.findIndex((book) => book.id === bookId);
    if (idx === books.length - 1 && distance > 0) idx = -distance;
    if (idx === 0 && distance < 0) idx = books.length - (distance + 1);
    return books[idx + distance].id;
  });
}

async function _createBooks() {
  let books = await storageService.query(BOOK_KEY);
  if (!books || !books.length) {
    books = [
      {
        id: utilService.makeId(),
        title: "metus hendrerit",
        subtitle: "mi est eros convallis auctor arcu dapibus himenaeos",
        authors: ["Barbara Cartland"],
        publishedDate: 1999,
        description:
          "placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse",
        pageCount: 713,
        categories: ["Computers", "Hack"],
        thumbnail: `../../assets/book-imgs/${utilService.getRandomIntInclusive(
          1,
          19
        )}.jpeg`,
        language: "en",
        reviews: [],
        listPrice: {
          amount: 109,
          currencyCode: "EUR",
          isOnSale: false,
        },
      },
      {
        id: utilService.makeId(),
        title: "morbi",
        subtitle: "lorem euismod dictumst inceptos mi",
        authors: ["Barbara Cartland"],
        publishedDate: 1978,
        description:
          "aliquam pretium lorem laoreet etiam odio cubilia iaculis placerat aliquam tempor nisl auctor",
        pageCount: 129,
        categories: ["Computers", "Hack"],
        thumbnail: `../../assets/book-imgs/${utilService.getRandomIntInclusive(
          1,
          19
        )}.jpeg`,
        language: "sp",
        reviews: [],
        listPrice: {
          amount: 44,
          currencyCode: "EUR",
          isOnSale: true,
        },
      },
      {
        id: utilService.makeId(),
        title: "at viverra venenatis",
        subtitle: "gravida libero facilisis rhoncus urna etiam",
        authors: ["Dr. Seuss"],
        publishedDate: 1999,
        description:
          "lorem molestie ut euismod ad quis mi ultricies nisl cursus suspendisse dui tempor sit suscipit metus etiam euismod tortor sagittis habitant",
        pageCount: 972,
        categories: ["Computers", "Hack"],
        thumbnail: `../../assets/book-imgs/${utilService.getRandomIntInclusive(
          1,
          19
        )}.jpeg`,
        language: "he",
        reviews: [],
        listPrice: {
          amount: 108,
          currencyCode: "ILS",
          isOnSale: false,
        },
      },
      {
        id: utilService.makeId(),
        title: "dictum",
        subtitle:
          "augue eu consectetur class curabitur conubia ligula in ullamcorper",
        authors: ["Danielle Steel"],
        publishedDate: 1978,
        description:
          "interdum inceptos mauris habitant primis neque tempus lacus morbi auctor cras consectetur euismod vehicula neque netus enim vivamus augue molestie imperdiet tincidunt aliquam",
        pageCount: 303,
        categories: ["Computers", "Hack"],
        thumbnail: `../../assets/book-imgs/${utilService.getRandomIntInclusive(
          1,
          19
        )}.jpeg`,
        language: "en",
        reviews: [],
        listPrice: {
          amount: 30,
          currencyCode: "EUR",
          isOnSale: true,
        },
      },
      {
        id: utilService.makeId(),
        title: "sem himenaeos aptent",
        subtitle: "interdum per habitasse luctus purus est",
        authors: ["Dr. Seuss"],
        publishedDate: 2011,
        description:
          "et vehicula faucibus amet accumsan lectus cras nulla cubilia arcu neque litora mi habitasse quis amet augue facilisis sed",
        pageCount: 337,
        categories: ["Computers", "Hack"],
        thumbnail: `../../assets/book-imgs/${utilService.getRandomIntInclusive(
          1,
          19
        )}.jpeg`,
        language: "sp",
        reviews: [],
        listPrice: {
          amount: 19,
          currencyCode: "USD",
          isOnSale: false,
        },
      },
      {
        id: utilService.makeId(),
        title: "mi ante posuere",
        subtitle:
          "sapien curae consectetur ultrices fringilla blandit ipsum curae faucibus",
        authors: ["Leo Tolstoy"],
        publishedDate: 1978,
        description:
          "senectus habitant nam imperdiet nostra elit dapibus nisl adipiscing in",
        pageCount: 748,
        categories: ["Computers", "Hack"],
        thumbnail: `../../assets/book-imgs/${utilService.getRandomIntInclusive(
          1,
          19
        )}.jpeg`,
        language: "en",
        reviews: [],
        listPrice: {
          amount: 91,
          currencyCode: "USD",
          isOnSale: true,
        },
      },
      {
        id: utilService.makeId(),
        title: "non",
        subtitle:
          "leo tortor per dapibus mattis ut conubia porttitor ligula viverra",
        authors: ["Leo Tolstoy"],
        publishedDate: 2011,
        description:
          "nec scelerisque id cursus platea sit ullamcorper bibendum ultrices tempus ante mi aliquet cras tortor dapibus dictum scelerisque",
        pageCount: 65,
        categories: ["Computers", "Hack"],
        thumbnail: `../../assets/book-imgs/${utilService.getRandomIntInclusive(
          1,
          19
        )}.jpeg`,
        language: "he",
        reviews: [],
        listPrice: {
          amount: 90,
          currencyCode: "USD",
          isOnSale: false,
        },
      },
      {
        id: utilService.makeId(),
        title: "tristique",
        subtitle: "consectetur a eu tincidunt condimentum amet nisi",
        authors: ["Dr. Seuss"],
        publishedDate: 1999,
        description:
          "magna quisque venenatis laoreet purus in semper habitant proin pellentesque sed egestas cursus faucibus nam enim id sit mi ligula risus curabitur senectus curabitur sodales fames sem",
        pageCount: 299,
        categories: ["Computers", "Hack"],
        thumbnail: `../../assets/book-imgs/${utilService.getRandomIntInclusive(
          1,
          19
        )}.jpeg`,
        language: "he",
        reviews: [],
        listPrice: {
          amount: 176,
          currencyCode: "EUR",
          isOnSale: false,
        },
      },
      {
        id: utilService.makeId(),
        title: "urna ornare gravida",
        subtitle:
          "sem vestibulum semper convallis pharetra tempor himenaeos ut",
        authors: ["Jin Yong"],
        publishedDate: 2011,
        description:
          "porttitor nisl sodales id eu tellus venenatis laoreet auctor dictumst nulla",
        pageCount: 803,
        categories: ["Computers", "Hack"],
        thumbnail: `../../assets/book-imgs/${utilService.getRandomIntInclusive(
          1,
          19
        )}.jpeg`,
        language: "sp",
        reviews: [],
        listPrice: {
          amount: 116,
          currencyCode: "USD",
          isOnSale: true,
        },
      },
      {
        id: utilService.makeId(),
        title: "consequat neque volutpat",
        subtitle:
          "vel quis taciti fermentum feugiat ullamcorper curae praesent",
        authors: ["Dr. Seuss"],
        publishedDate: 1978,
        description:
          "curabitur bibendum in dolor neque magna phasellus arcu nulla cubilia senectus maecenas ullamcorper neque accumsan facilisis dictumst ornare",
        pageCount: 891,
        categories: ["Computers", "Hack"],
        thumbnail: `../../assets/book-imgs/${utilService.getRandomIntInclusive(
          1,
          19
        )}.jpeg`,
        language: "en",
        reviews: [],
        listPrice: {
          amount: 145,
          currencyCode: "EUR",
          isOnSale: false,
        },
      },
      {
        id: utilService.makeId(),
        title: "risus",
        subtitle: "pretium bibendum pharetra curabitur quisque dictumst",
        authors: ["Danielle Steel"],
        publishedDate: 2018,
        description:
          "auctor amet nostra luctus molestie proin platea cubilia netus sed purus egestas a primis eu tristique interdum litora lorem venenatis mattis senectus",
        pageCount: 86,
        categories: ["Computers", "Hack"],
        thumbnail: `../../assets/book-imgs/${utilService.getRandomIntInclusive(
          1,
          19
        )}.jpeg`,
        language: "sp",
        reviews: [],
        listPrice: {
          amount: 157,
          currencyCode: "ILS",
          isOnSale: true,
        },
      },
      {
        id: utilService.makeId(),
        title: "interdum etiam vulputate",
        subtitle: "velit sapien eget tincidunt nunc tortor",
        authors: ["Danielle Steel"],
        publishedDate: 2018,
        description:
          "aenean mauris porta netus accumsan turpis etiam vestibulum vivamus sagittis nullam nec tellus quam mattis est pellentesque nisi litora sit ad",
        pageCount: 882,
        categories: ["Computers", "Hack"],
        thumbnail: `../../assets/book-imgs/${utilService.getRandomIntInclusive(
          1,
          19
        )}.jpeg`,
        language: "sp",
        reviews: [],
        listPrice: {
          amount: 57,
          currencyCode: "USD",
          isOnSale: true,
        },
      },
      {
        id: utilService.makeId(),
        title: "sagittis justo",
        subtitle: "etiam primis proin praesent placerat nisi fermentum nisi",
        authors: ["Agatha Christie"],
        publishedDate: 2011,
        description:
          "nec faucibus arcu suspendisse tempus potenti lobortis aliquam quisque augue integer consectetur etiam ultrices curabitur tristique metus",
        pageCount: 598,
        categories: ["Computers", "Hack"],
        thumbnail: `../../assets/book-imgs/${utilService.getRandomIntInclusive(
          1,
          19
        )}.jpeg`,
        language: "en",
        reviews: [],
        listPrice: {
          amount: 167,
          currencyCode: "ILS",
          isOnSale: false,
        },
      },
      {
        id: utilService.makeId(),
        title: "quam ullamcorper himenaeos",
        subtitle: "ut placerat eu dapibus sapien sodales laoreet",
        authors: ["Danielle Steel"],
        publishedDate: 1999,
        description:
          "etiam nec aliquam euismod platea vel laoreet quisque condimentum sapien neque ut aliquam torquent in nam",
        pageCount: 608,
        categories: ["Computers", "Hack"],
        thumbnail: `../../assets/book-imgs/${utilService.getRandomIntInclusive(
          1,
          19
        )}.jpeg`,
        language: "he",
        reviews: [],
        listPrice: {
          amount: 150,
          currencyCode: "USD",
          isOnSale: true,
        },
      },
      {
        id: utilService.makeId(),
        title: "quis",
        subtitle: "suscipit turpis etiam turpis libero lobortis",
        authors: ["Jin Yong"],
        publishedDate: 2011,
        description:
          "etiam pretium urna fusce lobortis curae viverra aptent metus semper nisi litora feugiat elementum purus nunc consequat lorem ultricies non primis phasellus sociosqu donec dolor",
        pageCount: 583,
        categories: ["Computers", "Hack"],
        thumbnail: `../../assets/book-imgs/${utilService.getRandomIntInclusive(
          1,
          19
        )}.jpeg`,
        language: "en",
        reviews: [],
        listPrice: {
          amount: 58,
          currencyCode: "ILS",
          isOnSale: true,
        },
      },
      {
        id: utilService.makeId(),
        title: "aliquam aliquet dapibus",
        subtitle:
          "neque eu purus euismod placerat adipiscing odio egestas consequat",
        authors: ["Leo Tolstoy"],
        publishedDate: 2011,
        description:
          "dolor morbi malesuada eleifend purus taciti sit interdum aliquet commodo ut libero tincidunt",
        pageCount: 497,
        categories: ["Computers", "Hack"],
        thumbnail: `../../assets/book-imgs/${utilService.getRandomIntInclusive(
          1,
          19
        )}.jpeg`,
        language: "en",
        reviews: [],
        listPrice: {
          amount: 78,
          currencyCode: "USD",
          isOnSale: false,
        },
      },
      {
        id: utilService.makeId(),
        title: "class",
        subtitle:
          "elit enim ultricies amet imperdiet a molestie class elementum venenatis",
        authors: ["Danielle Steel"],
        publishedDate: 1999,
        description:
          "rhoncus odio netus consectetur aenean hendrerit massa scelerisque elementum aptent lobortis pharetra maecenas quam nulla volutpat turpis non habitasse aenean ante sodales lobortis quisque libero imperdiet gravida eleifend nulla",
        pageCount: 804,
        categories: ["Computers", "Hack"],
        thumbnail: `../../assets/book-imgs/${utilService.getRandomIntInclusive(
          1,
          19
        )}.jpeg`,
        reviews: [],
        language: "en",
        listPrice: {
          amount: 118,
          currencyCode: "ILS",
          isOnSale: false,
        },
      },
      {
        id: utilService.makeId(),
        title: "vitae",
        subtitle: "class habitant at commodo semper ligula a bibendum",
        authors: ["Leo Tolstoy"],
        publishedDate: 1999,
        description:
          "himenaeos quis iaculis orci libero egestas quam varius primis erat lacus facilisis blandit dictum tristique interdum litora quisque purus senectus pretium purus",
        pageCount: 231,
        categories: ["Computers", "Hack"],
        thumbnail: `../../assets/book-imgs/${utilService.getRandomIntInclusive(
          1,
          19
        )}.jpeg`,
        language: "he",
        reviews: [],
        listPrice: {
          amount: 60,
          currencyCode: "EUR",
          isOnSale: false,
        },
      },
      {
        id: utilService.makeId(),
        title: "rhoncus vivamus",
        subtitle:
          "nullam class risus amet senectus scelerisque etiam curabitur",
        authors: ["Agatha Christie"],
        publishedDate: 1978,
        description:
          "torquent in et id lacus vivamus aptent cursus erat integer venenatis risus ac ante quam etiam euismod feugiat risus suscipit rhoncus pharetra quisque felis",
        pageCount: 652,
        categories: ["Computers", "Hack"],
        thumbnail: `../../assets/book-imgs/${utilService.getRandomIntInclusive(
          1,
          19
        )}.jpeg`,
        language: "he",
        reviews: [],
        listPrice: {
          amount: 110,
          currencyCode: "USD",
          isOnSale: true,
        },
      },
      {
        id: utilService.makeId(),
        title: "donec mi ullamcorper",
        subtitle:
          "varius malesuada augue molestie sollicitudin faucibus mi eu tempus",
        authors: ["William Shakespeare"],
        publishedDate: 2011,
        description:
          "aliquet euismod mi vivamus bibendum donec etiam quisque iaculis ullamcorper est sed",
        pageCount: 904,
        categories: ["Computers", "Hack"],
        thumbnail: `../../assets/book-imgs/${utilService.getRandomIntInclusive(
          1,
          19
        )}.jpeg`,
        language: "sp",
        reviews: [],
        listPrice: {
          amount: 186,
          currencyCode: "ILS",
          isOnSale: true,
        },
      },
    ];
    utilService.saveToStorage(BOOK_KEY, books);
  }
}

function createBook(title, amount) {
  return {
    id: utilService.makeId(),
    title: title.toUpperCase(),
    subtitle: utilService.makeLorem(utilService.getRandomIntInclusive(2, 6)),
    authors: [
      utilService.getRandomAuthor(authors),
      utilService.getOneOfTheTwo(utilService.getRandomAuthor(authors), ""),
    ],
    publishedDate: utilService.getRandomYear(),
    description: utilService.makeLorem(),
    pageCount: utilService.getRandomPageCount(),
    categories: ["Classic"],
    thumbnail: `../../assets/book-imgs/${utilService.getRandomIntInclusive(1, 19)}.jpeg`,
    language: utilService.getOneOfTheTwo("en", "span"),
    reviews: [],
    listPrice: {
      amount,
      currencyCode: utilService.getOneOfTheTwo("USD", "EUR"),
      isOnSale: utilService.getOneOfTheTwo(true, false),
    },
  };
}
