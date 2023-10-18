# WHY #

Quicken disabled the services that provides quotes to "Qucken 2017".

The node scripts here use a rapidapi endpoint to fetch and massage quotes into
QIF format, which can then be imported into Quicken 2017 to update daily stock quotes.

# FIRST #

We have to get quotes from somewhere. The users of rapidapi have created a free service
that will provide an API that can be called to get realtime-ish quotes.

You will need to create a rapidapi account, and then subscribe to the _YH Finance_
service there: https://rapidapi.com/apidojo/api/yh-finance

As long as you're only calling
the endpoint a few times per day, you will be in the _free_ category for the _YH Finance_ endpoint.

Once subscribed, you will need the unique-to-you api key from your rapidapi dashboard.

Copy/paste that apikey into the _apikey.json_ file.

```
  ...
 'X-RapidAPI-Key': 'YOUR-KEY-HERE-SEE-README',
 ...
```

# INSTALL DEPENDENCIES #

```$ npm i```

# MODIFY THE SYMBOLS FILE #

Edit the _symbols.json_ file to include your desired portfolio of symbols.

# USAGE #

```$ node quotes.cjs```

This will simply spit out a QIF-format datastream

# TO CREATE A QUICKEN2017-IMPORTABLE QIF #

```$ node quotes.cjs > import_me.qif```

# EXTRA #

Piping the _import_me.qif_ through the `q2csv.cjs` script will produce SQL to maintain a quotes table:

```$ cat ./import_me.qif | node ./q2csv.cjs | mysql -u root```

See the _stock.quote.sql_ file for the expected schema.
