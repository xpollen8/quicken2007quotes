* WHY *

Apparently, Quicken has disabled the services that provides quites to "Qucken 2017".
This node script builds upon the excellent "console-quotes" to capture and massage
its output into QIF format, which can then be imported into Quicken 2017 to update
daily stock quotes.

* FIRST *

Install "console-quotes"

```$ npm install -g console-quotes```

* BUILD *

```$ npm i```

* USAGE *

```$ node quotes.js IBM GE IWM```

* TO CREAT QIF *

```$ node quotes.js IBM GE IWM > import_me.qif```

* SHORT-CUT *

Edit the _quotes.sh_ shell script to include your desired portfolio of symbols,
and then run it daily:

```$ sh quotes.sh```
