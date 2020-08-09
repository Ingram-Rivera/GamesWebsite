<?php 
class Database extends PDO
{
    /* Replace with real DB details when LIVE */
    private $host   = 'localhost:3306';
    private $user   = 'root';
    private $pass   = 'root';
    private $dbname = 'uat_game_app';

    public function __construct($dsn = null, $user = null, $pass = null, $opts = null)
    {
        parent::__construct(
            "mysql:host={$this->host};dbname={$this->dbname}",
            $this->user,
            $this->pass,
            $opts
        );
        $this->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    public function query($query)
    {
      $result = parent::query($query);
      // do other stuff you want to do here, then...
      return($result);
    }
}
