<?php

namespace App\Forms;

use Nette\Object;
use Nette\Application\UI\Form;
use Nette\Security\AuthenticationException;
use Nette\Security\User;


class SignFormFactory extends Object {
    /** @var User */
    private $user;


    public function __construct(User $user) {
        $this->user = $user;
    }


    /**
     * @return Form
     */
    public function create() {
        $form = new Form;
        $form->addText('username', 'Jméno:')
            ->setRequired('Prosím vyplňte vaše jméno.');

        $form->addPassword('password', 'Heslo:')
            ->setRequired('Prosím vyplňte vaše heslo.');

        $form->addCheckbox('remember', 'Zůstat přihlášen');

        $form->addSubmit('send', 'Přihlásit se');

        $form->onSuccess[] = array($this, 'formSucceeded');
        return $form;
    }


    public function formSucceeded($form, $values) {
        if ($values->remember) {
            $this->user->setExpiration('14 days', FALSE);
        } else {
            $this->user->setExpiration('60 minutes', TRUE);
        }

        try {
            $this->user->login($values->username, $values->password);
        } catch (AuthenticationException $e) {
            $form->addError($e->getMessage());
        }
    }

}
