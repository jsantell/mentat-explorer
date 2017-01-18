# Mentat Explorer Ideas

* **Query Performance**: Some additional data can be attached to query results with performance data of the underlying SQL queries, for example.
* **Transactions View**: Visualising transactions over time, inspection of individual transactions, filter by datum?
* **Database Overview**: We'll have schema views, but we could expose other internals, similar to [MongoDB Compass](https://www.mongodb.com/products/compass), visualizing size or range of values, or translating datums to filesize ("DB is 40% user data").
* **Electron App**: An installable version of Mentat Explorer, which, if bundled or available, could set up the Mentat server and the concept of a connection is tied to a mentat.db file, rather than an ephemeral localhost address. Would/could still use the HTTP connection, but this way the tool knows about file paths to a database and becomes more of a "load a mentat.db file" type of a tool, or a GUI for opening a mentat.db file, for example.
