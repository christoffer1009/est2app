#! /usr/bin/env node

console.log(
  "This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var { Thread } = require("./api/models/thread");
var { Author } = require("./api/models/author");
var { Board } = require("./api/models/board");
var { Reply } = require("./api/models/reply");

var mongoose = require("mongoose");
var mongoDB = `mongodb+srv://admin:MdZOih5CGYWX2tCe@cluster0.u1mux.mongodb.net/myDB?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var authors = [];
var boards = [];
var threads = [];
var replies = [];

function authorCreate(firstName, lastName, cb) {
  authordetail = {
    name: { firstName: firstName, lastName: lastName },
  };

  var author = new Author(authordetail);

  author.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Author: " + author);
    authors.push(author);
    cb(null, author);
  });
}

function boardCreate(name, cb) {
  var board = new Board({ name: name, threads: [] });

  board.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New board: " + board);
    boards.push(board);
    cb(null, board);
  });
}

function threadCreate(title, text, author, board, cb) {
  threaddetail = {
    title: title,
    text: text,
    author: author,
    replies: [],
  };
  if (board != false) threaddetail.board = board;

  var thread = new Thread(threaddetail);
  thread.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New thread: " + thread);
    threads.push(thread);
    cb(null, thread);
  });
}

function replyCreate(thread, text, author, board, cb) {
  replydetail = {
    thread: thread,
    author: author,
    text: text,
    board: board,
  };

  var reply = new Reply(replydetail);
  reply.save(function (err) {
    if (err) {
      console.log("ERROR CREATING reply: " + reply);
      cb(err, null);
      return;
    }
    console.log("New reply: " + reply);
    replies.push(reply);
    cb(null, thread);
  });
}

function createBoardsAuthors(cb) {
  async.series(
    [
      function (callback) {
        authorCreate("Patrick", "Rothfuss", callback);
      },
      function (callback) {
        authorCreate("Ben", "Bova", callback);
      },
      function (callback) {
        authorCreate("Isaac", "Asimov", callback);
      },
      function (callback) {
        authorCreate("Bob", "Billings", callback);
      },
      function (callback) {
        authorCreate("Jim", "Jones", callback);
      },
      function (callback) {
        boardCreate("Fantasy", callback);
      },
      function (callback) {
        boardCreate("Science Fiction", callback);
      },
      function (callback) {
        boardCreate("French Poetry", callback);
      },
    ],
    // optional callback
    cb
  );
}

function createThreads(cb) {
  async.parallel(
    [
      function (callback) {
        threadCreate(
          "The Name of the Wind (The Kingkiller Chronicle, #1)",
          "I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.",

          authors[0],
          boards[0],
          callback
        );
      },
      function (callback) {
        threadCreate(
          "The Wise Man's Fear (The Kingkiller Chronicle, #2)",
          "Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.",

          authors[0],
          boards[0],
          callback
        );
      },
      function (callback) {
        threadCreate(
          "The Slow Regard of Silent Things (Kingkiller Chronicle)",
          "Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.",

          authors[0],
          boards[0],
          callback
        );
      },
      function (callback) {
        threadCreate(
          "Apes and Angels",
          "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...",

          authors[1],
          boards[1],
          callback
        );
      },
      function (callback) {
        threadCreate(
          "Death Wave",
          "In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...",

          authors[1],
          boards[1],
          callback
        );
      },
      function (callback) {
        threadCreate(
          "Test Book 1",
          "Summary of test book 1",

          authors[4],
          boards[1],
          callback
        );
      },
      function (callback) {
        threadCreate(
          "Test Book 2",
          "Summary of test book 2",

          authors[4],
          boards[2],
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createReplies(cb) {
  async.parallel(
    [
      function (callback) {
        replyCreate(
          threads[0],
          " This is a reply!",
          authors[0],
          boards[0],
          callback
        );
      },

      function (callback) {
        replyCreate(
          threads[0],
          "This is a message reply",
          authors[0],
          boards[0],
          callback
        );
      },
      function (callback) {
        replyCreate(
          threads[0],
          "Just Another reply.",
          authors[1],
          boards[0],
          callback
        );
      },
      function (callback) {
        replyCreate(
          threads[1],
          "Answering the question",
          authors[1],
          boards[1],
          callback
        );
      },
      function (callback) {
        replyCreate(
          threads[1],
          "Implying this is not a reply",
          authors[2],
          boards[1],
          callback
        );
      },
      function (callback) {
        replyCreate(
          threads[1],
          "Another reply",
          authors[3],
          boards[1],
          callback
        );
      },
    ],
    // Optional callback
    cb
  );
}

async.series(
  [createBoardsAuthors, createThreads, createReplies],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("OK");
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
