<?php

namespace App\Model;


use Nette\InvalidStateException;
use Nette\Neon\Neon;
use Nette\Object;
use Nette\Security\AuthenticationException;
use Nette\Security\IAuthenticator;
use Nette\Security\Identity;
use Nette\Security\Passwords;

class UserManager extends Object implements IAuthenticator {

    /** @var string */
    private $usersFile;

    /** @var array */
    private $data;

    /**
     * @param string $usersFile
     */
    public function __construct($usersFile) {
        $this->usersFile = __DIR__ . '/../config/' . $usersFile;
        $this->data = Neon::decode(file_get_contents($this->usersFile));
    }

    /**
     * Performs an authentication.
     * @return Identity
     * @throws AuthenticationException
     */
    public function authenticate(array $credentials) {
        list($username, $password) = $credentials;

        if (!isset($this->data[$username])) {
            throw new AuthenticationException('Nesprávné heslo.', self::IDENTITY_NOT_FOUND);

        } elseif (!Passwords::verify($password, $this->data[$username])) {
            throw new AuthenticationException('Nesprávné uživatelské jméno.', self::INVALID_CREDENTIAL);

        }

        return new Identity($username);
    }

    /**
     * Add user to authentication file.
     * @param string $username
     * @param string $password
     */
    public function addUser($username, $password) {
        if (isset($this->data[$username])) {
            throw new UserAlreadyExistsException('Username is already taken.');
        }
        $password = Passwords::hash($password);
        $this->data[$username] = $password;
        file_put_contents($this->usersFile, Neon::encode($this->data));
    }
}

class UserAlreadyExistsException extends InvalidStateException {
}
