use stock;

CREATE TABLE `quote` (
  `quote_id` int unsigned NOT NULL AUTO_INCREMENT,
  `symbol` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `open` float(8,4) NOT NULL,
  `high` float(8,4) NOT NULL,
  `low` float(8,4) NOT NULL,
  `close` float(8,4) NOT NULL,
  `volume` int unsigned NOT NULL,
  PRIMARY KEY (`quote_id`),
  UNIQUE KEY `idx1` (`symbol`,`date`)
) ENGINE=MyISAM AUTO_INCREMENT=368203 DEFAULT CHARSET=latin1;
